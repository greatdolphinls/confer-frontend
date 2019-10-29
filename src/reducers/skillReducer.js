import SkillConstants from '../constants/reducerConstants/SkillConstants'

const initialState = {
    data: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SkillConstants.SET_SKILLS:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}
