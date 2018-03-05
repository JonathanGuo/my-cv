import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Skillset from '../Skillset/index';
import withSectionWayPoint from './withSectionWaypoint';

const sectionName = 'professional-skills';

class ProfessionalSkills extends PureComponent {
    render () {
        return (
            <section id={sectionName}>
                <h2 className="section-title">
                    <FontAwesomeIcon icon="wrench" />
                    Professional Skills
                </h2>
                <Skillset skills={this.props.data} />
            </section>
        );
    }
}

ProfessionalSkills.propTypes = {
    data: PropTypes.object,
};

ProfessionalSkills.defaultProps = {
    data: {},
};

export default withSectionWayPoint(ProfessionalSkills, sectionName);
