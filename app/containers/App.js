import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Experience from '../components/Experience';
import Skillset from '../components/Skillset/index';
import Schoolarship from '../components/Schoolarship';
import { action } from '../config/Store';
import get from 'lodash/get';

class App extends PureComponent {
    componentDidMount () {
        action('FETCH_DATA');
    }

    render () {
        const professionalSkills = get(this.props.data, 'skills.professional', []);
        const personalSkills = get(this.props.data, 'skills.personal', []);
        return (
            <div className="container mx-auto">
                <div className="hero text-center">
                    <h1>Jonathan Guo</h1>
                    <p className="text-light">
                        {'{ Full Stack Web Developer }'}
                    </p>
                    <p className="hero-text">
                        I am a full stack developer who has over six years experience within
                        <span>&nbsp;</span>
                        businesses in New Zealand.
                        Focus on web and mobile applications using Laravel, AngularJS,
                        React, Ionic, SASS/CSS3 and mobile first responsive frameworks.
                    </p>
                </div>
                <section className="timeline">
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
                <section>
                    <h2 className="section-title">
                        <FontAwesomeIcon icon="wrench" />
                        Professional Skills
                    </h2>
                    <Skillset skills={professionalSkills} />
                </section>
                <section>
                    <h2 className="section-title">
                        <FontAwesomeIcon icon="heart" />
                        Personal Skills
                    </h2>
                    <Skillset skills={personalSkills} />
                </section>
                <section>
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
