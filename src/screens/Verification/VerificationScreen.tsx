import {useEffect, useState} from 'react';
import {StackPropsType} from '../../navigation/NavigationProps';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../theme/imageIndex';
import {LABELS} from '../../locales/common';
import CustomButton from '../../components/CustomButton';
import {Colors} from '../../theme';
import {goBack, navigate} from '../../navigation/RootNavigationFunctions';
import screens from '../../navigation/NavigationScreens';
import {CustomScreen} from '../../components/CustomScreen';
import {screenScale, verticalScale} from '../../utils/scaling';
import CustomHeader from '../../components/CustomHeader';
import styles from './VerificationScreenStyle';
import {CustomOTPInput} from '../../components/CustomOTPInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { loginWithOTP, sendOtp, sendOtpEmail, verifyEmail } from '../../redux/actions/authActions';
import { LoginWithOTPAPIRequest, SendOTPAPIRequest } from '../../redux/types/authTypes';
import { showToast } from '../../utils/CommonFunctions';

const VerificationScreen = ({
  navigation,
  route,
}: StackPropsType<'Verification'>) => {
  const {dialCode, mobile, fromScreen, otpData, email} = route.params;
  const [otpCode, setOTPCode] = useState('');
  const dispatch = useDispatch<AppDispatch>()
  const { device_token } = useSelector(
    (state: RootState) => state.authSlice,
  );
  useEffect(() => {
    if (email) {
      onResendOtp()
      console.log("email ", email);
      // setOTPCode(otpData?.toString())
      // const body : SendOTPAPIRequest ={
    //   mobile: mobile,
    //   country_code: dialCode
    // }
    // dispatch(sendOtp({ body }))
    // .unwrap()
    // .then((res: any) => {
    //   let resp = res?.data ? res.data : res;
    //   console.log(" send otp response", resp);
    //   if (resp?.otp) {
    //     console.log(" send otp response inside", resp);
    //     setOTPCode(resp.otp?.toString())
    //   }
    //   // if (resp && resp?.status === STATUS_CODES.SUCCESS) {
    //   //   showToast(resp?.message, "success");
    //   //   navigate(screens.VERIFICATION, { dialCode: countryCode.dial_code, mobile: mobileNumber, fromScreen: "Register"})
    //   // } else {
    //   //   // clear();
    //   // }
    // });
  }
  }, [route]);
  const onSendCode = () => {
    if (otpCode?.length === 6) {
      const body :any = {
        // mobile: mobile,
        // country_code: dialCode,
        otp: parseInt(otpCode),
        device_token: device_token ? device_token : ""
      }
      dispatch(loginWithOTP({ body }))
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        console.log(" login with otp response", resp, "body ==>", body);
        if (fromScreen === "Register") {
          navigate(screens.REGISTRATIONSUCCESS, {})
        } else { 
          // navigate("BottomTabs", {})
          navigation.reset({
            index: 0,
            routes: [{ name: "BottomTabs" }],
          });
        }
        // if (resp && resp?.status === STATUS_CODES.SUCCESS) {
        //   showToast(resp?.message, "success");
        //   navigate(screens.VERIFICATION, { dialCode: countryCode.dial_code, mobile: mobileNumber, fromScreen: "Register"})
        // } else {
        //   // clear();
        // }
      });
      
    }
  };

  const onResendOtp = () => {
    if (email) {
      console.log("mobile & dial code", mobile, dialCode);
    const body : any ={
      email: email
      // mobile: mobile,
      // country_code: dialCode
    }
    dispatch(sendOtpEmail({ body }))
    .unwrap()
    .then((res: any) => {
      let resp = res?.data ? res.data : res;
      console.log(" send otp response", resp);
      if (resp?.otp) {
        showToast("Otp sent successfully.", "success");
        console.log(" send otp response inside", resp);
        // setOTPCode(resp.otp?.toString())
      }
      // if (resp && resp?.status === STATUS_CODES.SUCCESS) {
      //   showToast(resp?.message, "success");
      //   navigate(screens.VERIFICATION, { dialCode: countryCode.dial_code, mobile: mobileNumber, fromScreen: "Register"})
      // } else {
      //   // clear();
      // }
    });
  }
  };

  const onVerify = () => {
    if (otpCode?.length === 6) {
      const body :any = {
        email: email,
        otp: parseInt(otpCode),
        device_token: device_token ? device_token : ""
      }
      dispatch(verifyEmail({ body }))
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        console.log(" verofy otp response", resp, "body ==>", body);
        if (fromScreen === "Register") {
          navigate(screens.REGISTRATIONSUCCESS, {})
        } else { 
          // navigate("BottomTabs", {})
          navigation.reset({
            index: 0,
            routes: [{ name: "BottomTabs" }],
          });
        }
        // if (resp && resp?.status === STATUS_CODES.SUCCESS) {
        //   showToast(resp?.message, "success");
        //   navigate(screens.VERIFICATION, { dialCode: countryCode.dial_code, mobile: mobileNumber, fromScreen: "Register"})
        // } else {
        //   // clear();
        // }
      });
      
    }
  };

  // const renderNumber = () => (
  //   <View style={styles.mobileView}>
  //     <Text style={styles.mobileText}>
  //       {'(' + dialCode + ')' + ' ' + mobile.slice(0,3) + ' ' + mobile.slice(3,6)+ ' ' + mobile.slice(6,10)}
  //     </Text>
  //     {fromScreen === "Login" && <TouchableOpacity onPress={() => goBack()} >
  //       <Image source={images.editIcon} style={styles.editImage} />
  //     </TouchableOpacity>}
  //   </View>
  // );

  const renderEmail = () => (
    <View style={styles.mobileView}>
      <Text style={styles.mobileText}>
        {email}
      </Text>
      {/* {fromScreen === "Login" && <TouchableOpacity onPress={() => goBack()} >
        <Image source={images.editIcon} style={styles.editImage} />
      </TouchableOpacity>} */}
    </View>
  );

  const renderBottomView = () => (
    <Text style={styles.bottomText}>
      <Text style={[styles.bottomText, {color: Colors.secondoryText}]}>
        {LABELS.VerificationScreen.didNotRecieve}
      </Text>
      <Text
        onPress={() => onResendOtp()}
        style={[styles.bottomText, {color: Colors.primaryText}]}>
        {LABELS.VerificationScreen.resend}
      </Text>
    </Text>
  );

  return (
    <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
      <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        showBack
      />
      <View style={{width: '100%', paddingHorizontal: screenScale(24)}}>
        <Text style={styles.topText}>
          {LABELS.VerificationScreen.verificationCode}
        </Text>
        <Text style={styles.subText}>{LABELS.VerificationScreen.subText2}</Text>
        {/* {renderNumber()} */}
        {renderEmail()}
        <CustomOTPInput
          value={otpCode}
          onCodeChanged={code => setOTPCode(code)}
          onCodeFilled={code => setOTPCode(code)}
        />
        <CustomButton
          disable={otpCode?.length !== 6}
          customStyle={styles.buttonStyle}
          title={LABELS.VerificationScreen.verifyEmail}
          onPress={() => onVerify()}
        />
        {renderBottomView()}
      </View>
    </CustomScreen>
  );
};

export default VerificationScreen;
