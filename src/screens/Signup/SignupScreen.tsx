import { createRef, useEffect, useState } from "react";
import { StackPropsType } from "../../navigation/NavigationProps";
import CustomPhoneInput from "../../components/CustomPhoneInput";
import { Image, Keyboard, Linking, Text, View } from "react-native";
import images from "../../theme/imageIndex";
import { LABELS } from "../../locales/common";
import CustomButton from "../../components/CustomButton";
import { Colors, Font } from "../../theme";
import { goBack, navigate } from "../../navigation/RootNavigationFunctions";
import screens from "../../navigation/NavigationScreens";
import styles from "./SignupScreenStyle";
import { CustomScreen } from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { CustomScrollView } from "../../components/CustomScrollView";
import { screenScale, verticalScale } from "../../utils/scaling";
import CustomInput from "../../components/CustomInput";
import { CountryCode } from "../../utils/CommonTypes";
import { AccountType, country } from "../../utils/commonData";
import { CheckBox } from "../../components/Checkbox";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hasNotch, isIOS, showToast, unMaskMobile, validateEmail, validateMobile, validatePassword, validateUserName } from "../../utils/CommonFunctions";
import { CountryPicker } from "react-native-country-codes-picker";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { register } from "../../redux/actions/authActions";
import { STATUS_CODES } from "../../utils/CommonConstants";
import { CustomRadio } from "../../components/CustomRadio";

