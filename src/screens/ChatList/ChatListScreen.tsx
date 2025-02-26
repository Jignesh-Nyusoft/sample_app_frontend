import { useEffect, useState } from "react";
import { StackPropsType, tabStackProps } from "../../navigation/NavigationProps";
import { Animated, FlatList, Image, ImageBackground, Platform, Text, TouchableOpacity, View } from "react-native";
import { CustomScreen } from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { Colors, fontSize } from "../../theme";
import { LABELS } from "../../locales/common";
import styles from "./ChatListScreenStyle";
import CustomSearchBar from "../../components/CustomSearchBar";
import { dummyChatList } from "../../utils/dummyData";
import moment from "moment";
import { navigate } from "../../navigation/RootNavigationFunctions";
import screens from "../../navigation/NavigationScreens";
import { screenScale } from "../../utils/scaling";
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import images from "../../theme/imageIndex";
import { useIsFocused } from "@react-navigation/native";
import { SkeletonData } from "../../utils/commonData";
import { customCommonSeketon } from "../../utils/CommonSkeletons";
import { CustomEmptyView } from "../../components/CustomEmptyView";
import { setUnreadMessages } from "../../redux/reducers/authReducer/authSlice";


const ChatListScreen = ({ navigation }: tabStackProps<"ChatList">) => {
    const [searchText, setSearchText] = useState("")
    const {profileData} = useSelector((state: RootState) => state.profileSlice);
    const dispatch = useDispatch<AppDispatch>();
    const [chatList, setChatList] = useState<any>([])
    const [loadingChats, setLoadingChats] = useState(true)
    const isFocused = useIsFocused()
    useEffect(() => {
      console.log("chat list use effect calling====>")
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
          setChatList(chatsFromFirestore);
          // let newcount = chatsFromFirestore?.filter(item => item?.unreadCount[`${profileData?.id}`] > 0)?.length
          // console.log(" setting unread count ==>", newcount, Platform.OS);
          // dispatch(setUnreadMessages(newcount))
          // setTimeout(() => {
            setLoadingChats(false)
          // }, 2000);
          
          console.log(" chat list", chatsFromFirestore, snapshot)
         }
        },
        (error) => {
          console.log('Error fetching chats: ', error);
          setLoadingChats(false); // Handle error and stop loading
        });
  
      return () => unsubscribe();
    }, []);

    const renderSearch = () => (
      <View style={styles.searchView}>
          <CustomSearchBar
            value={searchText}
            searchTintColor={Colors.primaryText}
            onChangeText={val => setSearchText(val)}
            placeholder={LABELS.ChatListScreen.searchForUser}
            customContainerStyle={styles.customSearch}
            customStyle={styles.customSearchMainView}
            placeholderTextColor={Colors.secondoryText}
            textInputStyle={styles.customSearchTextInput}
          />
      </View>
    )

    const renderListItem = (item: any, index: number) => (
      <>{loadingChats ? customCommonSeketon(screenScale(100), "100%") : 
        <TouchableOpacity onPress={() =>{ 
          console.log(" item pressed --->", item)
            navigate(screens.CHAT, { chatId: item?.chatId, currentUser: profileData, otherUser: item.usersData?.find((val: any) => val.id !== profileData?.id), product: { id: item?.product_id, product_name: item?.product_name, product_image: item?.product_image } })   
        }} style={styles.chatItem}>
          <Image style={styles.userImage} source={{ uri: item?.product_image }} defaultSource={images.noImage} />
          <View style={styles.sideView}>
            <View style={styles.nameView}>
              <Text style={[item.unreadCount[`${profileData?.id}`] === 0 ? styles.userName : styles.userNameUnread, { fontSize: fontSize.fontSize_regular }]}>{"Green Dress"}</Text>
              <View style={styles.timeView}>
                <Text style={styles.timeText}>{moment(item?.lastMessageTimestamp?.seconds * 1000).calendar(null, { 
                  lastDay : '[Yesterday]',
      sameDay : '[Today]',
      lastWeek : 'dddd',})}</Text>
                {item.unreadCount[`${profileData?.id}`] > 0 && <View style={styles.redDot} />}
              </View>
            </View>
            <Text style={[styles.userName, { marginBottom: screenScale(4), marginTop: -2, color: Colors.primary, fontSize: fontSize.fontSize_small }]}>{item.usersData?.find((val: any) => val.id !== profileData?.id)?.name}</Text>
            <Text numberOfLines={1} style={item.unreadCount[`${profileData?.id}`] === 0 ? styles.lastMessage : styles.lastMessageUnread}>{item.lastMessage}</Text>
          </View>
        </TouchableOpacity>
      }</>
    )

    const renderChatList = () => (
      <View style={styles.listWrapper}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={loadingChats ? SkeletonData : chatList}
        contentContainerStyle={styles.flatItemContainer}
        keyExtractor={item => item.lastMessageTimestamp?.toString()}
        renderItem={({item, index}) => renderListItem(item, index)}
        ListEmptyComponent={() => (
          <CustomEmptyView text={LABELS.ChatListScreen.noChatsAvailable} />
        )}
      /> 
      </View>
    )
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
        <CustomHeader
          container={{backgroundColor: Colors.white}}
          title={LABELS.ChatListScreen.chats}
          showBack={false}
        />
        <View style={styles.mainPadding}>
          {/* {renderSearch()} */}
          {renderChatList()}
        </View>
      </CustomScreen>
    );
  };
  
  export default ChatListScreen;