import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Rating from './Rating';
import AsyncImage from '../AsyncImage';

class Skill extends PureComponent {
    renderIcon () {
        const { skill } = this.props;

        if (skill.icon) {
            return <FontAwesomeIcon icon={skill.icon} />;
        }

        if (skill.image) {
            return (
                <AsyncImage
                    className="skill-image-icon"
                    src={`icons/${skill.image}`}
                    alt={skill.name}
                />
            );
        }

        return null;
    }

    render () {
        const { skill } = this.props;

        return (
            <div className="skill">
                <div className="skill-name">
                    <div className="icon-wrapper">
                        { this.renderIcon() }
                    </div>
                    { skill.name }
                </div>
                <Rating value={skill.rating} />
            </div>
        );
    }
}

Skill.propTypes = {
    skill: PropTypes.shape({
        name: PropTypes.string,
    }).isRequired,
};

export default Skill;
