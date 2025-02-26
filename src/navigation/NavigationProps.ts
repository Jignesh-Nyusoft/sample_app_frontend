import { BottomTabBarButtonProps, BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Category, ProductItemDetail, SuitableItem } from "../redux/types/homeTypes";
import { UserAddressItem } from "../redux/types/profileTypes";
import { OrderListItem } from "../redux/types/orderTypes";

export type RootNavPropsType = {
    Splash: undefined;
    Welcome: undefined;
    Welcome2: undefined;
    Welcome3: undefined;
    Login: undefined;
    Signup: undefined;
    Verification: { dialCode?: string; mobile?: string; fromScreen: string; otpData?: string, email?: string};
    RegistrationSuccess: undefined;
    BottomTabs: undefined;
    SubCategories: { suitableItem: SuitableItem | any, category?: any, isFrom?: string };
    ProductDetail: { product: any, isFrom?: string},
    MyCart: { product: ProductItemDetail}
    ProfileSetting: any,
    SavedAddress: { isFrom?: string, addressItem?: UserAddressItem , onSelect: (item: UserAddressItem) => void},
    AddNewAddress: { isEdit?: boolean, addressItem?: UserAddressItem, onDone?: (address?: any) => void, isFrom?: string },
    SellerInfo: { sellerId: number },
    MyProducts: any,
    MyOrders: any,
    BecomeASeller: { isFrom? : any },
    Earnings: any,
    AddReview: { orderItem: OrderListItem | any },
    OrderDetails: { orderItem: OrderListItem | any, isFrom?: string},
    NotificationList: any,
    SearchProducts: any,
    ProductListing: { searchText: string },
    AddNewProduct: { product? : any, onDone? : () => void, fromTab?: boolean};
    ContactUs: any;
    PrivacyPolicy: any;
    TermsAndConditions: any;
    Chat: { user?: any, chatId?: string, currentUser?: any, otherUser?: any, product?: ProductItemDetail}
    OrderSuccess: any;
    Payment: {paymentData : any};
    PaymentDetails: any;
    WishList: any;
    ChangePassword: any;
    ForgotPassword: any;
    ResetPassword: { email: string, otpData?: string};
    BusinessDetails: { oldBody: any };
    SellerDeliveryGuide: any;
}

export type StackPropsType<T extends keyof RootNavPropsType> = StackScreenProps<
  RootNavPropsType,
  T
>;

export type tabScreens = {
  Home: {
    isRefresh?: boolean;
  };
  SearchProducts: {
    isRefresh?: boolean;
  };
  // BecomeASeller: {
  //   isRefresh?: boolean;
  // };
  Explore: {
    isRefresh?: boolean;
  };
  // WishList: {
  //   isRefresh?: boolean;
  // };
  ChatList: {
    isRefresh?: boolean;
  };
  Profile: {
    isRefresh?: boolean;
  };
};

export type tabStackProps<T extends keyof tabScreens> = CompositeScreenProps<
  BottomTabScreenProps<tabScreens, T>,
  StackScreenProps<RootNavPropsType>
>;