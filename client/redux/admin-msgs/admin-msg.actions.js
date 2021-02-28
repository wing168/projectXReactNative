import { adminMsgActionTypes } from './admin-msg.types'

export const signInFailure = msg => ({
    type: adminMsgActionTypes.SIGN_IN_FAILURE,
    payload: msg
});