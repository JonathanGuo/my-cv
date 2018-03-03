import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

const diffDateInyears = (from) => {
    if (!from) {
        return 0;
    }

    return moment().diff(moment(from), 'year');
};

const formatNZDate = date => moment(date).format('Do MMM, YYYY');

class AboutMe extends PureComponent {
    render () {
        const { NZExperienceFrom } = this.props.data;
        const yearsOfExperience = diffDateInyears(NZExperienceFrom);
        return (
            <section id="about-me" className="hero text-center">
                <h1>Jonathan Guo</h1>
                <p className="text-light">
                    {'{ Full Stack Web Developer }'}
                </p>
                <p className="hero-text">
                    I am a full stack developer who has over&nbsp;
                    <abbr data-tip={`Since ${formatNZDate(NZExperienceFrom)}`}>{yearsOfExperience} years</abbr>&nbsp;
                    experience within
                    <span>&nbsp;</span>
                    businesses in New Zealand.
                    Focus on web and mobile applications using Laravel, AngularJS,
                    React, Ionic, SASS/CSS3 and mobile first responsive frameworks.
                </p>
                <ReactTooltip
                    place="top"
                    type="dark"
                    effect="float"
                />
            </section>
        );
    }
}

AboutMe.propTypes = {
    data: PropTypes.object,
};

AboutMe.defaultProps = {
    data: {},
};

export default AboutMe;
