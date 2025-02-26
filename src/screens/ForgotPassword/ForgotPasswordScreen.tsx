import { createRef, useEffect, useState } from "react";
import { StackPropsType, tabStackProps } from "../../navigation/NavigationProps";
import { Image, ImageBackground, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CustomScreen } from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { goBack, navigate } from "../../navigation/RootNavigationFunctions";
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
import { isIOS, showToast, unMaskMobile, validateEmail, validateMobile, validatePassword } from "../../utils/CommonFunctions";
import { CommonStyleSheets } from "../../utils/CommonStyle";
import { CountryPicker } from "react-native-country-codes-picker";
import CustomButton from "../../components/CustomButton";
import { contactUs } from "../../redux/actions/profileActions";
import { STATUS_CODES } from "../../utils/CommonConstants";
import styles from "./ForgotPasswordScreenStyle";
import screens from "../../navigation/NavigationScreens";
import { sendOtpEmail } from "../../redux/actions/authActions";

const ForgotPasswordScreen = ({ navigation }: StackPropsType<"ForgotPassword">) => {

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressError, setEmailAddressError] = useState(' ');

  const emailRef = createRef<TextInput | null>();

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isSubmitClicked) {
      checkEmail();
    }
  }, [emailAddress]);


  const checkEmail = () => {
    if (emailAddress?.length === 0) {
      setEmailAddressError(LABELS.SignupScreen.requiredEmail);
      return false;
    } else if (!validateEmail(emailAddress)) {
      setEmailAddressError(LABELS.SignupScreen.validEmail);
      return false;
    } else {
      setEmailAddressError(' ');
      return true;
    }
  };

    const onSubmit = () => {
      setIsSubmitClicked(true);
      const isValidOldEmail = checkEmail()
      if (
        isValidOldEmail
      ) {
        const body : any ={
          email: emailAddress
        }
        dispatch(sendOtpEmail({ body }))
        .unwrap()
        .then((res: any) => {
          let resp = res?.data ? res.data : res;
          console.log(" send otp response", resp);
          if (resp?.otp) {
            showToast("Otp sent successfully.", "success");
            console.log(" send otp response inside", resp);
            navigate(screens.RESETPASSWORD, { email: emailAddress, otpData: resp?.otp})
            // setOTPCode(resp.otp?.toString())
          }
        });
     }
    }



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
        
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
        <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={LABELS.ForgotPasswordScreen.header}
        showBack
      />
      <CustomScrollView
        extras={{ extraScrollHeight: isIOS() ? 56 : 56, enableOnAndroid: true  }}
        customStyle={{width: '100%', paddingHorizontal: screenScale(24), paddingTop: screenScale(24)}}>
        <Text style={styles.subText}>{LABELS.ForgotPasswordScreen.text}</Text>
        <CustomInput
            title={LABELS.SignupScreen.emailAddress}
            error={emailAddressError}
            customContainerStyle={styles.commonInput}
            value={emailAddress}
            placeholder={LABELS.SignupScreen.emailAddress}
            inputExtra={{
              keyboardType: 'email-address',
              maxLength: 50,
              autoCapitalize: 'none'
            }}
            
            refVal={emailRef}
            onChangeText={res => {
              setEmailAddress(res);
            }}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
          />
        <View style={{ paddingBottom: screenScale(120) }}/>
      </CustomScrollView>
      {renderButton()}
      </CustomScreen>
    );
  };
  
  export default ForgotPasswordScreen;