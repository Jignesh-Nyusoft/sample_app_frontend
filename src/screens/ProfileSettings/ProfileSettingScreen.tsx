import {createRef, useEffect, useState} from 'react';
import {StackPropsType, tabStackProps} from '../../navigation/NavigationProps';
import {
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomScreen} from '../../components/CustomScreen';
import CustomHeader from '../../components/CustomHeader';
import {Colors} from '../../theme';
import {LABELS} from '../../locales/common';
import {goBack} from '../../navigation/RootNavigationFunctions';
import {CustomScrollView} from '../../components/CustomScrollView';
import {
  getFileName,
  hasNotch,
  isIOS,
  showToast,
  unMaskMobile,
  validateEmail,
  validateMobile,
} from '../../utils/CommonFunctions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CountryCode} from '../../utils/CommonTypes';
import {Genders, country} from '../../utils/commonData';
import CustomInput from '../../components/CustomInput';
import CustomPhoneInput from '../../components/CustomPhoneInput';
import {screenScale} from '../../utils/scaling';
import styles from './ProfileSettingScreenStyle';
import CustomButton from '../../components/CustomButton';
import images from '../../theme/imageIndex';
import useSelectImage from '../../hooks/useSelectImage';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { UpdateProfileRequest } from '../../redux/types/profileTypes';
import { deleteMyAccount, updateProfile } from '../../redux/actions/profileActions';
import { STATUS_CODES } from '../../utils/CommonConstants';
import { CustomRadio } from '../../components/CustomRadio';
import { CommonStyleSheets } from '../../utils/CommonStyle';
import { setDialogData } from '../../redux/reducers/AlertReducer/alertSlice';
import { logOut } from '../../redux/actions/authActions';
import { CommonActions } from '@react-navigation/native';

