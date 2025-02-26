import { createRef, useEffect, useState } from "react";
import { StackPropsType } from "../../navigation/NavigationProps";
import CustomPhoneInput from "../../components/CustomPhoneInput";
import { FlatList, Image, Keyboard, Linking, Text, TouchableOpacity, View } from "react-native";
import images from "../../theme/imageIndex";
import { LABELS } from "../../locales/common";
import CustomButton from "../../components/CustomButton";
import { Colors, Font } from "../../theme";
import { goBack, navigate } from "../../navigation/RootNavigationFunctions";
import screens from "../../navigation/NavigationScreens";
import styles from "./BusinessDetailsScreenStyle";
import { CustomScreen } from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { CustomScrollView } from "../../components/CustomScrollView";
import { screenHightPercentage, screenScale, verticalScale } from "../../utils/scaling";
import CustomInput from "../../components/CustomInput";
import { CountryCode } from "../../utils/CommonTypes";
import { AccountType, country } from "../../utils/commonData";
import { CheckBox } from "../../components/Checkbox";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hasNotch, isIOS, placeDetailsApi, placesApi, showToast, unMaskMobile, validateEmail, validateMobile, validatePassword, validateUserName } from "../../utils/CommonFunctions";
import { CountryPicker } from "react-native-country-codes-picker";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { register } from "../../redux/actions/authActions";
import { STATUS_CODES } from "../../utils/CommonConstants";
import { CustomRadio } from "../../components/CustomRadio";
import { CustomBottomSheet } from "../../components/CustomBottomSheet";
import CustomSearchBar from "../../components/CustomSearchBar";
import { CommonStyleSheets } from "../../utils/CommonStyle";

