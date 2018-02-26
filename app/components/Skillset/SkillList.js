import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Skill from './Skill';

class SkillList extends PureComponent {
    render () {
        const { skills } = this.props;
        return (
            <div className="tab-content">
                {
                    skills.map(skill => (
                        <Skill
                            key={skill.name}
                            skill={skill}
                        />
                    ))
                }
            </div>
        );
    }
}

SkillList.propTypes = {
    skills: PropTypes.array.isRequired,
};

export default SkillList;
