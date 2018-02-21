import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Experience from '../components/Experience';
import { action } from '../config/Store';

class App extends PureComponent {
    componentDidMount () {
        action('FETCH_DATA');
    }

    render () {
        return (
            <div className="container mx-auto">
                <div className="hero text-center">
                    <h1>Jonathan Guo</h1>
                    <p className="text-light">
                        {'{ Full Stack Web Developer }'}
                    </p>
                    <p className="hero-text">
                        I am a full stack developer who has Over five years experience within
                        <span>&nbsp;</span>
                        businesses in New Zealand.
                        Focus on web and mobile applications using Laravel, AngularJS,
                        React, SASS/CSS3 and responsive &amp; mobile first responsive frameworks.
                    </p>
                </div>
                <section>
                    <h2 className="section-title">
                        <FontAwesomeIcon icon="wrench" />
                        Skills
                    </h2>
                </section>
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
        skills: [],
        experiences: [],
    },
};

export default connect(store => ({
    data: store.Data.data,
}))(App);
