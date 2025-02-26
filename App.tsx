/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  Keyboard,
  Linking,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { navigationRef } from './src/navigation/RootNavigationFunctions';
import CustomInput from './src/components/CustomInput';
import { Colors, Font } from './src/theme';
import CustomButton from './src/components/CustomButton';
import Loader from './src/components/Loader';
import { CheckBox } from './src/components/Checkbox';
import StackNavigator from './src/navigation/RootNavigationStack';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { persistor, store } from './src/redux/store/store';
import ActionSheet from './src/components/CustomActionSheet';
import CustomDialog from './src/components/CustomAlert';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/CommonConfigs';
import SplashScreen from 'react-native-splash-screen';
import { STRIPE_CREDENTIALS } from './src/utils/CommonConstants';
import { StripeProvider } from '@stripe/stripe-react-native';
import messaging from '@react-native-firebase/messaging';
import { isIOS } from './src/utils/CommonFunctions';
import { getFCMToken, onDisplayNotification } from './src/utils/FCMService';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './src/components/NoInternet';
import VersionCheck from 'react-native-version-check';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: Colors.white,
    flex: 1
  };
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [isReachable, setIsReachable] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  // const checkForUpdate = async () => {
  //   try {
  //     // Get the current app version
  //     const currentVersion = VersionCheck.getCurrentVersion();
  
  //     // Get the latest version from the app store (platform-specific)
  //     const latestVersion = await VersionCheck.getLatestVersion();
  
  //     // Compare versions
  //     if (VersionCheck.needUpdate({ currentVersion, latestVersion }).isNeeded) {
  //       Alert.alert(
  //         'Update Available',
  //         'A new version of the app is available. Please update to continue.',
  //         [
  //           {
  //             text: 'Update Now',
  //             onPress: () => {
  //               const storeUrl = VersionCheck.getStoreUrl(); // Get the App Store/Play Store URL
  //               Linking.openURL(storeUrl); // Open the store page
  //             },
  //             style: 'default',
  //           },
  //         ],
  //         { cancelable: false } // This will prevent the alert from being dismissed without an action
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error checking for updates:', error);
  //   }
  // };
  

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log(" internet state =>", state)
      if (state.isConnected !== null) setIsConnected(state.isConnected);
      if (state.isInternetReachable !== null) setIsReachable(state.isInternetReachable);
      // Show the popup when both isConnected and isReachable are false
      if (!state.isConnected || !state.isInternetReachable) {
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    });

    return () => unsubscribe();
  }, []);
    useEffect(() => {
      // if (isIOS()) {
      // messaging().requestPermission().then((data) => { 
      //   console.log(data);
      //   messaging().getToken().then((token) => {
      //     console.log("fcm token ===========>>>>>>>>", token, Platform.OS);
      //   })
      //  }).catch((err) =>  console.log(err));
      // } else {
      //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((data) => {
      //     messaging().getToken().then((token) => {
      //       console.log("fcm token ===========>>>>>>>>", token, Platform.OS);
      //     })
      //   });
      // }
      // getFCMToken()
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    let subscribe = messaging().onMessage(async (message) => {
      console.log("....onMessage", message);
      onDisplayNotification(message);
    });

    messaging().onNotificationOpenedApp((notificationOpen) => {
      console.log("....onNotificationOpenedApp", notificationOpen);
      // navigateScreen(notificationOpen?.data);
    });
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log("....getInitialNotification", remoteMessage);
          // navigateScreen(remoteMessage?.data);
        }
      });
    return () => {
      subscribe();
    };
  }, []);

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.black}
      />
      <Provider store={store}>
          <PersistGate persistor={persistor}>
          <StripeProvider
                publishableKey={STRIPE_CREDENTIALS.STRIPE_PK}
                // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
                merchantIdentifier="merchant.com.greenclusta" // required for Apple Pay
              >
                <NavigationContainer
                  onReady={() => {
                    setTimeout(() => {
                      SplashScreen.hide();
                    }, 2000);
                    // if (isNav) {
                    //   RNBootSplash.hide({ fade: false });
                    //   setVisible(false);
                    // }
                  }}
                  ref={navigationRef}
                >
                    <CustomDialog />
                    <Toast config={toastConfig} />
                  <Loader />
                  {showPopup && <NoInternet />}
                </NavigationContainer>
              </StripeProvider>
          </PersistGate>
        </Provider>
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            <Text style={{    
               marginTop: 8,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Satoshi-Regular'  }}>Text my</Text>
          <CustomInput
            title={"test"}
            error={"error"}
            // customStyle={styles.input}
            value={""}
            placeholder={"placeholder"}
            // refVal={vNoRef}
            onChangeText={(res) => {
              // setVNoError("");
              // setVNo(res);
            }}
            // onSubmitEditing={() => {
            //   colorRef.current?.focus();
            // }}
          />
        <CustomButton
        isLeftButton
          // customStyle={{ backgroundColor: Colors.primary }}
          title={"Button"}
          onPress={() => {}}
        />
        <CheckBox
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        </View>
        
      </ScrollView> */}
      {/* <Loader/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: Font.FontMedium
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    fontFamily: Font.FontRegular
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
