/**
 * @format
 */

if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';


const Root = () => (
<Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <App />

      {/* </PersistGate> */}
    </Provider>
)

AppRegistry.registerComponent(appName, () => Root);
