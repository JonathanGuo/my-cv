import Router from 'koa-router';
import config from './config';
import axios from 'axios';
import nodemailer from 'nodemailer';
import moment from 'moment';

const router = new Router();

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    host: config.SMTP_SERVER,
    port: config.SMTP_HOST,
    secure: config.SMTP_SECURE,
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
    ).then(res => res.data.success);
};

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

router.post('/send-email', async (ctx, next) => {
    await next();
    ctx.type = 'json';
    const now = moment().format('DD MMM YYYY, h:i:s a');
    const params = ctx.request.body;
    const success = await verifyRecapthaToken(params.reCaptchaToken);
    if (!success) {
        ctx.status = 422;
        ctx.body = {
            result: false,
            message: 'Failed to verify your recaptcha.',
        };
        return ctx;
    }

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
        message: 'Thanks for contacting me. Have a good day.',
    };

    return ctx;
});

export default router;
