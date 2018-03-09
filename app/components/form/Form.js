import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Form extends PureComponent {
    onFormSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.onSubmit();
    }

    render () {
        return (
            <form className="form" onSubmit={this.onFormSubmit}>
                {this.props.children}
            </form>
        );
    }
}

Form.defaultProps = {
    children: null,
};

Form.propTypes = {
    children: PropTypes.any,
    onSubmit: PropTypes.func.isRequired,
};

export default Form;
