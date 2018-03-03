import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import Rating from './Rating';
import AsyncImage from '../AsyncImage';
import { diffFromNow } from '../../helpers/DateHelper';

class Skill extends PureComponent {
    getTooltip () {
        const { skill } = this.props;

        if (skill.tooltip) {
            return skill.tooltip;
        }

        if (skill.experienceFrom) {
            return diffFromNow(skill.experienceFrom);
        }

        return null;
    }

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
        const tooltip = this.getTooltip();

        return (
            <Fragment>
                <div className="skill" data-tip={tooltip}>
                    <div className="skill-name">
                        <div className="icon-wrapper">
                            { this.renderIcon() }
                        </div>
                        { skill.name }
                    </div>
                    <Rating
                        value={skill.rating}
                    />
                </div>
                {
                    tooltip &&
                    <ReactTooltip
                        place="top"
                        type="dark"
                        effect="float"
                    />
                }
            </Fragment>
        );
    }
}

Skill.propTypes = {
    skill: PropTypes.shape({
        name: PropTypes.string,
    }).isRequired,
};

export default Skill;
