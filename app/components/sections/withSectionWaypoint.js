import React from 'react';
import Waypoint from 'react-waypoint';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import { action } from '../../config/Store';

export default function withSectionWaypoint(Component, sectionName, uri, wrapperClass = 'mt-8') {
    return class extends React.Component {
        onSectionEnter = () => {
            const currentSection = get(this.props, 'match.params.section');
            if (currentSection === sectionName) {
                return false;
            }

            return action('PUSH_ROUTE', { uri: `/${!isNil(uri) ? uri : sectionName}` });
        }

        render () {
            return (
                <div className={wrapperClass}>
                    <Waypoint onEnter={this.onSectionEnter} />
                    <Component {...this.props} />
                </div>
            );
        }
    };
}
