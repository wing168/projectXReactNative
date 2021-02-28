import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import calendarReducer from './calendar/calendar.reducer';
import signInReducer from './sign-in/sign-in.reducer';
import adminMsgReducer from './admin-msgs/admin-msg.reducer';

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//     // whitelist: ['signin']
// }

const rootReducer = combineReducers ({
    calendar: calendarReducer,
    signin: signInReducer,
    adminMsg: adminMsgReducer
});

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;