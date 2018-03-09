import React, { Component } from 'react';
import Validator from 'validatorjs';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Recaptcha from 'react-recaptcha';
import head from 'lodash/head';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import withSectionWaypoint from './withSectionWaypoint';
import { Form, FormRow, FormControl } from '../form';
import { action } from '../../config/Store';

const sectionName = 'contact-me';

class ContactMe extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isReCaptchaReady: false,
            reCaptchaToken: null,
            name: '',
            email: '',
            company: '',
            message: '',
            errors: {},
        };

        this.debounceValidate = debounce(() => this.validate(), 200);
    }

    /**
     * After recaptcha is loaded
     * the form fields will be enabled
     */
    onReCaptchaLoad = () => {
        this.setState({ isReCaptchaReady: true });
    }

    /**
     * Set recaptcha token to enable submit button
     */
    onRecaptchaVerified = (reCaptchaToken) => {
        this.setState({ reCaptchaToken });
    }

    /**
     * Set form control's values in state
     */
    setFormState = (key, value) => {
        this.setState({ [key]: value });
        this.debounceValidate();
    }

    /**
     * Reset recaptcha token
     */
    resetRecaptchaToken = () => {
        this.setState({ reCaptchaToken: null });
    }

    /** Validate form data */
    validate () {
        const rules = {
            name: 'required|max:80',
            email: 'required|email',
            company: 'max:255',
            message: 'required|max:5000',
        };

        const validator = new Validator(this.state, rules);

        const pass = validator.passes();
        const errors = validator.errors.all();
        this.setState({ errors });

        return pass;
    }

    submitForm = () => {
        // Prevent form submission if token is not fetched yet
        if (!this.state.reCaptchaToken) {
            return false;
        }

        return action('SEND_CONTACT_MESSAGE', {
            reCaptchaToken: this.state.reCaptchaToken,
            name: this.state.name,
            email: this.state.email,
            company: this.state.company,
            message: this.state.message,
        });
    }

    render () {
        const { errors } = this.state;

        return (
            <section id={sectionName}>
                <h2 className="section-title">
                    <FontAwesomeIcon icon="envelope" />
                    Contact me
                </h2>
                <Form onSubmit={this.submitForm}>
                    <FormRow>
                        <FormControl
                            groupClassName="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                            id="name"
                            placeholder="Your name"
                            label="Name"
                            required={true}
                            disabled={!this.state.isReCaptchaReady}
                            value={this.state.name}
                            error={head(get(errors, 'name'))}
                            onChange={this.setFormState}
                        />
                        <FormControl
                            groupClassName="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                            id="email"
                            placeholder="Your email address"
                            type="email"
                            label="Email"
                            required={true}
                            disabled={!this.state.isReCaptchaReady}
                            value={this.state.email}
                            error={head(get(errors, 'email'))}
                            onChange={this.setFormState}
                        />
                    </FormRow>
                    <FormRow>
                        <FormControl
                            id="company"
                            label="Company"
                            placeholder="Company name"
                            required={false}
                            disabled={!this.state.isReCaptchaReady}
                            value={this.state.company}
                            error={head(get(errors, 'company'))}
                            onChange={this.setFormState}
                        />
                    </FormRow>
                    <FormRow>
                        <FormControl
                            id="message"
                            label="Message"
                            type="textarea"
                            placeholder="Please leave your message"
                            rows={5}
                            required={true}
                            disabled={!this.state.isReCaptchaReady}
                            value={this.state.message}
                            error={head(get(errors, 'message'))}
                            onChange={this.setFormState}
                        />
                    </FormRow>
                    <Recaptcha
                        sitekey="6Le9FksUAAAAANZosY4oBx8wxkarEMW5uW-9yxQj"
                        render="explicit"
                        onloadCallback={this.onReCaptchaLoad}
                        verifyCallback={this.onRecaptchaVerified}
                        expiredCallback={this.resetRecaptchaToken}
                    />
                    <button type="submit" disabled={!this.state.reCaptchaToken}>
                        <FontAwesomeIcon icon="paper-plane" />
                        Send
                    </button>
                </Form>
            </section>
        );
    }
}

export default withSectionWaypoint(ContactMe, sectionName, 'contact-me');
