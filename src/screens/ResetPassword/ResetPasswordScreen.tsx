import { createRef, useEffect, useState } from "react";
import { StackPropsType, tabStackProps } from "../../navigation/NavigationProps";
import { Image, ImageBackground, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CustomScreen } from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { goBack } from "../../navigation/RootNavigationFunctions";
import { Colors } from "../../theme";
import { LABELS } from "../../locales/common";
import { CountryCode } from "../../utils/CommonTypes";
import { country } from "../../utils/commonData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { CustomScrollView } from "../../components/CustomScrollView";
import CustomInput from "../../components/CustomInput";
import CustomPhoneInput from "../../components/CustomPhoneInput";
import { screenScale, verticalScale } from "../../utils/scaling";
import { isIOS, showToast, unMaskMobile, validateCode, validateEmail, validateMobile, validatePassword } from "../../utils/CommonFunctions";
import { CommonStyleSheets } from "../../utils/CommonStyle";
import { CountryPicker } from "react-native-country-codes-picker";
import CustomButton from "../../components/CustomButton";
import { contactUs } from "../../redux/actions/profileActions";
import { STATUS_CODES } from "../../utils/CommonConstants";
import styles from "./ResetPasswordScreenStyle";
import { forgotPassword, sendOtpEmail } from "../../redux/actions/authActions";

const ResetPasswordScreen = ({ navigation, route }: StackPropsType<"ResetPassword">) => {

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState(' ');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(' ');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(' ');

  const passRef = createRef<TextInput | null>();
  const newpassRef = createRef<TextInput | null>();
  const confirmpassRef = createRef<TextInput | null>();

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const { email, otpData } = route?.params

  useEffect(() => {
    console.log(" route data", email, otpData)
    if (email && otpData) {
      // setVerificationCode(otpData?.toString())
    }
  }, [route])

  useEffect(() => {
    if (isSubmitClicked) {
      checkNewPassword();
    }
  }, [newPassword]);
  useEffect(() => {
    if (isSubmitClicked) {
      checkConfirmPassword();
    }
  }, [confirmNewPassword]);

  useEffect(() => {
    if (isSubmitClicked) {
      checkVerificationCode();
    }
  }, [verificationCode]);

  const checkVerificationCode = () => {
    if (verificationCode?.length === 0) {
      setVerificationCodeError(LABELS.ResetPasswordScreen.verificationCodeRequired);
      return false;
    } else if (!validateCode(verificationCode)) {
      setVerificationCodeError(LABELS.ResetPasswordScreen.verificationCodeValid);
      return false;
    } else {
      setVerificationCodeError(' ');
      return true;
    }
  };

  const checkNewPassword = () => {
    if (newPassword?.length === 0) {
      setNewPasswordError(LABELS.ChangePasswordScreen.newPasswordRequired);
      return false;
    } else if (!validatePassword(newPassword)) {
        setNewPasswordError(LABELS.ChangePasswordScreen.newPasswordValid);
      return false;
    } else {
        setNewPasswordError(' ');
      return true;
    }
  };

  const checkConfirmPassword = () => {
    if (confirmNewPassword?.length === 0) {
      setConfirmNewPasswordError(LABELS.ChangePasswordScreen.confirmNewPasswordRequired);
      return false;
    } else if (newPassword !== confirmNewPassword) {
        setConfirmNewPasswordError(LABELS.ChangePasswordScreen.confirmNewPasswordValid);
      return false;
    } else {
        setConfirmNewPasswordError(' ');
      return true;
    }
  };

    const onSubmit = () => {
      setIsSubmitClicked(true);
      const isValidOldPassword = checkVerificationCode();
      const isValidNewPassword = checkNewPassword();
      const isValidConfirmPassword = checkConfirmPassword();
      if (
        isValidOldPassword &&
        isValidNewPassword &&
        isValidConfirmPassword
      ) {
        let body = {
          otp: verificationCode,
          email: email,
          password: newPassword,
          confirm_password: confirmNewPassword
        }
      
  
        dispatch(
          forgotPassword({ body })
        )
          .unwrap()
          .then((res: any) => {
            let resp = res?.status ? res : res?.data;
            console.log(resp);
            if (resp && resp?.status === STATUS_CODES.SUCCESS) {
              console.log(" forgot password success", resp)
              showToast(resp?.message, 'success')
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            } else {
              // clear();
            }
          });
     }
    }

    const onResendOtp = () => {
      if (email) {
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
          // setVerificationCode(resp.otp?.toString())
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


    const renderButton = () => (
      <View
        style={[
          CommonStyleSheets.commonBottomView
        ]}>
        <CustomButton
          // customStyle={styles.buttonStyle}
          title={LABELS.COMMON_LABELS.submit}
          onPress={() => onSubmit()}
        />
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
        title={LABELS.ResetPasswordScreen.header}
        showBack
      />
      <CustomScrollView
        extras={{ extraScrollHeight: isIOS() ? 56 : 56, enableOnAndroid: true  }}
        customStyle={{width: '100%', paddingHorizontal: screenScale(24), paddingTop: screenScale(24)}}>
        <Text style={styles.subText}>{LABELS.ResetPasswordScreen.text}</Text>
        <CustomInput
            title={LABELS.ResetPasswordScreen.verificationCode}
            error={verificationCodeError}
            customContainerStyle={styles.commonInput}
            value={verificationCode}
            placeholder={LABELS.ResetPasswordScreen.verificationCode}
            inputExtra={{
              keyboardType: 'decimal-pad',
              maxLength: 6,
              autoCapitalize: 'none'
            }}
            
            refVal={newpassRef}
            onChangeText={res => {
              setVerificationCode(res);
            }}
            onSubmitEditing={() => {
                newpassRef?.current?.focus();
            }}
          />
          <CustomInput
            title={LABELS.ChangePasswordScreen.newPassword}
            error={newPasswordError}
            customContainerStyle={styles.commonInput}
            value={newPassword}
            placeholder={LABELS.ChangePasswordScreen.newPassword}
            inputExtra={{
              // keyboardType: 'visible-password',
              maxLength: 50,
              autoCapitalize: 'none'
            }}
            
            refVal={newpassRef}
            onChangeText={res => {
              setNewPassword(res);
            }}
            onSubmitEditing={() => {
                confirmpassRef?.current?.focus();
            }}
          />
          <CustomInput
            title={LABELS.ChangePasswordScreen.confirmNewPassword}
            error={confirmNewPasswordError}
            customContainerStyle={styles.commonInput}
            value={confirmNewPassword}
            placeholder={LABELS.ChangePasswordScreen.confirmNewPassword}
            inputExtra={{
              // keyboardType: 'visible-password',
              maxLength: 50,
              autoCapitalize: 'none'
            }}
            
            refVal={passRef}
            onChangeText={res => {
              setConfirmNewPassword(res);
            }}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
          />
          {renderBottomView()}
        <View style={{ paddingBottom: screenScale(120) }}/>
      </CustomScrollView>
      {renderButton()}
      </CustomScreen>
    );
  };
  
  export default ResetPasswordScreen;