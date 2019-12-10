import SkillConstants from '../constants/reducerConstants/SkillConstants'

const initialState = {
    data: [],
    options: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SkillConstants.SET_SKILLS:
            return {
                ...state,
                data: action.payload.data,
                options: action.payload.options
            };
        default:
            return state;
    }
}
