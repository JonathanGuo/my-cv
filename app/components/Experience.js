import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const formatDate = (date, fallback = null) => {
    return date
        ? moment(date).format('Do MMM, YYYY')
        : fallback;
};

class Experience extends PureComponent {
    render () {
        return (
            <div className="timeline-item-wrapper">
                <div className="timeline">
                    <div className="datetime-wrapper">
                        <div className="datetime">
                            <span className="start-date">
                                { formatDate(this.props.startDate) }
                            </span>
                            <span> - </span>
                            <span className="end-date">
                                { formatDate(this.props.endDate, 'Present') }
                            </span>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <h3 className="title">
                        { this.props.jobTitle }, { this.props.company }
                    </h3>
                    <p>
                        <span className="inner-block">
                            { this.props.type }
                        </span>
                    </p>
                    {
                        this.props.url &&
                        <div>
                            <a className="mr-2" href={this.props.url}>
                                {this.props.url}
                            </a>
                            <FontAwesomeIcon icon="external-link-alt" />
                        </div>
                    }
                    <div className="description">
                        <h4>Description:</h4>
                        <ul>
                            {
                                this.props.description.map((item, idx) => (
                                    <li key={idx}>{ item }</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

Experience.propTypes = {
    company: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]).isRequired,
    type: PropTypes.string.isRequired,
};

Experience.defaultProps = {
    endDate: null,
    url: null,
};

export default Experience;
