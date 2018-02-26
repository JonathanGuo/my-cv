import React, { PureComponent } from 'react';
import Waypoint from 'react-waypoint';
import PropTypes from 'prop-types';

class Rating extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            inView: false,
        };
    }

    /**
     * Set in view state if the element has never been in view
     */
    setInViewState () {
        if (!this.state.inView) {
            this.setState({ inView: true });
        }
    }

    /**
     * Get wrapper's CSS class based on in view state
     * @returns String
     */
    getWrapperClass () {
        const wrapperClass = ['rating-wrapper'];

        if (this.state.inView) {
            wrapperClass.push('in-view');
        }

        return wrapperClass.join(' ');
    }

    getRatingClass () {
        return `rating rating-${this.state.inView ? this.props.value * 10 : 0}`;
    }

    render () {
        return (
            <div className={this.getWrapperClass()}>
                <Waypoint
                    onEnter={() => this.setInViewState()}
                />
                <div className={this.getRatingClass()} />
            </div>
        );
    }
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
};

export default Rating;
