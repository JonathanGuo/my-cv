import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Experience from '../components/Experience';
import Skillset from '../components/Skillset/index';
import { action } from '../config/Store';
import get from 'lodash/get';

class App extends PureComponent {
    componentDidMount () {
        action('FETCH_DATA');
    }

    render () {
        const professionalSkills = get(this.props.data, 'skills.professional', []);
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
                        Skills
                    </h2>
                    <Skillset skills={professionalSkills} />
                </section>
            </div>
        );
    }
}

App.propTypes = {
    data: PropTypes.shape({
        experiences: PropTypes.array,
        skills: PropTypes.object,
    }),
};

App.defaultProps = {
    data: {
        skills: {
            professional: [],
            personal: [],
        },
        experiences: [],
    },
};

export default connect(store => ({
    data: store.Data.data,
}))(App);
