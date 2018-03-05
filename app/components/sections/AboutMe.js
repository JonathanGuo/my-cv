import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Particles from 'react-particles-js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import animateScrollTo from 'animated-scroll-to';
import particlesConfig from '../../config/particlesjs-config.json';
import { diffFromNow, formatNZDate } from '../../helpers/DateHelper';
import withSectionWayPoint from './withSectionWaypoint';

const sectionName = 'about-me';
const scrollToContent = () => animateScrollTo(document.getElementById('experiences'));

class AboutMe extends PureComponent {
    render () {
        const { NZExperienceFrom } = this.props.data;

        return (
            <section id={sectionName} className="hero text-center min-h-screen p-0">
                <Particles
                    height="100vh"
                    params={particlesConfig}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                    }}
                />
                <div className="flex flex-col justify-center content-center min-h-screen">
                    <div>
                        <h1>Jonathan Guo</h1>
                        <p className="text-light">
                            {'{ Full Stack Web Developer }'}
                        </p>
                    </div>
                    <div className="mt-8">
                        <p className="hero-text">
                            I am a full stack developer who has over&nbsp;
                            <abbr data-tip={`Since ${formatNZDate(NZExperienceFrom)}`}>{diffFromNow(NZExperienceFrom)}</abbr>&nbsp;
                            within
                            <span>&nbsp;</span>
                            businesses in New Zealand.
                            Focus on web and mobile applications using Laravel, AngularJS,
                            React, Ionic, SASS/CSS3 and mobile first responsive frameworks.
                        </p>
                        <ReactTooltip
                            place="top"
                            type="dark"
                            effect="float"
                        />
                    </div>
                    <div className="scroll-indicator-wrapper">
                        <button className="scroll-indicator" onClick={() => scrollToContent()}>
                            <FontAwesomeIcon size="2x" icon="chevron-down" />
                        </button>
                    </div>
                </div>
            </section>
        );
    }
}

AboutMe.propTypes = {
    data: PropTypes.object,
};

AboutMe.defaultProps = {
    data: {},
};

export default withSectionWayPoint(AboutMe, sectionName, '', '');
