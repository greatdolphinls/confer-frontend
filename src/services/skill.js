import axios from 'axios';

import { getSkillUrl } from './endpoints';

const getSkills = async () => {
    const url = getSkillUrl('');
    const result = await axios.get(url);
    return result;
};

const addSkill = async data => {
    const url = getSkillUrl();
    const result = await axios.post(url, data);
    return result;
};

const editSkill = async data => {
    const url = getSkillUrl();
    const result = await axios.put(url, data);
    return result;
};

const removeSkill = async _id => {
    const url = getSkillUrl();
    const result = await axios.delete(url, {
        params: { _id }
    });
    return result;
};

export {
    getSkills,
    addSkill,
    editSkill,
    removeSkill
};
