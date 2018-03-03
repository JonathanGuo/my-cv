import moment from 'moment';
import pluralize from 'pluralize';

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
    const now = moment();
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

/**
 * Format datetime string to NZ date format
 */
const formatNZDate = date => moment(date).format('Do MMM, YYYY');

export {
    humanizeDateDiff,
    diffFromNow,
    formatNZDate,
};
