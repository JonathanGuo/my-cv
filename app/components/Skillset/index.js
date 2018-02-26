import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TabMenuItem from './TabMenuItem';
import SkillList from './SkillList';

class Skillset extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            activeGroup: null,
        };
    }

    componentDidMount () {
        // Set defaykt active group if available
        this.setDefaultActiveGroup(this.props);
    }

    componentWillReceiveProps (nextProps) {
        if (!this.state.activeGroup) {
            // If active group has not been set
            // then set the default active group by using the first group of next props
            this.setDefaultActiveGroup(nextProps);
        }
    }

    onTabMenuItemClick = (activeGroup) => {
        this.setState({ activeGroup });
    }

    setDefaultActiveGroup (props) {
        const { skills } = props;
        const [firstGroup] = Object.keys(skills);

        if (firstGroup) {
            this.setState({
                activeGroup: firstGroup,
            });
        }
    }

    render () {
        const { skills } = this.props;
        const totalMenuitems = Object.keys(skills).length;

        return (
            <div className="skill-tabs">
                <nav className="tabs-nav">
                    <div className="tabs-menu">
                        {
                            Object.entries(skills).map(([groupName, group]) => (
                                <TabMenuItem
                                    key={groupName}
                                    name={groupName}
                                    totalMenuItems={totalMenuitems}
                                    isActive={groupName === this.state.activeGroup}
                                    icon={group.icon}
                                    onClick={this.onTabMenuItemClick}
                                />
                            ))
                        }
                    </div>
                </nav>
                {
                    this.state.activeGroup &&
                    <SkillList skills={skills[this.state.activeGroup].data} />
                }
            </div>
        );
    }
}

Skillset.propTypes = {
    skills: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
};

Skillset.defaultProps = {
    skills: [],
};

export default Skillset;
