import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import animateScrollTo from 'animated-scroll-to';
import Experience from '../components/Experience';
import Skillset from '../components/Skillset/index';
import Schoolarship from '../components/Schoolarship';
import { action } from '../config/Store';
import get from 'lodash/get';

const scrollByURI = ({ params }) => {
    const section = params.section || 'about-me';

    return animateScrollTo(document.getElementById(section));
};

const diffDateInyears = (from) => {
    if (!from) {
        return 0;
    }

    return moment().diff(moment(from), 'year');
};

const formatNZDate = date => moment(date).format('Do MMM, YYYY');

class App extends PureComponent {
    componentDidMount () {
        action('FETCH_DATA');
        scrollByURI(this.props.match);
    }

    componentDidUpdate () {
        scrollByURI(this.props.match);
    }

    render () {
        const professionalSkills = get(this.props.data, 'skills.professional', []);
        const personalSkills = get(this.props.data, 'skills.personal', []);
        const NZExperienceFrom = get(this.props.data, 'about.NZExperienceFrom');
        const yearsOfExperience = diffDateInyears(NZExperienceFrom);
        return (
            <div className="container mx-auto">
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
                <section id="experiences" className="timeline">
                    <h2 className="section-title">
                        <FontAwesomeIcon icon="briefcase" />
                        Experiences
                    </h2>
                    {
                        this.props.data.experiences.map((experience, idx) => (
                            <Experience
                                key={idx}
                                {...experience}
                            />
                        ))
                    }
                </section>
                <section id="professional-skills">
                    <h2 className="section-title">
                        <FontAwesomeIcon icon="wrench" />
                        Professional Skills
                    </h2>
                    <Skillset skills={professionalSkills} />
                </section>
                <section id="personal-skills">
                    <h2 className="section-title">
                        <FontAwesomeIcon icon="heart" />
                        Personal Skills
                    </h2>
                    <Skillset skills={personalSkills} />
                </section>
                <section id="schoolarship-awards">
                    <h2 className="section-title">
                        <FontAwesomeIcon icon="heart" />
                        Schoolarship / Award Received
                    </h2>
                    <ul className="list-reset">
                        {
                            this.props.data.schoolarship.map((schoolarship, idx) => (
                                <Schoolarship
                                    key={idx}
                                    name={schoolarship.name}
                                    date={schoolarship.date}
                                />
                            ))
                        }
                    </ul>
                </section>
            </div>
        );
    }
}

App.propTypes = {
    data: PropTypes.shape({
        experiences: PropTypes.array,
        skills: PropTypes.object,
        schoolarship: PropTypes.array,
    }),
    match: PropTypes.shape({
        params: PropTypes.object,
    }).isRequired,
};

App.defaultProps = {
    data: {
        skills: {
            professional: [],
            personal: [],
        },
        experiences: [],
        schoolarship: [],
    },
};

export default connect(store => ({
    data: store.Data.data,
}))(App);
