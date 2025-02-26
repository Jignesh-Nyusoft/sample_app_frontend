import {useEffect, useState} from 'react';
import {StackPropsType, tabStackProps} from '../../navigation/NavigationProps';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomScreen} from '../../components/CustomScreen';
import CustomHeader from '../../components/CustomHeader';
import {Colors} from '../../theme';
import {LABELS} from '../../locales/common';
import styles from './ProfileScreenStyle';
import images from '../../theme/imageIndex';
import screens from '../../navigation/NavigationScreens';
import {navigate} from '../../navigation/RootNavigationFunctions';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {setDialogData} from '../../redux/reducers/AlertReducer/alertSlice';
import {CommonActions, useIsFocused} from '@react-navigation/native';
import {logOut} from '../../redux/actions/authActions';
import {showToast} from '../../utils/CommonFunctions';
import {getProfileData} from '../../redux/actions/profileActions';
import {ROLES} from '../../utils/CommonConstants';
import FastImage from 'react-native-fast-image';
import { customCommonSeketon } from '../../utils/CommonSkeletons';
import { screenScale } from '../../utils/scaling';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const myAccountArray = [
  {
    id: 1,
    name: LABELS.ProfileScreen.profileSettings,
    image: images.profileSettings,
    navigateTo: screens.PROFILESETTING,
  },
  {
    id: 2,
    name: LABELS.ProfileScreen.savedAddress,
    image: images.savedAddress,
    navigateTo: screens.SAVEDADDRESS,
  },
  {
    id: 3,
    name: LABELS.ProfileScreen.paymentDetails,
    image: images.payDeatils,
    navigateTo: screens.PAYMENT_DETAILS,
  },
  {
    id: 4,
    name: LABELS.WishListScreen.myWishList,
    image: images.wishFilled,
    navigateTo: screens.WISHLIST,
  },
  {
    id: 5,
    name: LABELS.ProfileScreen.changePassword,
    image: images.password,
    navigateTo: screens.CHANGEPASSWORD,
  },
];

const generalArray = [
  {
    id: 1,
    name: LABELS.ProfileScreen.notifications,
    image: images.notifications,
    navigateTo: screens.NOTIFICATION_LIST,
  },
  {
    id: 2,
    name: LABELS.ProfileScreen.contactUs,
    image: images.mail,
    navigateTo: screens.CONTACT_US
  },
  {
    id: 3,
    name: LABELS.ProfileScreen.termsAndConditions,
    image: images.terms,
    navigateTo: screens.TERMSANDCONDITIONS
  },
  {
    id: 4,
    name: LABELS.ProfileScreen.privacyPolicy,
    image: images.policy,
    navigateTo: screens.PRIVACY_POLICY,
  },
];

