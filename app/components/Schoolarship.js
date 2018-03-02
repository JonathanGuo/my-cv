import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Schoolarship extends PureComponent {
    render () {
        return (
            <li className="schoolarship">
                <span className="schoolarship-date">{ this.props.date }</span>
                { this.props.name }
            </li>
        );
    }
}

Schoolarship.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};

export default Schoolarship;