const ProfileSettingScreen = ({
  navigation,
}: StackPropsType<'ProfileSetting'>) => {
  const { profileData } = useSelector(
    (state: RootState) => state.profileSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState(' ');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState(' ');
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode|any>(country[234]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState(' ');
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressError, setEmailAddressError] = useState(' ');
  const [profileImage, setProfileImage] = useState<any>();
  const [zipCode, setZipCode] = useState('');
  const [zipCodeError, setZipCodeError] = useState(' ');
  const [bioText, setBioText] = useState('');
  const [gender, setGender] = useState(-1);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [userName, setUserName] = useState('');

  const firstNameRef = createRef<TextInput | null>();
  const lastNameRef = createRef<TextInput | null>();
  const mobileRef = createRef<TextInput | null>();
  const emailRef = createRef<TextInput | null>();
  const zipRef = createRef<TextInput | null>();
  const bioRef = createRef<TextInput | null>();

  const insets = useSafeAreaInsets();
  let {onImageSelect} = useSelectImage();

  useEffect(() => {
    if (profileData) {
      profileData?.user_image && setProfileImage({ uri: profileData?.user_image })
      profileData?.first_name && setFirstName(profileData?.first_name)
      profileData?.last_name && setLastName(profileData?.last_name)
      profileData?.email && setEmailAddress(profileData?.email)
      profileData?.zip_code && setZipCode(profileData?.zip_code?.toString())
      profileData?.mobile && setMobileNumber(profileData?.mobile)
      profileData?.username && setUserName(profileData?.username)
      // profileData?.country_code && setCountryCode(country.find((c: any) => c.dial_code === profileData?.country_code))
      profileData?.bio && setBioText(profileData?.bio)
      if (profileData?.gender) {
        if (profileData?.gender == 'male') setGender(0)
        if (profileData?.gender == 'female') setGender(1)
        if (profileData?.gender == 'other') setGender(2)
      }
    }
  }, [])

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
    } else if (!validateMobile(unMaskMobile(mobileNumber))) {
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

  const onUpdateProfile = () => {
    setIsSubmitClicked(true);
    const isValidFirstName = checkFirstName();
    const isValidLastName = checkLastName();
    const isValidMobile = checkMobile();
    const isValidEmail = checkEmail();
    const isValidZip = checkZip();
    if (!profileImage) {
      showToast('Please upload profile image', "error")
    }
    console.log("gender here", gender, isValidMobile, isValidEmail, isValidZip, profileImage)
    if (isValidFirstName && isValidLastName && isValidMobile && isValidEmail && isValidZip && profileImage && gender > -1) {
      console.log(' all verified ');
      let body : UpdateProfileRequest =  {
        first_name: firstName,
        last_name: lastName,
        mobile: unMaskMobile(mobileNumber),
        email: emailAddress,
        zip_code: zipCode,
        country_code: countryCode.dial_code,
        gender: Genders[gender]?.name?.toLowerCase(),
        bio: bioText,
        is_seller: profileData?.is_seller
      }
      if (profileImage?.name) {
        body = {...body, profile_image: profileImage}
      }

      dispatch(
        updateProfile({ body })
      )
        .unwrap()
        .then((res: any) => {
          let resp = res?.status ? res : res?.data;
          console.log(resp);
          if (resp && resp?.status === STATUS_CODES.SUCCESS) {
            showToast(resp?.message, "success")
            goBack()
          } else {
            // clear();
          }
        });
    }
  };

  const Logout = () => {
    dispatch(deleteMyAccount())
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        showToast(resp?.message, 'success');
        dispatch(logOut())
        .unwrap()
        .then((res: any) => {
          let resp = res?.data ? res.data : res;
          // showToast(resp?.message, 'success');
          console.log('Logged out');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Login'}],
            }),
          );
        });
      });

  };

  const deleteAccount = () => {
    dispatch(
      setDialogData({
        isVisible: true,
        title: LABELS.ProfileSettingScreen.deleteAccount,
        description: LABELS.ProfileSettingScreen.sureDelete,
        onDone: () => {
          Logout();
        },
        onCancel: () => {},
      }),
    );
  }

  const renderImage = () => (
    <View style={styles.imageWrapper}>
      <Image
        style={styles.image}
        source={profileImage?.uri ? { uri: profileImage?.uri } : images.emptyUser}
        defaultSource={images.emptyUser}
      />
      <TouchableOpacity
        onPress={() => {
          onImageSelect().then(img => {
            let res = img as ImageOrVideo;
            console.log("image res", res);
            if (res) {
              let tempImg: any = {
                type: res?.mime,
                name: getFileName(res?.path),
                uri: Platform.OS == 'ios' ? 'file://' + res?.path : res?.path,
              };
              console.log(tempImg);
              setProfileImage(tempImg);
            }
          });
        }}
        style={styles.addPhoto}>
        <Image source={images.addPhoto} />
      </TouchableOpacity>
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
        title={LABELS.ProfileSettingScreen.updateProfile}
        onPress={() => onUpdateProfile()}
      />
    </View>
  );

  const renderGenders = () => (
    <View style={styles.genderRoot} >
      <Text style={styles.genderTitle}>{LABELS.ProfileSettingScreen.gender}</Text>
      <View style={styles.genderView} >
       <View style={[styles.singleGender, styles.borderView]} >
       <CustomRadio
                    value={gender === 0}
                    onValueChange={(val) => setGender(0)}
                />
                <Text style={styles.genderText}>{Genders[0].name}</Text>
       </View>
       <View style={[styles.singleGender, styles.borderView]} >
       <CustomRadio
                    value={gender === 1}
                    onValueChange={(val) => setGender(1)}
                />
                <Text style={styles.genderText}>{Genders[1].name}</Text>
       </View>
       <View style={styles.singleGender} >
       <CustomRadio
                    value={gender === 2}
                    onValueChange={(val) => setGender(2)}
                />
                <Text style={styles.genderText}>{Genders[2].name}</Text>
       </View>
      </View>
      <Text style={styles.errorTxt}>{gender === -1 && isSubmitClicked && LABELS.ProfileSettingScreen.requiredGender }</Text>
    </View>
  )

  return (
    <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
      <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={LABELS.ProfileSettingScreen.profileSettings}
        showBack
      />
      <CustomScrollView
        extras={{ extraScrollHeight: isIOS() ? 56 : 56, enableOnAndroid: true  }}
        customStyle={{width: '100%', paddingHorizontal: screenScale(24)}}>
        {renderImage()}
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
            emailRef.current?.focus();
          }}
        />
        <CustomInput
          isEditable={false}
          title={LABELS.SignupScreen.userName}
          error={firstNameError}
          customContainerStyle={styles.commonInput}
          value={userName}
          placeholder={LABELS.SignupScreen.userName}
          inputExtra={{
            maxLength: 50,
          }}
          refVal={firstNameRef}
          onChangeText={res => {
            // setFirstName(res);
          }}
          onSubmitEditing={() => {
            // lastNameRef.current?.focus();
          }}
        />
        <CustomInput
          isEditable={false}
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
            Keyboard.dismiss();
          }}
        />
        <CustomPhoneInput
          isEditable={false}
          title={LABELS.SignupScreen.mobileNumber}
          error={mobileNumberError}
          customContainerStyle={styles.commonInput}
          textInputStyle={mobileNumber ? {letterSpacing: 2} : {}}
          value={
            mobileNumber.slice(0, 3) +
            ' ' +
            mobileNumber.slice(3, 6) +
            ' ' +
            mobileNumber.slice(6, 10)
          }
          placeholder={LABELS.LoginScreen.mobileNumber}
          inputExtra={{
            keyboardType: 'decimal-pad',
            maxLength: 12,
            editable: false,
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
        {renderGenders()}
        <CustomInput
          title={LABELS.ProfileSettingScreen.bio}
          error={""}
          customContainerStyle={[styles.commonInput]}
          customStyle={CommonStyleSheets.multiLineStyle}
          value={bioText}
          multiline
          placeholder={LABELS.ProfileSettingScreen.bioPlaceHolder}
          inputExtra={{
            maxLength: 500,
            textAlignVertical: 'top'
          }}
          refVal={bioRef}
          onChangeText={res => {
            setBioText(res);
          }}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />
        <Text onPress={() => deleteAccount()} style={styles.deleteAccount} >{LABELS.ProfileSettingScreen.deleteAccount}</Text>
        <View style={{height: screenScale(100), width: '100%'}} />
      </CustomScrollView>
      {renderButton()}
    </CustomScreen>
  );
};

export default ProfileSettingScreen;

