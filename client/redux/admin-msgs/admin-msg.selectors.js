import { createSelector } from 'reselect';

const adminMsgSelector = state => state.adminMsg;

export const signInErrorMsgSelector = createSelector(
    [adminMsgSelector],
    adminMsg => adminMsg.signInErrorMsg
);