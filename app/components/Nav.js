import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push as Menu } from 'react-burger-menu';

class Nav extends Component {
    render () {
        const { pageWrapId, outerContainerId } = this.props;

        return (
            <Menu
                pageWrapId={pageWrapId}
                outerContainerId={outerContainerId}
            >
                <a href="/" id="aboutMe" className="menu-item">About me</a>
                <a href="/experience" id="aboutMe" className="menu-item">Experience</a>
            </Menu>
        );
    }
}

Nav.propTypes = {
    pageWrapId: PropTypes.string.isRequired,
    outerContainerId: PropTypes.string.isRequired,
};

export default Nav;
