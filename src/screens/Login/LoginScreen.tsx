import { createRef, useEffect, useState } from "react";
import { StackPropsType } from "../../navigation/NavigationProps";
import CustomPhoneInput from "../../components/CustomPhoneInput";
import { Image, Keyboard, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import images from "../../theme/imageIndex";
import { LABELS } from "../../locales/common";
import CustomButton from "../../components/CustomButton";
import { Colors } from "../../theme";
import { navigate } from "../../navigation/RootNavigationFunctions";
import screens from "../../navigation/NavigationScreens";
import styles from "./LoginScreenStyle";
import { CustomScreen } from "../../components/CustomScreen";
import { CustomScrollView } from "../../components/CustomScrollView";
import {CountryPicker} from "react-native-country-codes-picker";
import { screenScale, verticalScale } from "../../utils/scaling";
import { country } from "../../utils/commonData";
import { CountryCode } from "../../utils/CommonTypes";
import { maskMobile, showToast, unMaskMobile, validateEmail, validateMobile, validatePassword } from "../../utils/CommonFunctions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { SendOTPAPIRequest } from "../../redux/types/authTypes";
import { loginWithPassword, sendOtp } from "../../redux/actions/authActions";
import CustomInput from "../../components/CustomInput";

const LoginScreen = ({ navigation }: StackPropsType<"Login">) => {
    const [showCountryCodes, setShowCountryCodes] = useState(false)
    const [countryCode, setCountryCode] = useState<CountryCode>(country[234])
    const [mobileNumber, setMobileNumber] = useState("")
    const [mobileNumberError, setMobileNumberError] = useState(" ")
    const [emailAddress, setEmailAddress] = useState('');
    const [emailAddressError, setEmailAddressError] = useState(' ');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(' ');
    const [isSubmitClicked, setIsSubmitClicked] = useState(false)
    const emailRef = createRef<TextInput | null>();
    const passRef = createRef<TextInput | null>();
    const dispatch = useDispatch<AppDispatch>()
    const { device_token } = useSelector(
      (state: RootState) => state.authSlice,
    );
    useEffect(() => {
    //  console.log(maskMobile("999 999"))
        if (isSubmitClicked) {
            if (mobileNumber?.length === 0) {
                setMobileNumberError(LABELS.LoginScreen.requiredMobile)
            } else if (!validateMobile(mobileNumber)) {
                setMobileNumberError(LABELS.LoginScreen.validMobile)
            } else {
                setMobileNumberError("")
            }
        }
    },[mobileNumber]);

    useEffect(() => {
      if (isSubmitClicked) {
        checkEmail();
      }
    }, [emailAddress]);

    useEffect(() => {
      if (isSubmitClicked) {
        checkPassword();
      }
    }, [password]);

    const checkEmail = () => {
      if (emailAddress?.length === 0) {
        setEmailAddressError(LABELS.SignupScreen.requiredEmail);
        return false;
      // } else if (!validateEmail(emailAddress)) {
      //   setEmailAddressError(LABELS.SignupScreen.validEmail);
      //   return false;
      } else {
        setEmailAddressError(' ');
        return true;
      }
    };

    const checkPassword = () => {
      if (password?.length === 0) {
        setPasswordError(LABELS.LoginScreen.passwordError);
        return false;
      } else if (!validatePassword(password)) {
        setPasswordError(LABELS.LoginScreen.passwordValid);
        return false;
      } else {
        setPasswordError(' ');
        return true;
      }
    };

    useEffect(() => {
      //  console.log(maskMobile("999 999"))
          if (isSubmitClicked) {
              if (mobileNumber?.length === 0) {
                  setMobileNumberError(LABELS.LoginScreen.requiredMobile)
              } else if (!validateMobile(mobileNumber)) {
                  setMobileNumberError(LABELS.LoginScreen.validMobile)
              } else {
                  setMobileNumberError("")
              }
          }
      },[emailAddress]);
    
    const onSendCode = () => {
        setIsSubmitClicked(true)
        if (mobileNumber?.length === 0) {
            setMobileNumberError(LABELS.LoginScreen.requiredMobile)
        } else if (!validateMobile(mobileNumber)) {
            setMobileNumberError(LABELS.LoginScreen.validMobile)
        } else {
          const body : SendOTPAPIRequest ={
            mobile: unMaskMobile(mobileNumber),
            country_code: countryCode.dial_code
          }
          dispatch(sendOtp({ body }))
          .unwrap()
          .then((res: any) => {
            let resp = res?.data ? res.data : res;
            console.log(" send otp response", resp);
            if (resp?.otp) {
              console.log(" send otp response inside", resp);
              navigate(screens.VERIFICATION, { dialCode: countryCode.dial_code, mobile: unMaskMobile(mobileNumber), fromScreen: "Login", otpData: resp.otp?.toString()})
            }
            // if (resp && resp?.status === STATUS_CODES.SUCCESS) {
            //   showToast(resp?.message, "success");
            //   navigate(screens.VERIFICATION, { dialCode: countryCode.dial_code, mobile: mobileNumber, fromScreen: "Register"})
            // } else {
            //   // clear();
            // }
          });
        }
    }

    const onLogin = () => {
      setIsSubmitClicked(true)
      const validemail = checkEmail()
      const validpassword = checkPassword()
      if (validemail && validpassword) {
        // const body : SendOTPAPIRequest ={
        //   mobile: unMaskMobile(mobileNumber),
        //   country_code: countryCode.dial_code
        // }
        // dispatch(sendOtp({ body }))
        // .unwrap()
        // .then((res: any) => {
        //   let resp = res?.data ? res.data : res;
        //   console.log(" send otp response", resp);
        //   if (resp?.otp) {
        //     console.log(" send otp response inside", resp);
        //     navigate(screens.VERIFICATION, { dialCode: countryCode.dial_code, mobile: unMaskMobile(mobileNumber), fromScreen: "Login", otpData: resp.otp?.toString()})
        //   }
        //   // if (resp && resp?.status === STATUS_CODES.SUCCESS) {
        //   //   showToast(resp?.message, "success");
        //   //   navigate(screens.VERIFICATION, { dialCode: countryCode.dial_code, mobile: mobileNumber, fromScreen: "Register"})
        //   // } else {
        //   //   // clear();
        //   // }
        // });

        const body : any ={
          email: emailAddress,
          password: password,
          device_token: device_token || "",
        }
        dispatch(loginWithPassword({ body }))
        .unwrap()
        .then((res: any) => {
          let resp = res?.data ? res.data : res;
          console.log(" login email response", resp);
          if (resp.is_verify === 0) {
            navigate(screens.VERIFICATION, { fromScreen: "Login", email: emailAddress})
          } else if (resp) {
            navigation.reset({
            index: 0,
            routes: [{ name: "BottomTabs" }],
          });
          }
          // if (resp) {
          //   navigation.reset({
          //   index: 0,
          //   routes: [{ name: "BottomTabs" }],
          // });
          // }
      }
    )
  }
}
        
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
        <CustomScrollView customStyle={{width: '100%'}}>
          <View style={styles.bigImageView}>
            <Image source={images.loginBigImage} style={styles.bigImage} />
          </View>
          <View style={styles.belowView}>
            <Text style={styles.text}>{LABELS.LoginScreen.text1}</Text>
            <Text style={[styles.text, { color: Colors.primary }]}>{LABELS.LoginScreen.text2}</Text>
            <Text style={styles.text2}>{LABELS.LoginScreen.text3}</Text>
            {/* <CustomPhoneInput
              error={mobileNumberError}
              customStyle={styles.mobile}
              textInputStyle={mobileNumber ? {letterSpacing: 2} : {}}
              value={mobileNumber}
              placeholder={LABELS.LoginScreen.mobileNumber}
              inputExtra={{
                keyboardType: 'decimal-pad',
                maxLength: 12,
              }}
              countryCode={countryCode}
              onCountryCodePress={() => setShowCountryCodes(true)}
              // refVal={vNoRef}
              onChangeText={res => {
                setMobileNumber(res);
                // setVNoError("");
                // setVNo(res);
              }}
              // onSubmitEditing={() => {
              //   colorRef.current?.focus();
              // }}
            /> */}
          <CustomInput
            title={LABELS.LoginScreen.emailorUsername}
            error={emailAddressError}
            customContainerStyle={styles.commonInput}
            value={emailAddress}
            placeholder={LABELS.LoginScreen.emailorUsername}
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
              passRef.current?.focus();
            }}
          />
          <CustomInput
            isPassword
            title={LABELS.LoginScreen.password}
            error={passwordError}
            customContainerStyle={styles.commonInput}
            value={password}
            placeholder={LABELS.LoginScreen.password}
            inputExtra={{
              // keyboardType: '',
              maxLength: 50,
              autoCapitalize: 'none'
            }}
            refVal={passRef}
            onChangeText={res => {
              setPassword(res);
            }}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
          />
          <TouchableOpacity onPress={() => navigate(screens.FORGOTPASSWORD, {})}>
            <Text
                style={[styles.bottomText, {color: Colors.primary, marginTop: screenScale(6)}]}>
                {LABELS.LoginScreen.forgotPassword}
            </Text>
            </TouchableOpacity>
            {/* <CustomButton
              customStyle={styles.buttonStyle}
              title={LABELS.LoginScreen.sendCode}
              onPress={() => onSendCode()}
            /> */}
            <CustomButton
              customStyle={styles.buttonStyle}
              title={LABELS.SignupScreen.logIn}
              onPress={() => onLogin()}
            />
            <Text style={styles.bottomText}>
              <Text style={[styles.bottomText, {color: Colors.secondoryText}]}>
                {LABELS.LoginScreen.dontHaveAccount}
              </Text>
              <Text
                onPress={() => navigate(screens.SIGNUP, {})}
                style={[styles.bottomText, {color: Colors.primaryText}]}>
                {LABELS.LoginScreen.signup}
              </Text>
            </Text>
          </View>
          <View style={{ paddingBottom: screenScale(33) }} />
        </CustomScrollView>
        <CountryPicker
          lang="en"
          show={showCountryCodes}
          style={{
            modal: {
              height: verticalScale(500),
            },
          }}
          initialState={'+1'}
          // when picker button press you will get the country object with dial code
          pickerButtonOnPress={item => {
            setShowCountryCodes(false);
            const foundCountry = country.find(code => code.code === item.code);
            console.log(' selected code', item, foundCountry);
            foundCountry && setCountryCode(foundCountry);
          }}
        />
      </CustomScreen>
    );
  };
  
  export default LoginScreen;