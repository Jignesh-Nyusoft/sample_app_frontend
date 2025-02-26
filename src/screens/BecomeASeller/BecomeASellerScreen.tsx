import {createRef, useEffect, useState} from 'react';
import {StackPropsType, tabStackProps} from '../../navigation/NavigationProps';
import {
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomScreen} from '../../components/CustomScreen';
import CustomHeader from '../../components/CustomHeader';
import {goBack, navigate} from '../../navigation/RootNavigationFunctions';
import {Colors, fontSize} from '../../theme';
import {LABELS} from '../../locales/common';
import {CommonStyleSheets} from '../../utils/CommonStyle';
import styles from './BecomeASellerScreenStyle';
import {dummyAddressData} from '../../utils/dummyData';
import images from '../../theme/imageIndex';
import {CustomEmptyView} from '../../components/CustomEmptyView';
import CustomButton from '../../components/CustomButton';
import {CustomRadio} from '../../components/CustomRadio';
import {CustomDottedButton} from '../../components/CustomDottedButton';
import {screenScale} from '../../utils/scaling';
import screens from '../../navigation/NavigationScreens';
import {UserAddressItem} from '../../redux/types/profileTypes';
import {combineAddress, showToast} from '../../utils/CommonFunctions';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {
  becomeASeller,
  changeSellerPickup,
  getConnectAccountLink,
  getProfileData,
  verifyConnectAccount,
} from '../../redux/actions/profileActions';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {CustomScrollView} from '../../components/CustomScrollView';
import CustomInput from '../../components/CustomInput';
import { useIsFocused } from '@react-navigation/native';

