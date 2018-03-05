import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Schoolarship from '../Schoolarship';
import withSectionWayPoint from './withSectionWaypoint';

const sectionName = 'schoolarship-awards';

class SchoolarshipAwards extends PureComponent {
    render () {
        return (
            <section id={sectionName}>
                <h2 className="section-title">
                    <FontAwesomeIcon icon="heart" />
                    Schoolarship / Award Received
                </h2>
                <ul className="list-reset">
                    {
                        this.props.data.map((schoolarship, idx) => (
                            <Schoolarship
                                key={idx}
                                name={schoolarship.name}
                                date={schoolarship.date}
                            />
                        ))
                    }
                </ul>
            </section>
        );
    }
}

SchoolarshipAwards.propTypes = {
    data: PropTypes.array,
};

SchoolarshipAwards.defaultProps = {
    data: [],
};

export default withSectionWayPoint(SchoolarshipAwards, sectionName);
