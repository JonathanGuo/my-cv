import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Experience from '../Experience';
import withSectionWayPoint from './withSectionWaypoint';

const sectionName = 'experiences';
class Experiences extends PureComponent {
    render () {
        return (
            <section id={sectionName} className="timeline">
                <h2 className="section-title">
                    <FontAwesomeIcon icon="briefcase" />
                    Experiences
                </h2>
                {
                    this.props.data.map((experience, idx) => (
                        <Experience
                            key={idx}
                            {...experience}
                        />
                    ))
                }
            </section>
        );
    }
}

Experiences.propTypes = {
    data: PropTypes.array,
};

Experiences.defaultProps = {
    data: [],
};

export default withSectionWayPoint(Experiences, sectionName);