const SignupScreen = ({navigation}: StackPropsType<'Signup'>) => {
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState(' ');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState(' ');
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>(country[234]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState(' ');
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressError, setEmailAddressError] = useState(' ');
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState(' ');
  const [zipCode, setZipCode] = useState('');
  const [zipCodeError, setZipCodeError] = useState(' ');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(' ');
  const [agreeeTerms, setAgreeTerms] = useState(true);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [accType, setAccType] = useState(0);

  const firstNameRef = createRef<TextInput | null>();
  const lastNameRef = createRef<TextInput | null>();
  const mobileRef = createRef<TextInput | null>();
  const emailRef = createRef<TextInput | null>();
  const zipRef = createRef<TextInput | null>();
  const passRef = createRef<TextInput | null>();
  const unameRef = createRef<TextInput | null>();

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();

  const checkFirstName = () => {
    if (firstName?.length === 0) {
      setFirstNameError(LABELS.SignupScreen.requiredFirstName);
      return false;
    } else {
      setFirstNameError(' ');
      return true;
    }
  };

  const checkLastName = () => {
    if (lastName?.length === 0) {
      setLastNameError(LABELS.SignupScreen.requiredLastName);
      return false;
    } else {
      setLastNameError(' ');
      return true;
    }
  };

  const checkMobile = () => {
    if (mobileNumber?.length === 0) {
      setMobileNumberError(LABELS.SignupScreen.requiredMobile);
      return false;
    } else if (!validateMobile(mobileNumber)) {
      setMobileNumberError(LABELS.SignupScreen.validMobile);
      return false;
    } else {
      setMobileNumberError(' ');
      return true;
    }
  };

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

  const checkUsername = () => {
    if (userName?.length === 0) {
      setUserNameError(LABELS.SignupScreen.userNameRequired);
      return false;
    } else if (!validateUserName(userName)) {
      setUserNameError(LABELS.SignupScreen.userNameValid);
      return false;
    } else {
      setUserNameError(' ');
      return true;
    }
  };

  const checkZip = () => {
    if (zipCode?.length === 0) {
      setZipCodeError(LABELS.SignupScreen.requiredZip);
      return false;
    } else if (zipCode?.length < 5) {
      setZipCodeError(LABELS.SignupScreen.validZip);
      return false;
    } else {
      setZipCodeError(' ');
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
    if (isSubmitClicked) {
      checkFirstName();
    }
  }, [firstName]);
  useEffect(() => {
    if (isSubmitClicked) {
      checkLastName();
    }
  }, [lastName]);
  useEffect(() => {
    if (isSubmitClicked) {
      checkMobile();
    }
  }, [mobileNumber]);
  useEffect(() => {
    if (isSubmitClicked) {
      checkEmail();
    }
  }, [emailAddress]);
  useEffect(() => {
    if (isSubmitClicked) {
      checkZip();
    }
  }, [zipCode]);
  useEffect(() => {
    if (isSubmitClicked) {
      checkPassword();
    }
  }, [password]);
  useEffect(() => {
    if (isSubmitClicked) {
      checkUsername();
    }
  }, [userName]);

  const onCreateAccount = () => {
    setIsSubmitClicked(true);
    const isValidFirstName = checkFirstName();
    const isValidLastName = checkLastName();
    const isValidMobile = checkMobile();
    const isValidEmail = checkEmail();
    const isValidZip = checkZip();
    const isValidPassword = checkPassword();
    const isValidUsername = checkUsername();
    if (
      isValidFirstName &&
      isValidLastName &&
      isValidMobile &&
      isValidEmail &&
      isValidZip &&
      isValidPassword &&
      isValidUsername
    ) {
      let body = {
        first_name: firstName,
        last_name: lastName,
        mobile: unMaskMobile(mobileNumber),
        email: emailAddress,
        username: userName,
        password: password,
        zip_code: zipCode,
        country_code: countryCode.dial_code,
        is_seller: 0,
        is_business_profile: accType === 0 ? 0 : 1
      }
      if (accType === 1) {
        navigate(screens.BUSINESSDETAILS, { oldBody: body })
      } else {
        dispatch(
          register({ body })
        )
          .unwrap()
          .then((res: any) => {
            let resp = res?.status ? res : res?.data;
            console.log(resp);
            if (resp && resp?.status === STATUS_CODES.SUCCESS) {
              showToast(resp?.message, "success");
              navigate(screens.VERIFICATION, { dialCode: countryCode.dial_code, mobile: unMaskMobile(mobileNumber), fromScreen: "Register", otpData: resp?.data?.OTP, email: emailAddress})
            } else {
              // clear();
            }
          });
      }  
    }
  };

  const renderTypes = () => (
    <View style={styles.genderRoot} >
      {/* <Text style={styles.genderTitle}>{LABELS.ProfileSettingScreen.gender}</Text> */}
      <View style={styles.genderView} >
       <View style={[styles.singleGender, styles.borderView]} >
       <CustomRadio
                    value={accType === 0}
                    onValueChange={(val) => setAccType(0)}
                />
                <Text style={styles.genderText}>{AccountType[0].name}</Text>
       </View>
       <View style={[styles.singleGender, styles.borderView]} >
       <CustomRadio
                    value={accType === 1}
                    onValueChange={(val) => setAccType(1)}
                />
                <Text style={styles.genderText}>{AccountType[1].name}</Text>
       </View>
      </View>
    </View>
  )

  const renderCheck = () => (
    <View style={styles.termsView}>
      {/* <CheckBox
        disabled
        value={agreeeTerms}
        onValueChange={newValue => setAgreeTerms(newValue)}
      /> */}
      <Text style={styles.agreeText}>
        <Text style={[styles.agreeText, {fontFamily: Font.FontRegular}]}>
          {LABELS.SignupScreen.termsText1}
        </Text>
        <Text
          // onPress={() => navigate(screens.TERMSANDCONDITIONS, {})}
          onPress={() => Linking.openURL("https://greenclusta.net/terms-and-conditions/")}
          style={[
            styles.agreeText,
            {fontFamily: Font.FontBold, textDecorationLine: 'underline'},
          ]}>
          {LABELS.SignupScreen.termsText2}
        </Text>
        <Text style={[styles.agreeText, {fontFamily: Font.FontRegular}]}>
          {LABELS.SignupScreen.termsText3}
        </Text>
        <Text
          // onPress={() => navigate(screens.PRIVACY_POLICY, {})}
          onPress={() => Linking.openURL("https://greenclusta.net/privacy-policy/")}
          style={[
            styles.agreeText,
            {fontFamily: Font.FontBold, textDecorationLine: 'underline'},
          ]}>
          {LABELS.SignupScreen.termsText4}
        </Text>
      </Text>
    </View>
  );

  const renderButton = () => (
    <View
      style={[
        styles.bottomView,
        {paddingBottom: hasNotch() ? screenScale(24) : screenScale(12)},
      ]}>
      <CustomButton
        customStyle={styles.buttonStyle}
        title={accType === 1 ? LABELS.COMMON_LABELS.next : LABELS.SignupScreen.createAccount}
        onPress={() => onCreateAccount()}
      />
    </View>
  );

  const renderBusinessDetails = () => (
    <>
          <CustomInput
          title={LABELS.SignupScreen.businessName}
          error={firstNameError}
          customContainerStyle={styles.commonInput}
          value={firstName}
          placeholder={LABELS.SignupScreen.businessName}
          inputExtra={{
            maxLength: 50,
          }}
          refVal={firstNameRef}
          onChangeText={res => {
            setFirstName(res);
          }}
          onSubmitEditing={() => {
            mobileRef.current?.focus();
          }}
        />
        <CustomPhoneInput
          title={LABELS.SignupScreen.businessPhoneNumber}
          error={mobileNumberError}
          customContainerStyle={styles.commonInput}
          textInputStyle={mobileNumber ? {letterSpacing: 2} : {}}
          value={mobileNumber}
          placeholder={LABELS.SignupScreen.businessPhoneNumber}
          inputExtra={{
            keyboardType: 'decimal-pad',
            maxLength: 12,
          }}
          countryCode={countryCode}
          onCountryCodePress={() => setShowCountryCodes(true)}
          refVal={mobileRef}
          onChangeText={res => {
            setMobileNumber(res);
          }}
          onSubmitEditing={() => {
            emailRef.current?.focus();
          }}
        />
        <CustomInput
          title={LABELS.SignupScreen.businessEmail}
          error={emailAddressError}
          customContainerStyle={styles.commonInput}
          value={emailAddress}
          placeholder={LABELS.SignupScreen.businessEmail}
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
            // passRef.current?.focus();
          }}
        /></>
  )

  const renderIndividualDetails = () => (
    <>
            <CustomInput
          title={LABELS.SignupScreen.firstName}
          error={firstNameError}
          customContainerStyle={styles.commonInput}
          value={firstName}
          placeholder={LABELS.SignupScreen.firstName}
          inputExtra={{
            maxLength: 50,
          }}
          refVal={firstNameRef}
          onChangeText={res => {
            setFirstName(res);
          }}
          onSubmitEditing={() => {
            lastNameRef.current?.focus();
          }}
        />
        <CustomInput
          title={LABELS.SignupScreen.lastName}
          error={lastNameError}
          customContainerStyle={styles.commonInput}
          value={lastName}
          placeholder={LABELS.SignupScreen.lastName}
          inputExtra={{
            maxLength: 50,
          }}
          refVal={lastNameRef}
          onChangeText={res => {
            setLastName(res);
          }}
          onSubmitEditing={() => {
            mobileRef.current?.focus();
          }}
        />
        <CustomPhoneInput
          title={LABELS.SignupScreen.mobileNumber}
          error={mobileNumberError}
          customContainerStyle={styles.commonInput}
          textInputStyle={mobileNumber ? {letterSpacing: 2} : {}}
          value={mobileNumber}
          placeholder={LABELS.LoginScreen.mobileNumber}
          inputExtra={{
            keyboardType: 'decimal-pad',
            maxLength: 12,
          }}
          countryCode={countryCode}
          onCountryCodePress={() => setShowCountryCodes(true)}
          refVal={mobileRef}
          onChangeText={res => {
            setMobileNumber(res);
          }}
          onSubmitEditing={() => {
            emailRef.current?.focus();
          }}
        />
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
            unameRef.current?.focus();
          }}
        /></>
  )

  return (
    <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
      <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        centerView={() => (
          <Image source={images.appLogoGreen} style={{ height: screenScale(40) ,resizeMode: 'contain'}} />
        )}
        showBack
      />
      <CustomScrollView
        extras={{ extraScrollHeight: isIOS() ? 0 : 56, enableOnAndroid: true  }}
        customStyle={{width: '100%', paddingHorizontal: screenScale(24)}}>
        <Text style={styles.topText}>
          {LABELS.SignupScreen.createYourAccount}
        </Text>
        <Text style={styles.subText}>{LABELS.SignupScreen.subText}</Text>
        {renderTypes()}
        {renderIndividualDetails()}
          <CustomInput
            title={LABELS.SignupScreen.userName}
            error={userNameError}
            customContainerStyle={styles.commonInput}
            value={userName}
            placeholder={LABELS.SignupScreen.userName}
            inputExtra={{
              keyboardType: 'default',
              maxLength: 50,
              autoCapitalize: 'none'
            }}
            
            refVal={unameRef}
            onChangeText={res => {
              setUserName(res);
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
              // keyboardType: 'visible-password',
              maxLength: 50,
              autoCapitalize: 'none'
            }}
            
            refVal={passRef}
            onChangeText={res => {
              setPassword(res);
            }}
            onSubmitEditing={() => {
              zipRef.current?.focus();
            }}
          />
        <CustomInput
          title={LABELS.SignupScreen.zipCode}
          error={zipCodeError}
          customContainerStyle={styles.commonInput}
          value={zipCode}
          placeholder={LABELS.SignupScreen.zipCode}
          inputExtra={{
            keyboardType: 'decimal-pad',
            maxLength: 6,
          }}
          refVal={zipRef}
          onChangeText={res => {
            setZipCode(res);
          }}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />
        {renderCheck()}
        <View style={{ marginBottom: screenScale(88) }}>
        <Text style={styles.bottomText}>
              <Text style={[styles.bottomText, {color: Colors.secondoryText}]}>
                {LABELS.SignupScreen.alreadyHaveAccount}
              </Text>
              <Text
                onPress={() => navigate(screens.LOGIN, {})}
                style={[styles.bottomText, {color: Colors.primaryText}]}>
                {LABELS.SignupScreen.logIn}
              </Text>
            </Text>
            </View>
      </CustomScrollView>
      {renderButton()}
      <CountryPicker
        lang="en"
        show={showCountryCodes}
        style={{
          modal: {
            height: verticalScale(500),
          },
        }}
        initialState={'+1'}
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

export default SignupScreen;