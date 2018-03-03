import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Skillset from '../Skillset/index';

class PersonalSkills extends PureComponent {
    render () {
        return (
            <section id="personal-skills">
                <h2 className="section-title">
                    <FontAwesomeIcon icon="heart" />
                    Personal Skills
                </h2>
                <Skillset skills={this.props.data} />
            </section>
        );
    }
}

PersonalSkills.propTypes = {
    data: PropTypes.object,
};

PersonalSkills.defaultProps = {
    data: {},
};

export default PersonalSkills;
