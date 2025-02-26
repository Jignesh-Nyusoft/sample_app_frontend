import { useEffect } from "react";
import { StackPropsType } from "../../navigation/NavigationProps";
import CustomPhoneInput from "../../components/CustomPhoneInput";
import { View } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { Colors, Font } from "../../theme";
import ImagePicker from 'react-native-image-crop-picker';
import CustomInput from "../../components/CustomInput";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { screenScale } from "../../utils/scaling";
import SplashScreen from 'react-native-splash-screen'
import { navigate } from "../../navigation/RootNavigationFunctions";
import screens from "../../navigation/NavigationScreens";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "../../redux/reducers";
import { AppDispatch, RootState } from "../../redux/store/store";

const Splash = ({ navigation }: StackPropsType<"Splash">) => {
  const { isFirstOpen, isLoggedIn } = useSelector(
    (state: RootState) => state.authSlice
  );
  let dispatch = useDispatch<AppDispatch>();
    // useEffect(() => {
    //   const checkAppVersion = async () => {
    //     try {
    //       const version = await checkVersion({
    //         country: "co",
    //       });
    //       console.log("Got version info:", version);
  
    //       if (version.needsUpdate) {
    //         console.log(`App has a ${version.updateType} update pending.`);
    //         dispatch(
    //           setDialogData({
    //             title: t("updateAvailable"),
    //             isVisible: true,
    //             description: t("updateDesc"),
    //             onDone: () => {
    //               Linking.openURL(version.url);
    //             },
    //             isOutSideDisable: true,
    //           })
    //         );
    //       }
    //     } catch (error) {
    //       console.error("Failed to check version", error);
    //     }
    //   };
  
    //   checkAppVersion();
    // }, []);
  
    useEffect(() => {
        console.log("Into the splash screen", isLoggedIn, isFirstOpen);
        // setTimeout(() => {
          // SplashScreen.hide();
          if (isFirstOpen) {
            navigation.reset({
              index: 0,
              routes: [{ name: "Welcome" }],
            });
          } else {
            if (isLoggedIn) {
            navigation.reset({
              index: 0,
              routes: [{ name: "BottomTabs" }],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          }
          }
          // navigate(screens.WELCOMESCREEN, {})
          // navigation.reset({
          //   index: 0,
          //   routes: [{ name: "BottomTabs" }],
          // });
        // }, 2000);
        
    //   if (isLogin === 1 && userData) {
    //     dispatch(getUser({ slug: userData?.slug }))
    //       .unwrap()
    //       .then((r) => {
    //         // if (r && r.status && r.response) {
    //         //   if (r?.response?.all_document_verify == 2) {
    //         //     navigation.replace("WaitingReview", { screen: 3 });
    //         //   } else if (r?.response?.all_document_verify == 3) {
    //         //     navigation.replace("WaitingReview", { screen: 2 });
    //         //   } else if (r.response?.all_document_verify == 4) {
    //         //     navigation.replace("WaitingReview", { screen: 1 });
    //         //   }else {
    //         //     navigation.reset({
    //         //       index: 0,
    //         //       routes: [{ name: "Document" }],
    //         //     })
    //         //   }
    //         // }
    //       });
    //     if (userData && !userData.otp_verified && userData.social_type !== 3) {
    //       navigation.reset({
    //         index: 0,
    //         routes: [{ name: "PhoneNo" }],
    //       });
    //     } else if (!userData.is_profile_complete) {
    //       navigation.reset({
    //         index: 0,
    //         routes: [{ name: "Profile" }],
    //       });
    //     } else if (userData.driver_vehicle_documents.length === 0) {
    //       navigation.replace("AddVehicle", { isFirst: true });
    //     } else if (userData.is_subscribed == 0) {
    //       if (userData?.all_document_verify == 2) {
    //         navigation.replace("WaitingReview", { screen: 3 });
    //       } else if (userData?.all_document_verify == 3) {
    //         navigation.replace("WaitingReview", { screen: 2 });
    //       } else if (userData?.all_document_verify == 4) {
    //         navigation.replace("WaitingReview", { screen: 1 });
    //       } else if (
    //         userData?.all_document_verify == 0 ||
    //         userData?.all_document_verify == 1
    //       ) {
    //         navigation.reset({
    //           index: 0,
    //           routes: [{ name: "Document" }],
    //         });
    //       }
    //     } else if (userData.is_subscribed == 1) {
    //       navigation.navigate("Subscription");
    //     } else {
    //       navigation.reset({
    //         index: 0,
    //         routes: [{ name: "Dashboard" }],
    //       });
    //     }
    //     Smartlook.instance.user.setIdentifier(`${userData.slug}`);
    //   } else {
    //     if (isStarted == 0) {
    //       navigation.replace("Started");
    //     } else {
    //       navigation.replace("Login");
    //     }
    //   }
    }, []);
  
    return (
//         <>
//         <View style={{ flex: 1, backgroundColor: 'white' }}>
//         <CustomHeader
//           goBack={() => {
//             ImagePicker.openPicker({
//                 multiple: true
//               }).then(images => {
//                 console.log(images);
//               });
//           }}
//           container={{ backgroundColor: Colors.white }}
//           title="Style & Dresses"
//           // backImageStyle={{ tintColor: Color.white }}
//         //   centerView={() => (
//         //     <Text style={[commonStyle.headerTxt, { color: Color.blue }]}>
//         //       {t("payment")}
//         //     </Text>
//         //   )}
//           showBack
//         />
//         <CustomPhoneInput
//             title={"test"}
//             error={"error"}
//             // customStyle={styles.input}
//             value={""}
//             placeholder={"placeholder"}
//             // refVal={vNoRef}
//             onChangeText={(res) => {
//               // setVNoError("");
//               // setVNo(res);
//             }}
//             // onSubmitEditing={() => {
//             //   colorRef.current?.focus();
//             // }}
//           />

// <OTPInputView
//     style={{width: '100%', height: 200, paddingHorizontal: 18}}
//     pinCount={6}
//     // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
//     // onCodeChanged = {code => { this.setState({code})}}
//     autoFocusOnLoad
//     codeInputFieldStyle={{
//         width: screenScale(50),
//         height: screenScale(50),
//         borderRadius: 8,
//         fontFamily: Font.FontMedium,
//         color: Colors.primaryText,
//         backgroundColor: Colors.grayBackground
//     }}
//     codeInputHighlightStyle={{
//         borderColor: Colors.primary,
//     }}
//     onCodeFilled = {(code => {
//         console.log(`Code is ${code}, you are good to go!`)
//     })}
// />

//         <CustomInput
//             title={"test"}
//             error={"error"}
//             // customStyle={styles.input}
//             value={""}
//             placeholder={"placeholder"}
//             // refVal={vNoRef}
//             onChangeText={(res) => {
//               // setVNoError("");
//               // setVNo(res);
//             }}
//             // onSubmitEditing={() => {
//             //   colorRef.current?.focus();
//             // }}
//           />
//           </View>
//         </>
      null
    );
  };
  
  export default Splash;