import { PermissionsAndroid, Platform } from "react-native";
import { isIOS } from "./CommonFunctions";
import messaging from '@react-native-firebase/messaging';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/store";
import { setDeviceToken } from "../redux/reducers/authReducer/authSlice";
import notifee, { AndroidImportance } from "@notifee/react-native";


export const getFCMToken = (onSuccess: (token: any) => void) => {
    // const dispatch = useDispatch<AppDispatch>()
    if (isIOS()) {
        messaging().requestPermission().then((data) => { 
          console.log(data);
          messaging().getToken().then((token) => {
            // dispatch(setDeviceToken(token));
            onSuccess(token)
            console.log("fcm token ===========>>>>>>>>", token, Platform.OS);
          })
         }).catch((err) =>  console.log(err));
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((data) => {
            messaging().getToken().then((token) => {
              onSuccess(token)
              // dispatch(setDeviceToken(token));
              console.log("fcm token ===========>>>>>>>>", token, Platform.OS);
            })
          });
        }
}

export async function onDisplayNotification(res: any) {
  const channelId = await notifee.createChannel({
    id: "sound",
    name: "sound Channel",
    importance: AndroidImportance.HIGH,
    // sound: "levelup",
  });
  await notifee.displayNotification({
    title: res?.notification?.title,
    body: res?.notification?.body,
    data: res?.data,
    android: {
      channelId,
      pressAction: {
        id: "sound",
      },
      importance: AndroidImportance.HIGH,
      // sound: "levelup",
      vibrationPattern: [300, 500],
    },
    ios: {
      // sound: "levelup.wav",
    },
  });
}