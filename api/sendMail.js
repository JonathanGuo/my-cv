import Router from 'koa-router';
import config from './config';
import axios from 'axios';
import nodemailer from 'nodemailer';
import moment from 'moment';
import Validator from 'validatorjs';

const router = new Router();

// Validation rules
const rules = {
    name: 'required|max:80',
    email: 'required|email',
    company: 'max:255',
    message: 'required|max:5000',
};

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    host: config.SMTP_SERVER,
    port: Number.parseInt(config.SMTP_PORT, 10),
    secure: Number.parseInt(config.SMTP_PORT, 10) === 465,
    auth: {
        user: config.SMTP_USERNAME,
        pass: config.SMTP_PASS,
    },
});

/**
 * Verify recaptcha token
 * @param {String} token
 */
const verifyRecapthaToken = (token) => {
    return axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${config.RECAPTCHA_SECRET}&response=${token}`,
        {},
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            },
        },
    ).then((res) => {
        if (!res.data.success) {
            throw new Error('Failed to verify your recaptcha.');
        }
    });
};

/**
 * Send email
 * @param {String} to Recipient email address
 * @param {String} from Sender's email address
 * @param {String} subject Email subject
 * @param {String} message Message
 */
const send = (to, from, subject, message) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            to,
            from,
            subject,
            text: message,
        }, (err, info) => {
            if (info) {
                resolve(info);
            } else if (err) {
                reject(err);
            }
        });
    });
};

/**
 * Validate post data
 * @param {Object} data
 */
const validate = (data) => {
    const validator = new Validator(data, rules);

    const pass = validator.passes();

    if (!pass) {
        const [errorEntry] = Object.entries(validator.errors.all());
        throw new Error(errorEntry[1]);
    }
};

/**
 * Send email controller
 */
router.post('/send-email', async (ctx, next) => {
    await next();
    ctx.type = 'json';
    const now = moment().format('DD MMM YYYY, h:i:s a');
    const params = ctx.request.body;
    try {
        await verifyRecapthaToken(params.reCaptchaToken);
        await validate(params);
        await send(
            config.MY_EMAIL,
            params.email,
            `[coderjono.me] A message from ${params.name}`,
            `${params.message}
    
${params.name}
${params.company}
${now}
IP: ${ctx.request.ip}`,
        );

        await send(
            params.email,
            config.MY_EMAIL,
            'Thanks for contacting me.',
            `Hi ${params.name},
    
Thanks for your message. I will get in touch with you shortly to learn more and answer any questions you might have.

Best Regards.
Jonathan Guo
${config.MY_EMAIL}`,
        );

        ctx.body = {
            result: true,
            message: 'Thanks for your message. I will get back to you shortly. Have a good day.',
        };
    } catch (e) {
        ctx.status = 422;
        ctx.body = {
            result: false,
            message: e.message,
        };
    }
});

export default router;
