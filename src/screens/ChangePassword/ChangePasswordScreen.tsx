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
import { isIOS, showToast, unMaskMobile, validateEmail, validateMobile, validatePassword } from "../../utils/CommonFunctions";
import { CommonStyleSheets } from "../../utils/CommonStyle";
import { CountryPicker } from "react-native-country-codes-picker";
import CustomButton from "../../components/CustomButton";
import { contactUs } from "../../redux/actions/profileActions";
import { STATUS_CODES } from "../../utils/CommonConstants";
import styles from "./ChangePasswordScreenStyle";
import { changePassword } from "../../redux/actions/authActions";

const ChangePasswordScreen = ({ navigation }: StackPropsType<"ChangePassword">) => {

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState(' ');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(' ');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(' ');

  const passRef = createRef<TextInput | null>();
  const newpassRef = createRef<TextInput | null>();
  const confirmpassRef = createRef<TextInput | null>();

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isSubmitClicked) {
      checkOldPassword();
    }
  }, [oldPassword]);
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

  const checkOldPassword = () => {
    if (oldPassword?.length === 0) {
      setOldPasswordError(LABELS.LoginScreen.passwordError);
      return false;
    } else if (!validatePassword(oldPassword)) {
        setOldPasswordError(LABELS.LoginScreen.passwordValid);
      return false;
    } else {
        setOldPasswordError(' ');
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
      const isValidOldPassword = checkOldPassword();
      const isValidNewPassword = checkNewPassword();
      const isValidConfirmPassword = checkConfirmPassword();
      if (
        isValidOldPassword &&
        isValidNewPassword &&
        isValidConfirmPassword
      ) {
        let body = {
          old_password: oldPassword,
          password: newPassword,
          confirm_password: confirmNewPassword
        }
        dispatch(
          changePassword({ body })
        )
          .unwrap()
          .then((res: any) => {
            let resp = res?.status ? res : res?.data;
            console.log(resp);
            if (resp && resp?.status === STATUS_CODES.SUCCESS) {
              console.log("change password response", resp)
              showToast(resp?.message, "success");
              goBack();
            } else {
              // clear();
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
        title={LABELS.ChangePasswordScreen.header}
        showBack
      />
      <CustomScrollView
        extras={{ extraScrollHeight: isIOS() ? 56 : 56, enableOnAndroid: true  }}
        customStyle={{width: '100%', paddingHorizontal: screenScale(24), paddingTop: screenScale(24)}}>
            <CustomInput
            title={LABELS.ChangePasswordScreen.oldPassword}
            error={oldPasswordError}
            customContainerStyle={styles.commonInput}
            value={oldPassword}
            placeholder={LABELS.ChangePasswordScreen.oldPassword}
            inputExtra={{
              // keyboardType: 'visible-password',
              maxLength: 50,
              autoCapitalize: 'none'
            }}
            
            refVal={passRef}
            onChangeText={res => {
              setOldPassword(res);
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
          
        <View style={{ paddingBottom: screenScale(120) }}/>
      </CustomScrollView>
      {renderButton()}
      </CustomScreen>
    );
  };
  
  export default ChangePasswordScreen;