const ProfileScreen = ({navigation}: tabStackProps<'Profile'>) => {
  const dispatch = useDispatch<AppDispatch>();
  const {profileData} = useSelector((state: RootState) => state.profileSlice);
  const {isSkeleton, skeletonName} = useSelector((state: RootState) => state.loaderSlice);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(getProfileData())
        .unwrap()
        .then((res: any) => {
          let resp = res?.data ? res.data : res;
          console.log('profile data', resp);
        });
    }
  }, [isFocused]);

  const renderTopSkeleton = () => (
    <View style={{ marginTop: screenScale(56) }}>
          {customCommonSeketon(screenScale(300), '100%')}
          <View style={{position: 'absolute', top: -screenScale(50), width: '100%', alignItems: 'center'}}>
            {customCommonSeketon(screenScale(96), screenScale(96), { borderRadius: 120, borderWidth: 4, borderColor: Colors.white  })}
          </View>
    </View>
  )

  const renderTopView = () => (
    <>
    {skeletonName.includes("myProfile") ? renderTopSkeleton() :
      <View style={styles.mainTopView}>
        {profileData && (
          <View style={styles.topView}>
            <FastImage
              style={styles.userImage}
              source={
                typeof profileData?.user_image === 'string'
                  ? {uri: profileData?.user_image}
                  : images.emptyUser
              }
              defaultSource={images.emptyUser}
            />
            <Text style={styles.userName}>
              {profileData?.first_name + ' ' + profileData?.last_name}
            </Text>
            <Text style={styles.userEmail}>{profileData?.email}</Text>
            <View style={styles.rowView}>
              {/* {profileData?.is_seller === 1 && */}
                <TouchableOpacity
                  onPress={() => navigate(screens.MYPRODUCTS, {})}
                  style={styles.myOrdersView}>
                  <View style={styles.imageWrapper}>
                    <Image source={images.myProducts} />
                  </View>
                  <Text style={styles.myOrdersText}>
                    {LABELS.ProfileScreen.myProducts}
                  </Text>
                </TouchableOpacity>
              {/* } */}
              <TouchableOpacity
                onPress={() => navigate(screens.MYORDERS, {})}
                style={[
                  styles.myOrdersView,
                  // profileData?.is_seller === 0 && {width: '100%'},
                ]}>
                <View style={styles.imageWrapper}>
                  <Image source={images.myOrders} />
                </View>
                <Text style={styles.myOrdersText}>
                  {LABELS.ProfileScreen.myOrders}
                </Text>
              </TouchableOpacity>
            </View>
            {/* {profileData?.is_seller === 1 && ( */}
              <TouchableOpacity
                onPress={() => navigate(screens.EARNINGS, {})}
                style={styles.myOrdersViewFull}>
                <View style={styles.imageWrapper}>
                  <Image source={images.earnings} />
                </View>
                <Text style={styles.myOrdersText}>
                  {LABELS.ProfileScreen.eraningsAndTransactions}
                </Text>
                <Text style={styles.earningText}>{'$ ' + profileData?.my_earning}</Text>
              </TouchableOpacity>
            {/* )} */}
          </View>
        )}
        <TouchableOpacity
          onPress={() => navigate(screens.BECOMEASELLER, { isFrom: "Profile" })}
          style={styles.becomeSellerView}>
          <View style={styles.imageWrapper2}>
            <Image source={images.storeIcon} tintColor={Colors.primaryText} />
          </View>
          <Text style={styles.becomeSellerText}>
            {/* {profileData?.is_seller === 1 ? LABELS.ProfileScreen.yourSellingInfo : LABELS.ProfileScreen.becomeASeller} */}
            {LABELS.ProfileScreen.yourSellingInfo}
          </Text>
          <Image style={styles.rightArrow} source={images.rightArrow} />
        </TouchableOpacity>
      </View>
       }
    </>
  );

  const Logout = () => {
    dispatch(logOut())
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        showToast(resp?.message, 'success');
        console.log('Logged out');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      });
  };

  const onItemPress = (item: any) => {
    if (item.navigateTo) {
      navigate(item?.navigateTo, {});
    } else {
      dispatch(
        setDialogData({
          isVisible: true,
          title: 'Not Available',
          description: ' Feature coming soon...',
          onDone: () => {
            // dispatch(logout())
            //   .unwrap()
            //   .then((resp) => {
            //     if (resp && resp?.status) {
            //       if (isLocationServiceRunning) {
            //         LocationModule.stopService();
            //       }
            //       dispatch(setLanguage("es"));
            //       FunctionUtils.showToast(resp?.message, "success");
            //       navigation.reset({
            //         index: 0,
            //         routes: [{ name: "Login" }],
            //       });
            //     }
            //   });
          },
          onCancel: () => {},
        }),
      );
    }
  };

  const renderList = (arr: any[]) => (
    <View style={styles.listView}>
      {arr?.map((item, index) => (
        <TouchableOpacity
          onPress={() => onItemPress(item)}
          key={item.name}
          style={[
            styles.listItem,
            index !== arr?.length - 1 && styles.bottomBorder,
          ]}>
          <View style={styles.itemImageWrapper}>
            <Image source={item.image} tintColor={Colors.secondoryText} />
          </View>
          <Text style={styles.listItemtext}>{item.name}</Text>
          <Image source={images.rightArrow} style={styles.rightArrow} />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderMyAccount = () => (
    <View style={styles.myAccountView}>
      <Text style={styles.myAccountText}>{LABELS.ProfileScreen.myAccount}</Text>
      {renderList(myAccountArray)}
    </View>
  );

  const renderGeneral = () => (
    <View style={styles.myAccountView}>
      <Text style={styles.myAccountText}>{LABELS.ProfileScreen.general}</Text>
      {renderList(generalArray)}
    </View>
  );

  const renderLogout = () => (
    <TouchableOpacity
      onPress={() => {
        dispatch(
          setDialogData({
            isVisible: true,
            title: LABELS.COMMON_LABELS.logOut,
            description: LABELS.COMMON_LABELS.sureLogout,
            onDone: () => {
              Logout();
            },
            onCancel: () => {},
          }),
        );
      }}
      style={styles.logOutView}>
      <Text style={styles.logOutText}>{LABELS.ProfileScreen.logOut}</Text>
    </TouchableOpacity>
  );

  return (
    <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
      <CustomHeader
        container={{backgroundColor: Colors.white}}
        title={LABELS.ProfileScreen.myProfile}
        showBack={false}
      />
      <ScrollView style={styles.ScrollView}>
        <View style={styles.viewPadding}>
          {renderTopView()}
          {renderMyAccount()}
          {renderGeneral()}
          {renderLogout()}
        </View>
      </ScrollView>
    </CustomScreen>
  );
};

export default ProfileScreen;
