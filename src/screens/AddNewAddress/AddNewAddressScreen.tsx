import { createRef, useEffect, useState } from "react";
import { StackPropsType, tabStackProps } from "../../navigation/NavigationProps";
import { FlatList, Image, ImageBackground, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CustomScreen } from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { goBack } from "../../navigation/RootNavigationFunctions";
import { Colors } from "../../theme";
import { LABELS } from "../../locales/common";
import { CustomScrollView } from "../../components/CustomScrollView";
import { hasNotch, isIOS, maskMobile, placeDetailsApi, placesApi, showToast, unMaskMobile, validateEmail, validateMobile } from "../../utils/CommonFunctions";
import CustomInput from "../../components/CustomInput";
import { CountryCode } from "../../utils/CommonTypes";
import { country } from "../../utils/commonData";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { screenHightPercentage, screenScale, verticalScale } from "../../utils/scaling";
import styles from "./AddNewAddressScreenStyle";
import CustomPhoneInput from "../../components/CustomPhoneInput";
import { CommonStyleSheets } from "../../utils/CommonStyle";
import { CheckBox } from "../../components/Checkbox";
import CustomButton from "../../components/CustomButton";
import { getProfileData, saveAddress } from "../../redux/actions/profileActions";
import { CountryPicker } from "react-native-country-codes-picker";
import { STATUS_CODES } from "../../utils/CommonConstants";
import CustomSearchBar from "../../components/CustomSearchBar";
import { CustomBottomSheet } from "../../components/CustomBottomSheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddNewAddressScreen = ({ navigation, route }: StackPropsType<"AddNewAddress">) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isEdit, addressItem, onDone, isFrom } = route.params;
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
  const [addressName, setAddressName] = useState('');
  const [addressNameError, setAddressNameError] = useState(' ');
  const [countryName, setCountryName] = useState('');
  const [countryNameError, setCountryNameError] = useState(' ');
  const [stateName, setStateName] = useState('');
  const [stateNameError, setStateNameError] = useState(' ');
  const [cityName, setCityName] = useState('');
  const [cityNameError, setCityNameError] = useState(' ');
  const [streetName, setStreetName] = useState('');
  const [streetNameError, setStreetNameError] = useState(' ');
  const [apartmentDetails, setApartmentDetails] = useState('');
  const [apartmentDetailsError, setApartmentDetailsError] = useState(' ');
  const [isDefault, setDefault] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
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
  const apartmentRef = createRef<TextInput | null>();

  const getCountryCodeValue = (tempCode: string) => {
    let newItem = null
    if (tempCode === "+1") {
      newItem = country.find((c: any) => c.dial_code === tempCode && c.code === "US")
    } else {
      newItem = country.find((c: any) => c.dial_code === tempCode)
    }
    return newItem
  }
    useEffect(() => {
      // placesApi("12").then((data: any) => {
      //   console.log("addresses =>", data)
      // })
      
      if (isEdit && addressItem) {
        setAddressName(addressItem.address)
        setMobileNumber(maskMobile(addressItem.mobile))
        setCountryCode(getCountryCodeValue(addressItem?.country_code))
        setCountryName(addressItem.country)
        setStateName(addressItem.state)
        setCityName(addressItem.city)
        setStreetName(addressItem.street)
        setZipCode(addressItem.zip_code)
        setApartmentDetails(addressItem?.house_no || "")
        setCoordinates({
          lat: addressItem?.location_lat,
          lng: addressItem?.location_long
        })
        setDefault(addressItem?.is_default_delivery === 1)
      }
    },[route]);

    useEffect(() => {
      if (searchText) {
        placesApi(searchText).then((data: any) => {
          setSearchData(data);
          console.log("addresses =>", JSON.stringify(data[0]))
        })
    }
    }, [searchText])

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

    const checkAddressName = () => {
      if (addressName?.length === 0) {
        setAddressNameError(LABELS.AddNewAddressScreen.requiredAddressName);
        return false;
      } else {
        setAddressNameError(' ');
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

    const checkApartment = () => {
      if (apartmentDetails?.length === 0) {
        setApartmentDetailsError(LABELS.AddNewAddressScreen.apartmentDetailsError);
        return false;
      } else if (!(apartmentDetails?.toUpperCase().includes('APT') || apartmentDetails?.toUpperCase().includes('STE') || apartmentDetails?.toUpperCase().includes('OFC') || apartmentDetails?.toUpperCase().includes('BLDG'))) {
        setApartmentDetailsError(LABELS.AddNewAddressScreen.apartmentDetailsValidError);
        return false;
      } else {
        setApartmentDetailsError(' ');
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
    useEffect(() => {
      if (isSubmitClicked) {
        checkAddressName();
      }
    }, [addressName]);
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
        checkApartment();
      }
    }, [apartmentDetails]);
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

    const onSave = () => {
      setIsSubmitClicked(true);
      // const isValidFirstName = checkFirstName();
      // const isValidLastName = checkLastName();
      const isValidMobile = checkMobile();
      // const isValidEmail = checkEmail();
      const isValidZip = checkZip();
      const isValidAddressName = checkAddressName();
      const isValidCountry = checkCountryName();
      const isValidStreet = checkStreetName();
      const isValidApartment = checkApartment();
      const isValidCity = checkCityName();
      const isValidState = checkStateName();
      if (isValidMobile && isValidZip && isValidAddressName && isValidCountry && isValidStreet && isValidCity && isValidState && isValidApartment) {
        console.log(' all verified ');
        let body: any = []
        body = {
          zip_code: zipCode,
          country: countryName,
          state: stateName,
          city: cityName,
          address: addressName,
          street: streetName,
          mobile: unMaskMobile(mobileNumber),
          country_code: countryCode.dial_code,
          is_default: isDefault ? 1 : 0,
          is_pickup: 0,
          location_lat: coordinates?.lat,
          location_long: coordinates?.lng,
          house_no: apartmentDetails,
          status: 'active',
        };
        if (isEdit && addressItem?.id) {
          body = {
            ...body,
            address_id: addressItem?.id
          }
        }
        dispatch(saveAddress({ body: body }))
        .unwrap()
        .then((res: any) => {
          let resp = res?.status ? res : res?.data;
          console.log(resp);
          if (resp && resp?.status === STATUS_CODES.SUCCESS) {
            showToast(resp?.message, "success")
            goBack()
            if (isFrom && (isFrom === "MyCart" || isFrom === "BecomeASeller")) {
              onDone && onDone(resp?.data);
            } else {
              onDone && onDone();
            }
            dispatch(getProfileData())
            .unwrap()
            .then((res: any) => {
              let resp = res?.data ? res.data : res;
              console.log('profile data', resp);
            });
            
          } else {
            // clear();
          }
        });
      }
    }

    const onSelectAddress = (item: any) => {
      setSelectedGoogleAddress(item)
      setShowBottomSheet(false)
      placeDetailsApi(item?.place_id).then((data: any) => {
       
        if (data?.status === "OK") {
          console.log("address data", JSON.stringify(data?.result))
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

    const renderNames = () => (
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} >
        <CustomInput
          title={LABELS.SignupScreen.firstName}
          error={firstNameError}
          customContainerStyle={[styles.commonInput, { width: screenScale(155) }]}
          customStyle={{ width: screenScale(155)}}
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
      </View>
    )

    const renderSetAsDefault = () => (
      <View style={styles.setDefaultView}>
      <CheckBox
        value={isDefault}
        onValueChange={newValue => setDefault(newValue)}
      />
      <Text style={styles.setDefaultText} >{LABELS.AddNewAddressScreen.setAsDefault}</Text>
      </View>
    )

    const renderButton = () => (
      <View
        style={[
          styles.bottomView,
          {paddingBottom: hasNotch() ? screenScale(24) : screenScale(12)},
        ]}>
        <CustomButton
          customStyle={styles.buttonStyle}
          title={isEdit ? LABELS.AddNewAddressScreen.updateAddress : LABELS.AddNewAddressScreen.saveAddress}
          onPress={() => onSave()}
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

    const renderApartment = () => (
      <View>
        <View style={styles.typesView} >
          <TouchableOpacity style={styles.typeButton}>
            <Text style={styles.typeText} >{'Apartment'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.typeButton}>
            <Text style={styles.typeText} >{'Suite'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.typeButton}>
            <Text style={styles.typeText} >{'Office'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
        
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
        <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={isEdit ? LABELS.AddNewAddressScreen.editAddress : LABELS.AddNewAddressScreen.header}
        showBack
      />
        <CustomScrollView
        extras={{ extraScrollHeight: isIOS() ? 56 : 56, enableOnAndroid: true  }}
        customStyle={{width: '100%', paddingHorizontal: screenScale(24)}}>
          <Text style={styles.title}>{LABELS.AddNewAddressScreen.shippingAddress}</Text>
          {/* {renderNames()} */}
          
        <CustomInput
          title={LABELS.AddNewAddressScreen.addressName}
          error={addressNameError}
          customContainerStyle={styles.commonInput}
          value={addressName}
          placeholder={LABELS.AddNewAddressScreen.addressName}
          inputExtra={{
            maxLength: 50,
          }}
          refVal={addressNameRef}
          onChangeText={res => {
            setAddressName(res);
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
          placeholder={LABELS.SignupScreen.mobileNumber}
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
            countryNameRef.current?.focus();
          }}
        />
        {renderSearch()}
        {(selectedGoogleAddress || isEdit) &&  <>
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
        {/* {renderApartment()} */}
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
            apartmentRef.current?.focus();
          }}
        />
        <CustomInput
          title={LABELS.AddNewAddressScreen.apartmentDetails}
          error={apartmentDetailsError}
          customContainerStyle={styles.commonInput}
          value={apartmentDetails}
          placeholder={LABELS.AddNewAddressScreen.apartmentDetailsPlaceholder}
          inputExtra={{
            maxLength: 200,
          }}
          refVal={apartmentRef}
          onChangeText={res => {
            setApartmentDetails(res);
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
        {/* <CustomInput
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
        /> */}

        {(selectedGoogleAddress || isEdit) && renderSetAsDefault()}

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
  
  export default AddNewAddressScreen;