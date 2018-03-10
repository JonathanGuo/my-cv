import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import isEmpty from 'lodash/isEmpty';

const typeIcons = {
    success: 'check',
    danger: 'times',
    info: 'info-circle',
    warning: 'exclamation-triangle',
};

class Alert extends PureComponent {
    render () {
        if (isEmpty(this.props.message)) {
            return null;
        }

        return (
            <div className={`alert-block ${this.props.type}`}>
                <span className="inline-block mr-4 align-middle">
                    <FontAwesomeIcon icon={typeIcons[this.props.type]} />
                </span>
                { this.props.message }
            </div>
        );
    }
}

Alert.defaultProps = {
    type: 'info',
};

Alert.propTypes = {
    type: PropTypes.oneOf([
        'success',
        'danger',
        'warning',
        'info',
    ]),
    message: PropTypes.string.isRequired,
};

export default Alert;
