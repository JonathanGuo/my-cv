import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class FormRow extends PureComponent {
    render () {
        return (
            <div className="form-row">
                {this.props.children}
            </div>
        );
    }
}

FormRow.defaultProps = {
    children: null,
};

FormRow.propTypes = {
    children: PropTypes.any,
};

export default FormRow;
