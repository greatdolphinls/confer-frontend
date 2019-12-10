
import SkillConstants from '../constants/reducerConstants/SkillConstants'
import { getSkills } from '../services/skill';
import { removeItemWithSlice } from '../utils/utility';

export const setSkills = refresh => async (dispatch, getState) => {
    try {
        const { skill: { data } } = getState();

        if (refresh || data.length === 0) {
            const { data } = await getSkills();
            const options = data.map(({ name }) => ({ label: name, value: name }));

            dispatch({
                type: SkillConstants.SET_SKILLS,
                payload: {data, options}
            });
        }
    } catch (error) {
        console.log('great dolphin : [actions skill setSkills] error => ', error);
    }
}

export const addEditSkill = skill => async (dispatch, getState) => {
    let { skill: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === skill._id
    ));
    if (targetIndex >= 0) {
        data[targetIndex] = skill;
    } else {
        data = [
            ...data,
            skill
        ];
    }
    const options = data.map(({ name }) => ({ label: name, value: name }));

    dispatch({
        type: SkillConstants.SET_SKILLS,
        payload: {data, options}
    });
}

export const removeSkill = skill => async (dispatch, getState) => {
    let { skill: { data } } = getState();

    const targetIndex = data.findIndex(item => (
        item._id === skill._id
    ));

    data = removeItemWithSlice(data, targetIndex);
    const options = data.map(({ name }) => ({ label: name, value: name }));

    dispatch({
        type: SkillConstants.SET_SKILLS,
        payload: {data, options}
    });
}