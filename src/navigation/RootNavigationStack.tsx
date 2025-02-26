import {
    CardStyleInterpolators,
    createStackNavigator,
  } from "@react-navigation/stack";
import { RootNavPropsType } from "./NavigationProps";
import Splash from "../screens/Splash/SplashScreen";
import screens from "./NavigationScreens";
import WelcomeScreen from "../screens/Welcome/WelcomeScreen";
import WelcomeScreen2 from "../screens/Welcome2/WelcomeScreen2";
import WelcomeScreen3 from "../screens/Welcome3/WelcomeScreen3";
import LoginScreen from "../screens/Login/LoginScreen";
import SignupScreen from "../screens/Signup/SignupScreen";
import VerificationScreen from "../screens/Verification/VerificationScreen";
import RegistrationSuccessScreen from "../screens/RegistrationSuccess/RegistrationSuccessScreen";
import BottomNav from "./BottomTabNavigation";
import SubCategoriesScreen from "../screens/SubCategories/SubCategoriesScreen";
import ProductDetailScreen from "../screens/ProductDetail/ProductDetailScreen";
import ProfileSettingScreen from "../screens/ProfileSettings/ProfileSettingScreen";
import SavedAddressScreen from "../screens/SavedAddress/SavedAddressScreen";
import AddNewAddressScreen from "../screens/AddNewAddress/AddNewAddressScreen";
import SellerInfoScreen from "../screens/SellerInfo/SellerInfoScreen";
import MyProductsScreen from "../screens/MyProducts/MyProductsScreen";
import BecomeASellerScreen from "../screens/BecomeASeller/BecomeASellerScreen";
import EarningsScreen from "../screens/Earnings/EarningsScreen";
import MyOrdersScreen from "../screens/MyOrders/MyOrdersScreen";
import AddReviewScreen from "../screens/AddReview/AddReviewScreen";
import OrderDetailsScreen from "../screens/OrderDetails/OrderDetailsScreen";
import NotificationListScreen from "../screens/NotificationList/NotificationListScreen";
import SearchProductsScreen from "../screens/SearchProducts/SearchProductsScreen";
import ProductListingScreen from "../screens/ProductListing/ProductListingScreen";
import AddNewProductScreen from "../screens/AddNewProduct/AddNewProductScreen";
import ContactUsScreen from "../screens/ContactUs/ContactUsScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicy/PrivacyPolicyScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditions/TermsAndConditionsScreen";
import MyCartScreen from "../screens/MyCart/MyCartScreen";
import ChatScreen from "../screens/Chat/ChatScreen";
import OrderSuccessScreen from "../screens/OrderSuccess/OrderSuccessScreen";
import PaymentScreen from "../screens/Payment/PaymentScreen";
import PaymentDetailsScreen from "../screens/PaymentDetails/PaymentDetailsScreen";
import { getFCMToken } from "../utils/FCMService";
import { useEffect } from "react";
import { AppDispatch } from "../redux/store/store";
import { useDispatch } from "react-redux";
import { setDeviceToken } from "../redux/reducers/authReducer/authSlice";
import WishListScreen from "../screens/Wishlist/WishlistScreen";
import ChangePasswordScreen from "../screens/ChangePassword/ChangePasswordScreen";
import ForgotPasswordScreen from "../screens/ForgotPassword/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPassword/ResetPasswordScreen";
import BusinessDetailsScreen from "../screens/BusinessDetails/BusinessDetailsScreen";
import SellerDeliveryGuideScreen from "../screens/SellerDeliveryGuide/SellerDeliveryGuideScreen";

  
const RootStack = createStackNavigator<RootNavPropsType>();

const StackNavigator = () => {
  const dispatch = useDispatch<AppDispatch>()
  
  useEffect(() => {
     getFCMToken((token: string) => dispatch(setDeviceToken(token)))
  },[])

    
    return (
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash"
      >
        <RootStack.Screen name={"Splash"} component={Splash} />
        <RootStack.Screen name={"Welcome"} component={WelcomeScreen} />
        <RootStack.Screen name={"Welcome2"} component={WelcomeScreen2} />
        <RootStack.Screen name={"Welcome3"} component={WelcomeScreen3} />
        <RootStack.Screen name={"Login"} component={LoginScreen} />
        <RootStack.Screen name={"Signup"} component={SignupScreen} />
        <RootStack.Screen name={"Verification"} component={VerificationScreen} />
        <RootStack.Screen name={"RegistrationSuccess"} component={RegistrationSuccessScreen} />
        <RootStack.Screen name={"BottomTabs"} component={BottomNav} />
        <RootStack.Screen name={"SubCategories"} component={SubCategoriesScreen} />
        <RootStack.Screen name={"ProductDetail"} component={ProductDetailScreen} />
        <RootStack.Screen name={"ProfileSetting"} component={ProfileSettingScreen} />
        <RootStack.Screen name={"SavedAddress"} component={SavedAddressScreen} />
        <RootStack.Screen name={"AddNewAddress"} component={AddNewAddressScreen} />
        <RootStack.Screen name={"SellerInfo"} component={SellerInfoScreen} />
        <RootStack.Screen name={"MyProducts"} component={MyProductsScreen} />
        <RootStack.Screen name={"MyOrders"} component={MyOrdersScreen} />
        <RootStack.Screen name={"BecomeASeller"} component={BecomeASellerScreen} />
        <RootStack.Screen name={"Earnings"} component={EarningsScreen} />
        <RootStack.Screen name={"AddReview"} component={AddReviewScreen} />
        <RootStack.Screen name={"OrderDetails"} component={OrderDetailsScreen} />
        <RootStack.Screen name={"NotificationList"} component={NotificationListScreen} />
        {/* <RootStack.Screen name={"SearchProducts"} component={SearchProductsScreen} /> */}
        <RootStack.Screen name={"ProductListing"} component={ProductListingScreen} />
        <RootStack.Screen name={"AddNewProduct"} component={AddNewProductScreen} />
        <RootStack.Screen name={"ContactUs"} component={ContactUsScreen} />
        <RootStack.Screen name={"PrivacyPolicy"} component={PrivacyPolicyScreen} />
        <RootStack.Screen name={"TermsAndConditions"} component={TermsAndConditionsScreen} />
        <RootStack.Screen name={"MyCart"} component={MyCartScreen} />
        <RootStack.Screen name={"Chat"} component={ChatScreen} />
        <RootStack.Screen name={"OrderSuccess"} component={OrderSuccessScreen} />
        <RootStack.Screen name={"Payment"} component={PaymentScreen} />
        <RootStack.Screen name={"PaymentDetails"} component={PaymentDetailsScreen} />
        <RootStack.Screen name={"WishList"} component={WishListScreen} />
        <RootStack.Screen name={"ChangePassword"} component={ChangePasswordScreen} />
        <RootStack.Screen name={"ForgotPassword"} component={ForgotPasswordScreen} />
        <RootStack.Screen name={"ResetPassword"} component={ResetPasswordScreen} />
        <RootStack.Screen name={"BusinessDetails"} component={BusinessDetailsScreen} />
        <RootStack.Screen name={"SellerDeliveryGuide"} component={SellerDeliveryGuideScreen} />
      </RootStack.Navigator>
    );
  };

  export default StackNavigator;