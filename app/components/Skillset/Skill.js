import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import Rating from './Rating';
import AsyncImage from '../AsyncImage';
import moment from 'moment';
import pluralize from 'pluralize';

const now = moment();

/**
 * Humanize date difference
 * @param {String} diff
 * @param {String} unit
 */
const humanizeDateDiff = (diff, unit) => {
    return `Over ${diff} ${pluralize.plural(unit, diff)} experience`;
};

/**
 * Get datetime difference from now
 * @param {String} datetime
 */
const diffFromNow = (datetime) => {
    const from = moment(datetime);
    if (!from.isValid()) {
        return null;
    }
    const diffInYears = now.diff(from, 'years');
    if (diffInYears >= 1) {
        return humanizeDateDiff(diffInYears, 'year');
    }

    const diffInMonths = now.diff(from, 'months');
    if (diffInMonths >= 1) {
        return humanizeDateDiff(diffInMonths, 'month');
    }

    const diffInDays = now.diff(from, 'days');
    return humanizeDateDiff(diffInDays, 'day');
};

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
