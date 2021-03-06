import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { push as Menu } from 'react-burger-menu';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const navLinks = [
    {
        id: 'link-about-me',
        to: '/',
        text: 'About me',
    },
    {
        id: 'link-experiences',
        to: '/experiences',
        text: 'Experiences',
    },
    {
        id: 'link-professional-skills',
        to: '/professional-skills',
        text: 'Professional Skills',
    },
    {
        id: 'link-personal-skills',
        to: '/personal-skills',
        text: 'Personal Skills',
    },
    {
        id: 'link-schoolarship',
        to: '/schoolarship-awards',
        text: 'Schoolarship & Awards',
    },
    {
        id: 'link-contact-me',
        to: '/contact-me',
        text: 'Contact Me',
    },
];

class Nav extends Component {
    constructor (props) {
        super(props);

        this.state = {
            menuOpen: false,
        };

        this.timeoutID = null;
    }

    onMenuStateChange = (state) => {
        this.setState({ menuOpen: state.isOpen });
    }

    onNavLinkClick = () => {
        this.closeMenu();
    }

    closeMenu () {
        if (this.timeoutID) {
            window.clearTimeout(this.timeoutID);
        }

        // scroll animation takes 500ms to scroll to the position
        // and then give user 500ms to react to have better experience
        this.timeoutID = window.setTimeout(() => {
            this.setState({ menuOpen: false });
        }, 1000);
    }

    render () {
        const { pageWrapId, outerContainerId } = this.props;

        return (
            <Menu
                pageWrapId={pageWrapId}
                outerContainerId={outerContainerId}
                isOpen={this.state.menuOpen}
                onStateChange={this.onMenuStateChange}
            >
                {
                    navLinks.map(navLink => (
                        <NavLink
                            {...navLink}
                            key={navLink.id}
                            className="menu-item"
                            activeClassName="active"
                            onClick={this.onNavLinkClick}
                            exact={true}
                        >
                            {navLink.text}
                        </NavLink>
                    ))
                }

                <a
                    href="https://github.com/jonathanGuo/my-cv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bottom-links"
                >
                    <FontAwesomeIcon
                        className="mr-2"
                        icon={['fab', 'github']}
                    />
                    View the code
                </a>
            </Menu>
        );
    }
}

Nav.propTypes = {
    pageWrapId: PropTypes.string.isRequired,
    outerContainerId: PropTypes.string.isRequired,
};

export default Nav;
