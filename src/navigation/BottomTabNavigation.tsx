import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ChatListScreen from "../screens/ChatList/ChatListScreen";
import ExploreScreen from "../screens/Explore/ExploreScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import WishListScreen from "../screens/Wishlist/WishlistScreen";
import { tabScreens } from "./NavigationProps";
import {
    BottomTabBarProps,
    createBottomTabNavigator,
  } from "@react-navigation/bottom-tabs";
import { Colors, Font, fontSize } from "../theme";
import { hasNotch } from "../utils/CommonFunctions";
import { screenScale } from "../utils/scaling";
import images from "../theme/imageIndex";
import SearchProductsScreen from "../screens/SearchProducts/SearchProductsScreen";
import BecomeASellerScreen from "../screens/BecomeASeller/BecomeASellerScreen";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import firestore from '@react-native-firebase/firestore';
import { setUnreadMessages } from "../redux/reducers/authReducer/authSlice";
import { navigate } from "./RootNavigationFunctions";
import screens from "./NavigationScreens";

const Tab = createBottomTabNavigator<tabScreens>();


const BottomNav = () => {
  const {profileData} = useSelector((state: RootState) => state.profileSlice);
  const { unreadMessages} = useSelector((state: RootState) => state.authSlice);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    console.log("chat list use effect calling====>")
    if (profileData?.id) {
    const unsubscribe = firestore()
      .collection('chats')
      .where('userIds', 'array-contains', profileData?.id)
      .orderBy('lastMessageTimestamp', 'desc')
      .onSnapshot((snapshot) => {
         if (snapshot) {
        const chatsFromFirestore = snapshot?.docs?.map((doc) => ({
          chatId: doc.id,
          ...doc.data(),
        }));
        let newcount = chatsFromFirestore?.filter(item => item?.unreadCount[`${profileData?.id}`] > 0)?.length
        console.log(" unread count ==>", newcount, Platform.OS);
        dispatch(setUnreadMessages(newcount))
        // setTimeout(() => {
          // setLoadingChats(false)
        // }, 2000);
        
       }
      },
      (error) => {
        console.log('Error fetching chats: ', error);
        // setLoadingChats(false); // Handle error and stop loading
      });

    return () => unsubscribe();
    }
  }, [profileData]);

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {
        },
        lazy: true,
      })}
      backBehavior="history"
      tabBar={(props: any) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="SearchProducts" component={SearchProductsScreen} />
      {/* <Tab.Screen name="BecomeASeller" component={BecomeASellerScreen} /> */}
      <Tab.Screen name="Explore" component={ExploreScreen} />
      {/* <Tab.Screen name="WishList" component={WishListScreen} /> */}
      <Tab.Screen name="ChatList" component={ChatListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNav;

function MyTabBar({ state, navigation }: BottomTabBarProps) {
  const { unreadMessages} = useSelector((state: RootState) => state.authSlice);
    const tabData = [
        {
            name: "Home",
            imageEmpty: images.homeEmpty,
            imageFilled: images.homeFilled,
            showName: "Home",
        },
        {
          name: "Search",
          imageEmpty: images.searchTab,
          imageFilled: images.searchTabFilled,
          showName: "Search",
        },
        {
            name: "BecomeASeller",
            imageEmpty: images.sellNowTab,
            imageFilled: images.sellNowTabFilled,
            showName: "Sell Now",
        },
      //   {
      //     name: "Explore",
      //     imageEmpty: images.exploreEmpty,
      //     imageFilled: images.exploreFilled 
      // },
        // {
        //     name: "Wishlist",
        //     imageEmpty: images.wishEmpty,
        //     imageFilled: images.wishFilled 
        // },
        {
          name: "Chat",
          imageEmpty: images.chatEmpty,
          imageFilled: images.chatFilled,
          showName: "Messages",
        },
        {
            name: "Profile",
            imageEmpty: images.profileEmpty,
            imageFilled: images.profileFilled,
            showName: "Profile",
        },
    ]

    return(
        <View style={styles.tabBar}>
            {state.routes.map((route, index) =>{
                const isFocused = state.index === index;
                const onPress = (index1: number) => {
                  console.log(" onTabPress", index1)
                  if (index1 === 2) {
                    navigate(screens.ADD_NEW_PRODUCT, { fromTab: true })
                  } else {
                    const event = navigation.emit({
                      type: "tabPress",
                      target: route.key,
                      canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                      navigation.navigate({
                        name: route.name,
                        merge: true,
                        params: { isTabPressed: true },
                      });
                    }
                  }
                  };
                return(
                    <TouchableOpacity key={tabData[index].name} onPress={() => onPress(index)} style={[styles.tabTouch, isFocused && { backgroundColor: Colors.white }]}>
                        <Image style={styles.tabImage} source={isFocused ? tabData[index].imageFilled : tabData[index].imageEmpty} />
                        <Text style={[styles.tabText, isFocused && { color: Colors.primary, fontFamily: Font.FontBold, fontSize: fontSize.fontSize_very_small } ]} >{tabData[index].showName}</Text>
                        {index === 3 &&unreadMessages !== null && unreadMessages > 0 && (<View style={styles.unreadView}>
                            <Text style={styles.unreadNumber}>{unreadMessages}</Text>
                          </View>)}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        // width: '100%',
        flexDirection: 'row',
        backgroundColor: Colors.primaryText,
        // height: screenScale(64),
        borderRadius: 16,
        // marginBottom: hasNotch() ? screenScale(32) : screenScale(16),
        marginHorizontal: screenScale(20),
        padding: screenScale(8),
        position: 'absolute',
        bottom: hasNotch() ? screenScale(28) : screenScale(12),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.24,
        shadowRadius: 1.41,
        elevation: 2,
    },
    tabTouch: {
        width: "20%",
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: screenScale(8)
    },
    tabImage: {
        width: screenScale(24),
        aspectRatio: 1,
        // resizeMode: 'cover'
    },
    tabText: {
      fontFamily: Font.FontMedium,
      fontSize: fontSize.fontSize_very_small,
      color: Colors.white50,
      marginTop: 2
    },
    unreadView: {
      height: screenScale(16),
      width: screenScale(16),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:45,
      backgroundColor: Colors.primary,
      position: 'absolute',
      top:5,
      right:16,
    },
    unreadNumber: {
      fontFamily: Font.FontBold,
      fontSize: fontSize.fontSize_very_small,
      color: Colors.white,
    }
});
