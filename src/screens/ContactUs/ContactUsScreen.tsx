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
import styles from "./ContactUsScreenStyle";
import CustomPhoneInput from "../../components/CustomPhoneInput";
import { screenScale, verticalScale } from "../../utils/scaling";
import { isIOS, showToast, unMaskMobile, validateEmail, validateMobile } from "../../utils/CommonFunctions";
import { CommonStyleSheets } from "../../utils/CommonStyle";
import { CountryPicker } from "react-native-country-codes-picker";
import CustomButton from "../../components/CustomButton";
import { contactUs } from "../../redux/actions/profileActions";
import { STATUS_CODES } from "../../utils/CommonConstants";

const ContactUsScreen = ({ navigation }: StackPropsType<"ContactUs">) => {

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
  const [messageText, setMessageText] = useState('');
  const [messageError, setMessageError] = useState(' ');
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const firstNameRef = createRef<TextInput | null>();
  const lastNameRef = createRef<TextInput | null>();
  const mobileRef = createRef<TextInput | null>();
  const emailRef = createRef<TextInput | null>();
  const messageRef = createRef<TextInput | null>();

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
 
    },[]);

    const onSubmit = () => {
      setIsSubmitClicked(true);
      const isValidFirstName = checkFirstName();
      const isValidLastName = checkLastName();
      const isValidMobile = checkMobile();
      const isValidEmail = checkEmail();
      const isValidMessage = checkMessage();
      if (
        isValidFirstName &&
        isValidLastName &&
        isValidMobile &&
        isValidEmail && 
        isValidMessage
      ) {
        let body = {
          first_name: firstName,
          last_name: lastName,
          phone: unMaskMobile(mobileNumber),
          email: emailAddress,
          country_code: countryCode.dial_code,
          message: messageText
        }
      
  
        dispatch(
          contactUs({ body })
        )
          .unwrap()
          .then((res: any) => {
            let resp = res?.status ? res : res?.data;
            console.log(resp);
            if (resp && resp?.status === STATUS_CODES.SUCCESS) {
              showToast(resp?.message, "success");
              goBack();
            } else {
              // clear();
            }
          });
     }
    }

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

    const checkMessage = () => {
      if (messageText?.length === 0) {
        setMessageError(LABELS.ContactUsScreen.messageRequired);
        return false;
      } else {
        setMessageError(' ');
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
        checkMessage();
      }
    }, [messageText]);

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
        title={LABELS.ContactUsScreen.header}
        showBack
      />
      <CustomScrollView
        extras={{ extraScrollHeight: isIOS() ? 56 : 56, enableOnAndroid: true  }}
        customStyle={{width: '100%', paddingHorizontal: screenScale(24), paddingTop: screenScale(24)}}>
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
            messageRef.current?.focus();
          }}
        />
        <CustomInput
          title={LABELS.ContactUsScreen.message}
          error={""}
          customContainerStyle={[styles.commonInput]}
          customStyle={CommonStyleSheets.multiLineStyle}
          value={messageText}
          multiline
          placeholder={LABELS.ContactUsScreen.enterMessage}
          inputExtra={{
            maxLength: 500,
            textAlignVertical: 'top'
          }}
          refVal={messageRef}
          onChangeText={res => {
            setMessageText(res);
          }}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />
        <View style={{ paddingBottom: screenScale(120) }}/>
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
  
  export default ContactUsScreen;