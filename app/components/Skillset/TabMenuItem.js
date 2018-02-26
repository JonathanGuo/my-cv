import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class TabMenuItem extends PureComponent {
    getMenuClasses () {
        const classes = ['tabs-menu-item'];

        if (this.props.isActive) {
            classes.push('active');
        }
        classes.push(`w-1/${this.props.totalMenuItems}`);

        return classes.join(' ');
    }

    render () {
        return (
            <button
                type="button"
                className={this.getMenuClasses()}
                onClick={() => this.props.onClick(this.props.name)}
            >
                <FontAwesomeIcon icon={this.props.icon} size="4x" />
                <h3>{this.props.name}</h3>
            </button>
        );
    }
}

TabMenuItem.propTypes = {
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    totalMenuItems: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default TabMenuItem;