const BecomeASellerScreen = ({navigation, route}: StackPropsType<'BecomeASeller'>) => {
  const {profileData} = useSelector((state: RootState) => state.profileSlice);
  const {isSkeleton, skeletonName} = useSelector(
    (state: RootState) => state.loaderSlice,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState<any>();
  const [accountId, setAccountId] = useState<any>();
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [haveAccount, setHaveAccount] = useState<boolean>(false);
  const [accountComplete, setAccountComplete] = useState<boolean>(false);
  const [userConnectID, setUserConnectID] = useState<string>('');
  const firstNameRef = createRef<TextInput | null>();
  const isFocused = useIsFocused()
  const { isFrom } = route.params;

  useEffect(() => {
    // dispatch(getProfileData(true))
    // .unwrap()
    // .then((res: any) => {
    //   let resp = res?.data ? res.data : res;
    //   console.log('profile data', resp?.pickpaddress?.id);
    //   if (resp?.pickpaddress) {
    //     setDeliveryAddress(resp?.pickpaddress)
    // } else if (resp?.deliveryaddress) {
    //     setDeliveryAddress(resp?.deliveryaddress)
    // }
    // if (resp?.Stripe_connect_ac_id) {
    //   setAccountId(resp?.Stripe_connect_ac_id);
    // }
    // if (resp?.is_seller_details_pending) {
    //   setAccountComplete(!resp?.is_seller_details_pending);
    // }
    // if (resp?.is_seller) {
    //   setIsSeller(true)
    // }
    // });
    isFocused && getUpdatedProfileData();
  }, [isFocused]);

  const getUpdatedProfileData = () => {
    dispatch(getProfileData(true))
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        console.log('profile data', resp?.pickpaddress?.id);
        if (!deliveryAddress && (isFrom === "AddNewProduct" || isFrom === "MyProducts" || isFrom === "Profile")) {
        if (resp?.pickpaddress) {
          setDeliveryAddress(resp?.pickpaddress);
        } else if (resp?.deliveryaddress) {
          setDeliveryAddress(resp?.deliveryaddress);
        }
      }
        if (resp?.Stripe_connect_ac_id) {
          setAccountId(resp?.Stripe_connect_ac_id);
          setUserConnectID(resp?.Stripe_connect_ac_id);
        }
        // if (resp?.is_seller_details_pending) {
          setAccountComplete(resp?.is_seller_details_pending === 0);
        // }
        if (resp?.is_seller) {
          setIsSeller(true);
        }
      });
  };

  const createConnectAccountLink = async () => {
    dispatch(getConnectAccountLink(true))
      .unwrap()
      .then(async (res: any) => {
        let resp = res?.data ? res.data : res;
        console.log('connect account link data', resp);
        if (await InAppBrowser.isAvailable()) {
          const result = await InAppBrowser.open(resp, {
            dismissButtonStyle: 'close',
            preferredBarTintColor: '#2D6A4F',
            preferredControlTintColor: 'white',
            readerMode: false,
            animated: true,
            modalPresentationStyle: 'fullScreen',
            modalTransitionStyle: 'coverVertical',
            modalEnabled: true,
            enableBarCollapsing: false,
            toolbarColor: '#2D6A4F',
            secondaryToolbarColor: 'black',
            navigationBarColor: 'black',
            navigationBarDividerColor: 'white',
            enableUrlBarHiding: true,
            showTitle: true,
            forceCloseOnRedirection: false,
          });

          console.log('result', result);
          // if (result.type === 'success') {
          //   // Handle successful onboarding, e.g., refresh user info or mark onboarding as completed
          // }
          if (result.type === 'cancel' || result.type === 'dismiss') {
            getUpdatedProfileData();
          }
        } else {
          // Fallback option if InAppBrowser isn't available
          Linking.openURL(resp);
        }
      });
  };

  const onSelling = (is_Seller: boolean) => {
    if (is_Seller) {
      console.log(' selected pickup', deliveryAddress?.id);
      dispatch(changeSellerPickup(deliveryAddress?.id))
        .unwrap()
        .then((res: any) => {
          let resp = res?.data ? res.data : res;
          console.log('change pickup address data', resp);
          showToast(resp?.message, 'success');
          getUpdatedProfileData()
          goBack();
        });
    } else {
      let body = {
        stripe_connect_ac_id: accountId,
        pickup_address_id: deliveryAddress?.id,
      };
      dispatch(becomeASeller({body}))
        .unwrap()
        .then((res: any) => {
          let resp = res?.data ? res.data : res;
          console.log('become seller data', resp);
          showToast(resp?.message, 'success');
          getUpdatedProfileData()
          // goBack();
        });
    }
  };

  const verifyAccount = () => {
    let body = {
      stripe_account_id: userConnectID,
    };
    dispatch(verifyConnectAccount({body}))
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        console.log('verify account data', resp);
        getUpdatedProfileData()
        showToast(resp?.message, "success");
      });
  };

  const rennderAddressItem = (item: any, index: number) => (
    <View style={styles.itemView}>
      <Text style={styles.addressName}>{item.name}</Text>
      <Text style={styles.addressDetail}>{item.details}</Text>
      <View style={styles.radio}>
        <CustomRadio
          value={selectedAddress === index}
          onValueChange={val => val && setSelectedAddress(index)}
        />
      </View>
      <View style={styles.itemBottom}>
        {selectedAddress === index ? (
          <CustomButton
            titleStyle={{fontSize: fontSize.fontSize_small}}
            title={LABELS.BecomeASellerScreen.editAddress}
            onPress={() => {}}
            customStyle={styles.editAddress}
          />
        ) : (
          <View />
        )}
        <TouchableOpacity>
          <Image style={styles.button} source={images.deleteIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <CustomEmptyView
      text=""
      image={images.addressImage}
      customStyle={styles.empty}
    />
  );

  const renderAddressList = () => (
    <View>
      <Text style={styles.bigText}>
        {LABELS.BecomeASellerScreen.selectAddress}
      </Text>
      <Text style={styles.subText}>
        {LABELS.BecomeASellerScreen.selectAddressText}
      </Text>
      {deliveryAddress ? (
        renderAddress()
      ) : (
        <>
          {renderEmpty()}
          <CustomDottedButton
            customStyle={{marginTop: screenScale(16)}}
            title={LABELS.BecomeASellerScreen.addShippingAddress}
            onPress={() =>
              navigate(screens.ADDNEWADDRESS, {
                isFrom: 'BecomeASeller',
                onDone: (address: any) => {
                  setDeliveryAddress(address);
                },
              })
            }
          />
        </>
      )}
      {/* <FlatList
            showsVerticalScrollIndicator={false}
            data={dummyAddressData}
            contentContainerStyle={styles.flatContainer}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => rennderAddressItem(item, index)}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={() => (
                <CustomDottedButton
                customStyle={{ marginTop: screenScale(16) }}
                title={LABELS.SavedAddressScreen.addNewAddress}
            />
            )}
        /> */}
    </View>
  );

  const renderConnectAccount = () => (
    <View style={{marginTop: screenScale(16), marginBottom: screenScale(0)}}>
      <Text style={styles.bigText}>
        {LABELS.BecomeASellerScreen.connectPaymentAccount}
      </Text>
      {accountId ? (
        <View style={styles.connectedView}>
          <Image source={images.stripeName} />
          <Text
            style={[
              styles.subText,
              {marginTop: screenScale(16), marginBottom: 3},
            ]}>
            {LABELS.BecomeASellerScreen.connectedAccount}
          </Text>
          <Text style={[styles.bigText, {marginVertical: 0}]}>{accountId}</Text>

          {!accountComplete && (
            <>
              <Text
                style={[
                  styles.subText,
                  {
                    marginTop: screenScale(8),
                    marginBottom: 3,
                    color: Colors.red,
                  },
                ]}>
                {LABELS.BecomeASellerScreen.accountNotReady}
              </Text>
              <CustomButton
                disable={userConnectID?.length === 0}
                title={LABELS.COMMON_LABELS.verify}
                customStyle={{position: 'absolute', width: screenScale(80), top: 8, right:16, paddingVertical: 12}}
                onPress={() => verifyAccount()}
              />
            </>
          )}
        </View>
      ) : (
        <>
          <Text style={styles.subText}>
            {LABELS.BecomeASellerScreen.connectAccountText}
          </Text>
          <CustomEmptyView
            text=""
            image={images.bigCardImage}
            customStyle={styles.empty}
          />
          {/* <CustomDottedButton
                onPress={() => createConnectAccountLink()}
                customImage={images.stripeLogo}
                customStyle={{ marginTop: screenScale(16) }}
                title={LABELS.BecomeASellerScreen.connectWithStripe}
            /> */}
          {renderOptions()}
        </>
      )}
    </View>
  );

  const renderOptions = () => (
    <View style={{}}>
      <Text style={styles.titleText}>{LABELS.BecomeASellerScreen.doyouhaveaccount}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={() => setHaveAccount(true)}
          style={styles.applePayView}>
          <CustomRadio disabled value={haveAccount} />
          <Text style={styles.addCard}>
            {LABELS.BecomeASellerScreen.haveAccount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setHaveAccount(false)}
          style={[styles.applePayView]}>
          <CustomRadio disabled value={!haveAccount} />
          <Text style={styles.addCard}>
            {LABELS.BecomeASellerScreen.donthaveAccount}
          </Text>
        </TouchableOpacity>
      </View>
      {haveAccount && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CustomInput
            title={LABELS.BecomeASellerScreen.stripeConnectAccountID}
            error={' '}
            customContainerStyle={{marginTop: screenScale(16)}}
            value={userConnectID}
            placeholder={'e.g. acct_xxxxxxxxxxxx'}
            inputExtra={{
              maxLength: 50,
            }}
            refVal={firstNameRef}
            onChangeText={res => {
              setUserConnectID(res);
            }}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
          />
          <CustomButton
            disable={userConnectID?.length === 0}
            title={LABELS.COMMON_LABELS.verify}
            customStyle={{width: screenScale(80), marginTop: 22, marginLeft: screenScale(16)}}
            onPress={() => verifyAccount()}
          />
        </View>
      )}
      {!haveAccount && (
        <CustomDottedButton
          onPress={() => createConnectAccountLink()}
          customImage={images.stripeLogo}
          customStyle={{marginTop: screenScale(32), marginBottom: screenScale(24)}}
          title={LABELS.BecomeASellerScreen.connectWithStripe}
        />
      )}
    </View>
  );

  const renderBottomView = () => (
    <View style={CommonStyleSheets.commonBottomView}>
      <CustomButton
        disable={!deliveryAddress || profileData?.is_seller_details_pending === 1}
        title={
          isSeller
            ? LABELS.BecomeASellerScreen.saveDetails
            : LABELS.BecomeASellerScreen.startSelling
        }
        customStyle={{width: '100%'}}
        onPress={() => onSelling(isSeller)}
      />
    </View>
  );

  const renderAddress = () => (
    <View style={{marginTop: screenScale(12)}}>
      <View style={styles.addressView}>
        <View style={styles.addressLeft}>
          <Text style={styles.addressName}>{deliveryAddress?.address}</Text>
          <Text style={styles.addressDetails}>
            {combineAddress(deliveryAddress)}
          </Text>
        </View>
        <Text
          onPress={() =>
            navigate(screens.SAVEDADDRESS, {
              isFrom: 'BecomeASeller',
              addressItem: deliveryAddress,
              onSelect: (item: UserAddressItem) => setDeliveryAddress(item),
            })
          }
          style={styles.changeButton}>
          {LABELS.COMMON_LABELS.change}
        </Text>
      </View>
    </View>
  );

  return (
    <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
      <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={
          isSeller
            ? LABELS.BecomeASellerScreen.yourSellingInfo
            : LABELS.BecomeASellerScreen.becomeASeller
        }
        // rightView={() => route?.params?.fromSuccess && (<Text onPress={() => navigate(screens.ADD_NEW_PRODUCT, {})} style={styles.skiptext}>{LABELS.COMMON_LABELS.skip}</Text>)}
        showBack
      />
      <CustomScrollView customStyle={[CommonStyleSheets.commonMainView]}>
        {/* {renderAddress()} */}
        {renderAddressList()}
        {renderConnectAccount()}
        <CustomButton
        disable={!deliveryAddress || profileData?.is_seller_details_pending === 1}
        title={
          isSeller
            ? LABELS.BecomeASellerScreen.saveDetails
            : LABELS.BecomeASellerScreen.startSelling
        }
        customStyle={{width: '100%', marginTop: screenScale(22)}}
        onPress={() => onSelling(isSeller)}
      />
      <View style={{ paddingBottom: screenScale(88) }} />
      </CustomScrollView>
      {/* {renderBottomView()} */}
    </CustomScreen>
  );
};

export default BecomeASellerScreen;
