import { createSelector } from 'reselect';


const signInSelector = state => state.signin;

export const userAuthSelector = createSelector(
    [signInSelector],
    signin => signin.userAuthenticated
);

export const userIDSelector = createSelector(
    [signInSelector],
    signin => signin.userID
);


