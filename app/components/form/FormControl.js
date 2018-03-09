import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

class FormControl extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            dirty: false,
        };
    }

    onControlChange = (e) => {
        if (!this.state.dirty) {
            this.setState({ dirty: true });
        }
        this.props.onChange(this.props.id, e.target.value);
    }

    render () {
        const {
            label,
            groupClassName,
            type,
            disabled,
            error,
            ...rest
        } = this.props;

        // Ignore onChange callback and invalid properties
        const controlProps = omit(rest, ['onChange', 'validationRules']);

        return (
            <div className={`${this.props.groupClassName} ${error && this.state.dirty ? 'has-error' : ''}`}>
                <label
                    htmlFor={this.props.id}
                    className="control-label"
                >
                    {this.props.label}
                    {this.props.required && '*'}
                </label>
                {
                    type.toLowerCase() !== 'textarea'
                        ? (
                            <input
                                className="form-control"
                                name={this.props.id}
                                onChange={this.onControlChange}
                                {...controlProps}
                            />
                        )
                        : (
                            <textarea
                                name={this.props.id}
                                className="form-control resize-none"
                                onChange={this.onControlChange}
                                {...controlProps}
                            />
                        )
                }
                {
                    error && this.state.dirty &&
                    <p className="error-message">
                        { error }
                    </p>
                }
            </div>
        );
    }
}

FormControl.defaultProps = {
    groupClassName: 'form-group',
    type: 'text',
    disabled: false,
    required: false,
    error: null,
};

FormControl.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    groupClassName: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    error: PropTypes.string,
};

export default FormControl;
