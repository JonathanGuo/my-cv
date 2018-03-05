import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Skillset from '../Skillset/index';
import withSectionWayPoint from './withSectionWaypoint';

const sectionName = 'personal-skills';

class PersonalSkills extends PureComponent {
    render () {
        return (
            <section id={sectionName}>
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

export default withSectionWayPoint(PersonalSkills, sectionName);