const BusinessDetailsScreen = ({navigation, route}: StackPropsType<'BusinessDetails'>) => {
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState(' ');
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>(country[234]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState(' ');
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressError, setEmailAddressError] = useState(' ');
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [zipCodeError, setZipCodeError] = useState(' ');
  const [countryName, setCountryName] = useState('');
  const [countryNameError, setCountryNameError] = useState(' ');
  const [stateName, setStateName] = useState('');
  const [stateNameError, setStateNameError] = useState(' ');
  const [cityName, setCityName] = useState('');
  const [cityNameError, setCityNameError] = useState(' ');
  const [streetName, setStreetName] = useState('');
  const [streetNameError, setStreetNameError] = useState(' ');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedGoogleAddress, setSelectedGoogleAddress] = useState<any>();
  const [searchData, setSearchData] = useState<any>([]);
  const [coordinates, setCoordinates] = useState<any>()

  const firstNameRef = createRef<TextInput | null>();
  const lastNameRef = createRef<TextInput | null>();
  const mobileRef = createRef<TextInput | null>();
  const emailRef = createRef<TextInput | null>();
  const zipRef = createRef<TextInput | null>();
  const addressNameRef = createRef<TextInput | null>();
  const countryNameRef = createRef<TextInput | null>();
  const stateNameRef = createRef<TextInput | null>();
  const cityNameRef = createRef<TextInput | null>();
  const streetNameRef = createRef<TextInput | null>();

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const { oldBody } = route?.params

  const checkFirstName = () => {
    if (firstName?.length === 0) {
      setFirstNameError(LABELS.SignupScreen.requiredFirstName);
      return false;
    } else {
      setFirstNameError(' ');
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

  const checkCountryName = () => {
    if (countryName?.length === 0) {
      setCountryNameError(LABELS.AddNewAddressScreen.requiredCountry);
      return false;
    } else {
      setCountryNameError(' ');
      return true;
    }
  };

  const checkStreetName = () => {
    if (streetName?.length === 0) {
      setStreetNameError(LABELS.AddNewAddressScreen.requiredStreetAddress);
      return false;
    } else {
      setStreetNameError(' ');
      return true;
    }
  };

  const checkCityName = () => {
    if (cityName?.length === 0) {
      setCityNameError(LABELS.AddNewAddressScreen.requiredTownCity);
      return false;
    } else {
      setCityNameError(' ');
      return true;
    }
  };

  const checkStateName = () => {
    if (stateName?.length === 0) {
      setStateNameError(LABELS.AddNewAddressScreen.requiredState);
      return false;
    } else {
      setStateNameError(' ');
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
      checkCountryName();
    }
  }, [countryName]);
  useEffect(() => {
    if (isSubmitClicked) {
      checkStreetName();
    }
  }, [streetName]);
  useEffect(() => {
    if (isSubmitClicked) {
      checkCityName();
    }
  }, [cityName]);
  useEffect(() => {
    if (isSubmitClicked) {
      checkStateName();
    }
  }, [stateName]);

  useEffect(() => {
    if (searchText) {
      placesApi(searchText).then((data: any) => {
        setSearchData(data);
        console.log("addresses =>", JSON.stringify(data[0]))
      })
  }
  }, [searchText])

  const onCreateAccount = () => {
    setIsSubmitClicked(true);
    const isValidFirstName = checkFirstName();
    const isValidMobile = checkMobile();
    const isValidEmail = checkEmail();
    const isValidZip = checkZip();
    const isValidCountry = checkCountryName();
    const isValidStreet = checkStreetName();
    const isValidCity = checkCityName();
    const isValidState = checkStateName();
    if (
      isValidFirstName &&
      isValidMobile &&
      isValidEmail &&
      isValidZip &&
      isValidCountry &&
      isValidStreet &&
      isValidCity &&
      isValidState
    ) {
      let body = {
        ...oldBody,
        business_name: firstName,
        business_email: emailAddress,
        business_phone: mobileNumber,
        business_country_code: countryCode.dial_code,
        business_full_address: streetName,
        business_zip_code: zipCode,
        business_country: countryName,
        business_state: stateName,
        business_city: cityName,
        business_location_lat: coordinates?.lat,
        business_location_long: coordinates?.lng
      }

      dispatch(
        register({ body })
      )
        .unwrap()
        .then((res: any) => {
          let resp = res?.status ? res : res?.data;
          console.log(resp);
          if (resp && resp?.status === STATUS_CODES.SUCCESS) {
            showToast(resp?.message, "success");
              navigate(screens.VERIFICATION, { dialCode: countryCode.dial_code, mobile: unMaskMobile(mobileNumber), fromScreen: "Register", otpData: resp?.data?.OTP, email: oldBody.email})
          } else {
            // clear();
          }
        });
    }
  };

  const renderButton = () => (
    <View
      style={[
        styles.bottomView,
        {paddingBottom: hasNotch() ? screenScale(24) : screenScale(12)},
      ]}>
      <CustomButton
        customStyle={styles.buttonStyle}
        title={LABELS.SignupScreen.createAccount}
        onPress={() => onCreateAccount()}
      />
    </View>
  );

  const renderSearch = () => (
    <CustomSearchBar
          isEditable={false}
          onPressSearch={() => {  selectedGoogleAddress && setSearchText(selectedGoogleAddress?.description) ,setShowBottomSheet(true) }}
          value={selectedGoogleAddress?.description}
          onChangeText={val => {}}
          placeholder={LABELS.AddNewAddressScreen.searchPlaceholder}
          customContainerStyle={styles.customSearch}
          customStyle={styles.customSearchMainView}
          placeholderTextColor={Colors.white50}
          textInputStyle={styles.customSearchTextInput}
          searchTintColor={Colors.primaryText}
          
        />
  )

  const renderSearchAddress = () => (
    <CustomBottomSheet
    visible={showBottomSheet}
    statusBarTranslucent={true}
    customMainStyle={{
      height: screenHightPercentage(70)
    }}
    headerTitle={
      LABELS.AddNewAddressScreen.searchPlaceholder
    }
    onClose={() => {
      setShowBottomSheet(false)
    }}>
      <View style={CommonStyleSheets.commonMainView}>
        <View style={{ marginBottom: screenScale(72) }}>
      <CustomSearchBar
          // isEditable={false}
          // onPressSearch={() => setShowBottomSheet(true)}
          value={searchText}
          onChangeText={val => setSearchText(val)}
          placeholder={LABELS.AddNewAddressScreen.searchPlaceholder}
          customContainerStyle={styles.customSearch}
          customStyle={styles.customSearchMainView}
          placeholderTextColor={Colors.white50}
          textInputStyle={styles.customSearchTextInput}
          searchTintColor={Colors.primaryText}
          
        />
        </View>
        {/* {searchData?.map((item: any) => (
          <TouchableOpacity key={item?.description} style={styles.searchedItemView}>
        <Text style={styles.searchedItemText}>{item?.description}</Text>
      </TouchableOpacity>
        ))} */}
  <FlatList
    showsVerticalScrollIndicator={false}
    data={searchData}
    contentContainerStyle={styles.flatContainer}
    keyExtractor={item => item.description}
    renderItem={({item, index}) => (
      <TouchableOpacity onPress={() => onSelectAddress(item) } style={styles.searchedItemView}>
        <Text style={styles.searchedItemText}>{item?.description}</Text>
      </TouchableOpacity>
    )}
    // ListEmptyComponent={renderEmpty}
  />
      </View>

  </CustomBottomSheet>
  )

  const onSelectAddress = (item: any) => {
    setSelectedGoogleAddress(item)
    setShowBottomSheet(false)
    placeDetailsApi(item?.place_id).then((data: any) => {
      if (data?.status === "OK") {
        if (data?.result?.geometry?.location) {
          setCoordinates({
            lat: data?.result?.geometry?.location?.lat,
            lng: data?.result?.geometry?.location?.lng
          })
        }
        let newStreetname = ""
        data?.result?.address_components?.forEach((e: any) => {
          if (e.types?.includes("country")) {
            setCountryName(e?.long_name)
          }
          if (e.types?.includes("administrative_area_level_1")) {
            setStateName(e?.long_name)
          }
          if (e.types?.includes("locality")) {
            setCityName(e?.long_name)
          } else if (e.types?.includes("sublocality")) {
            setCityName(e?.long_name)
          }
          if (e.types?.includes("postal_code")) {
            setZipCode(e?.long_name)
          }
          if (e.types?.includes("street_number")) {
            newStreetname = newStreetname + e?.long_name + ", "
            // setStreetName(streetName + e?.long_name)
          }
          if (e.types?.includes("route")) {
            newStreetname = newStreetname + e?.long_name + ", "
            // setStreetName(streetName + e?.long_name)
          }
          if (e.types?.includes("neighborhood")) {
            newStreetname = newStreetname + e?.long_name
            // setStreetName(streetName + e?.long_name)
          }
        })
        setStreetName(newStreetname)
      }
      console.log("place details response =>", JSON.stringify(data))
    })
  }

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
        extras={{ extraScrollHeight: isIOS() ? 56 : 56, enableOnAndroid: true  }}
        customStyle={{width: '100%', paddingHorizontal: screenScale(24)}}>
        <Text style={styles.topText}>
          {LABELS.SignupScreen.businessDetails}
        </Text>
        <Text style={styles.subText}>{LABELS.SignupScreen.subText2}</Text>
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
        />
         <Text style={[styles.subText, {marginBottom: 6}]}>{LABELS.SignupScreen.businessAddress}</Text>
        {renderSearch()}
        {(selectedGoogleAddress) &&  <>
        <CustomInput
          isEditable={false}
          title={LABELS.AddNewAddressScreen.country}
          error={countryNameError}
          customContainerStyle={styles.commonInput}
          value={countryName}
          placeholder={LABELS.AddNewAddressScreen.country}
          inputExtra={{
            maxLength: 50,
          }}
          refVal={countryNameRef}
          onChangeText={res => {
            setCountryName(res);
          }}
          onSubmitEditing={() => {
            streetNameRef.current?.focus();
          }}
        />
        <CustomInput
          title={LABELS.AddNewAddressScreen.streetAddress}
          error={streetNameError}
          customContainerStyle={styles.commonInput}
          value={streetName}
          placeholder={LABELS.AddNewAddressScreen.streetAddress}
          inputExtra={{
            maxLength: 200,
          }}
          refVal={streetNameRef}
          onChangeText={res => {
            setStreetName(res);
          }}
          onSubmitEditing={() => {
            cityNameRef.current?.focus();
          }}
        />
        <CustomInput
          isEditable={false}
          title={LABELS.AddNewAddressScreen.townCity}
          error={cityNameError}
          customContainerStyle={styles.commonInput}
          value={cityName}
          placeholder={LABELS.AddNewAddressScreen.townCity}
          inputExtra={{
            maxLength: 100,
          }}
          refVal={cityNameRef}
          onChangeText={res => {
            setCityName(res);
          }}
          onSubmitEditing={() => {
            stateNameRef.current?.focus();
          }}
        />
        <CustomInput
          isEditable={false}
          title={LABELS.AddNewAddressScreen.state}
          error={stateNameError}
          customContainerStyle={styles.commonInput}
          value={stateName}
          placeholder={LABELS.AddNewAddressScreen.state}
          inputExtra={{
            maxLength: 100,
          }}
          refVal={stateNameRef}
          onChangeText={res => {
            setStateName(res);
          }}
          onSubmitEditing={() => {
            zipRef.current?.focus();
          }}
        />
        <CustomInput
          isEditable={false}
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
            // mobileRef.current?.focus();
            Keyboard.dismiss();
          }}
        />
        </>}
        <View style={{height: screenScale(100), width: '100%'}} />
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
      {renderSearchAddress()}
    </CustomScreen>
  );
};

export default BusinessDetailsScreen;