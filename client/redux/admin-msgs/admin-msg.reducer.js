import { adminMsgActionTypes } from './admin-msg.types';


const INITIAL_STATE = {
    signInerrorMsg: null
}

const adminMsgReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case adminMsgActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                signInErrorMsg: action.payload
            }

        default:
            return state
    }
};

export default adminMsgReducer;