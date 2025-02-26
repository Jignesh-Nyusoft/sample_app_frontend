/**
 * @format
 */

import {AppRegistry, Text, TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';

Text.defaultProps = {
    ...Text.defaultProps,
    allowFontScaling: false,
  };
  
  TextInput.defaultProps = {
    ...TextInput.defaultProps,
    allowFontScaling: false,
  };

  // Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});


AppRegistry.registerComponent(appName, () => App);
