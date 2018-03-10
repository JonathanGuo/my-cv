import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import animateScrollTo from 'animated-scroll-to';
import { AboutMe, Experiences, ProfessionalSkills, PersonalSkills, SchoolarshipAwards, ContactMe } from '../components/sections';
import { action } from '../config/Store';
import get from 'lodash/get';

const scrollByURI = ({ params }) => {
    const section = params.section || 'about-me';

    return animateScrollTo(document.getElementById(section));
};

class App extends PureComponent {
    componentDidMount () {
        action('FETCH_DATA');
        scrollByURI(this.props.match);
    }

    componentDidUpdate () {
        scrollByURI(this.props.match);
    }

    render () {
        const { about, experiences, schoolarship } = this.props.data;
        const professionalSkills = get(this.props.data, 'skills.professional', {});
        const personalSkills = get(this.props.data, 'skills.personal', {});
        return (
            <div className="container mx-auto">
                <AboutMe data={about} />
                <Experiences data={experiences} />
                <ProfessionalSkills data={professionalSkills} />
                <PersonalSkills data={personalSkills} />
                <SchoolarshipAwards data={schoolarship} />
                <ContactMe
                    sending={this.props.sendingMessage}
                    response={this.props.contactMeResponse}
                />
            </div>
        );
    }
}

App.propTypes = {
    data: PropTypes.shape({
        about: PropTypes.object,
        experiences: PropTypes.array,
        skills: PropTypes.object,
        schoolarship: PropTypes.array,
    }),
    match: PropTypes.shape({
        params: PropTypes.object,
    }).isRequired,
    sendingMessage: PropTypes.bool.isRequired,
    contactMeResponse: PropTypes.object.isRequired,
};

App.defaultProps = {
    data: {
        about: {},
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
    sendingMessage: store.ContactMe.sending,
    contactMeResponse: store.ContactMe.response,
}))(App);
