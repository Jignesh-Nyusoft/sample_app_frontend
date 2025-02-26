import { useEffect, useRef, useState } from "react";
import { StackPropsType, tabStackProps } from "../../navigation/NavigationProps";
import { ActivityIndicator, Animated, FlatList, Image, ImageBackground, PanResponder, Text, TouchableOpacity, View } from "react-native";
import { CustomScreen } from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { goBack, navigate } from "../../navigation/RootNavigationFunctions";
import { Colors } from "../../theme";
import { LABELS } from "../../locales/common";
import { SkeletonData } from "../../utils/commonData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { dummyNotificationData } from "../../utils/dummyData";
import { CustomEmptyView } from "../../components/CustomEmptyView";
import { customCommonSeketon, loadMoreView } from "../../utils/CommonSkeletons";
import styles from "./NotificationListScreenStyle";
import moment from "moment";
import { getOnlyTimeEstimatedString, getTimeEstimatedString, showToast } from "../../utils/CommonFunctions";
import images from "../../theme/imageIndex";
import { screenScale } from "../../utils/scaling";
import { CommonStyleSheets } from "../../utils/CommonStyle";
import { deleteNotification, getNotificationList } from "../../redux/actions/profileActions";
import { NotificationItem } from "../../redux/types/profileTypes";
import screens from "../../navigation/NavigationScreens";
import { setDialogData } from "../../redux/reducers/AlertReducer/alertSlice";
import { useIsFocused } from "@react-navigation/native";

let current_page = 1
let last_page = 1
let current_item = 0

// interface props {
//   item: NotificationItem,
//   index: number
// }
// export const NotificationListItem = ({item, index}: props) => {
//       const swipeAnim = useRef(new Animated.Value(0)).current; // Animation 

//   const [isSwiping, setIsSwiping] = useState(false);
//       const panResponder = useRef(
//         PanResponder.create({
//         onStartShouldSetPanResponder: () => true,
//         onMoveShouldSetPanResponder: () => true,
//         onPanResponderMove: (evt, gestureState) => {
//           // Limit swipe to a certain distance for better control
//           if (gestureState.dx < -50 && !isSwiping) { 
//             setIsSwiping(true);
//             swipeAnim.setValue(gestureState.dx / -100); // Map dx to scale 
//            }
//           },
//           onPanResponderRelease: () => {
//           Animated.spring(swipeAnim, { toValue: 0, useNativeDriver: true 
//           }).start(); 
//           setIsSwiping(false);
//           },
//           })
//          ).current;
//   return (
//     // <>{skeletonName.includes("notificationList") ? customCommonSeketon(screenScale(110), '100%') :
//       <>{translateValue && translateValue?.length > 0 &&
//       <View style={styles.listItemBack} >
//         <TouchableOpacity style={styles.deleteView}>
//           <Image style={styles.deleteButton} source={images.deleteIcon} tintColor={Colors.white} />
//         </TouchableOpacity>
//       <Animated.View style={[{
//         transform: [{ translateX: translateValue[index] }]
//        }]}>
//         <TouchableOpacity onPress={() => onItemPress(item, index,translateValue)} activeOpacity={1} style={styles.listItem}>
//           <Image style={styles.userImage} source={dummyNotificationData[0].orderImage} />
//           <View style={styles.sideView}>
//             <View style={styles.nameView}>
//               <Text style={true ? styles.userName : styles.userNameUnread}>{item?.data?.data?.title}</Text>
//               <View style={styles.timeView}>
//                 <Text numberOfLines={2} style={styles.timeText}>{getOnlyTimeEstimatedString(item.created_at)}</Text>
//                 {true && <View style={styles.redDot} />}
//               </View>
//             </View>
//             <Text style={true ? styles.lastMessage : styles.lastMessageUnread}>{item.data?.data?.message}</Text>
//           </View>
//         </TouchableOpacity>
//       </Animated.View>
//       </View>}
//       </>
//       // }
//       // </>
//   )
// }

const NotificationListScreen = ({ navigation }: StackPropsType<"NotificationList">) => {
  const { isSkeleton, skeletonName } = useSelector(
    (state: RootState) => state.loaderSlice
  );  
  const dispatch = useDispatch<AppDispatch>();
  const [translateValue, setTranslateValue] = useState<[]>()
  const [notificationList, setNotificationList] = useState<NotificationItem[] | any>([])
  const isFocused = useIsFocused()

  const getNotificationListNormal = () => {
    current_page = 1
    last_page = 1
    dispatch(getNotificationList())
    .unwrap()
    .then((res: any) => {
      let resp = res?.data ? res.data : res;
      if (resp?.data) {
        let newItems: any = [];
        let newArr: NotificationItem[] = [];
        resp?.data?.data?.forEach((e: NotificationItem) => {
          newItems.push(new Animated.Value(0))
          let newobj = {...e}
          newobj.data = e?.data
          newArr.push(newobj)
      });
        setTranslateValue(newItems)
        setNotificationList(newArr);
        console.log(' my notification list ::',resp?.data?.current_page , resp?.data?.last_page );
      }
      if (resp?.data?.last_page) {
        current_page = resp?.data?.current_page
        last_page = resp?.data?.last_page
      }
    });
  }
  
  useEffect(() => {
    isFocused && getNotificationListNormal()
    },[isFocused]);



    const refreshList = () => {
      getNotificationListNormal()
    }

    const getNotificationListPagination = () => {
      dispatch(getNotificationList(current_page + 1))
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        if (resp?.data) {
          let newItems: any = translateValue;
          let newArr: NotificationItem[] = notificationList;
          resp?.data?.data?.forEach((e: NotificationItem) => {
            newItems.push(new Animated.Value(0))
            let newobj = {...e}
            newobj.data = e?.data
            newArr.push(newobj)
        });
          setTranslateValue(newItems)
          setNotificationList(newArr);
          console.log(' my notification list ::', resp?.current_page,  resp?.last_page);
        }
        if (resp?.data?.last_page) {
          current_page = resp?.data?.current_page
          last_page = resp?.data?.last_page
        }
      });
    }

    const onDelete = (item: NotificationItem) => {
      dispatch(
        setDialogData({
          isVisible: true,
          title: LABELS.NotificationList.deleteNotification,
          description: LABELS.NotificationList.sureDeleteNotification,
          doneButtonText: LABELS.COMMON_LABELS.yes,
          onDone: () => {
            dispatch(
              deleteNotification(item.id),
            )
              .unwrap()
              .then((res: any) => {
                let resp = res?.data ? res.data : res;
                if (resp) {
                  console.log(' my notification delete', resp);
                  showToast(resp?.message, "success");
                  getNotificationListNormal()
                }
              });
          },
          onCancel: () => {},
        }),
      );
    }

    const onItemPress = (item: NotificationItem, index: number) => {
      item?.data?.data?.order_id && navigate(screens.ORDER_DETAILS, { orderItem: item?.read_at ? { id: item?.data?.data?.order_id } : { id: item?.data?.data?.order_id, notification_id: item?.id }, isFrom: "Notifications" })
    }

// dont delete it
  //   const rennderListItem = (item: NotificationItem, index: number) => {
  //     return (
  //     <>{skeletonName.includes("notificationList") ? customCommonSeketon(screenScale(110), '100%') :
  //     <>{translateValue && translateValue?.length > 0 &&
  //     <View style={styles.listItemBack} >
  //       <TouchableOpacity style={styles.deleteView}>
  //         <Image style={styles.deleteButton} source={images.deleteIcon} tintColor={Colors.white} />
  //       </TouchableOpacity>
  //     <Animated.View style={[{
  //       transform: [{ translateX: translateValue[index] }]
  //      }]} {...panResponder(item?.id).panHandlers}>
  //       <TouchableOpacity onPress={() => onItemPress(item, index,translateValue)} activeOpacity={1} style={styles.listItem}>
  //         <Image style={styles.userImage} source={dummyNotificationData[0].orderImage} />
  //         <View style={styles.sideView}>
  //           <View style={styles.nameView}>
  //             <Text style={true ? styles.userName : styles.userNameUnread}>{item?.data?.data?.title}</Text>
  //             <View style={styles.timeView}>
  //               <Text numberOfLines={2} style={styles.timeText}>{getOnlyTimeEstimatedString(item.created_at)}</Text>
  //               {true && <View style={styles.redDot} />}
  //             </View>
  //           </View>
  //           <Text style={true ? styles.lastMessage : styles.lastMessageUnread}>{item.data?.data?.message}</Text>
  //         </View>
  //       </TouchableOpacity>
  //     </Animated.View>
  //     </View>}
  //     </>
  //     }
  //     </>
  //   )
  // }

    const rennderListItem = (item: NotificationItem, index: number) => {
      let opened = false;
      const translateX = new Animated.Value(0);
      const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
        onPanResponderMove: (_, gestureState) => {
          console.log("panResponder moving", gestureState.dx)
          // if (translateX)
          // Update the position of the item as it is swiped
          if (opened) {
            if (gestureState.dx < 5 && gestureState.dx >0) {
              translateX.setValue(gestureState.dx);
              }
          } else {
            if (gestureState.dx > -100 && gestureState.dx < 0) {
              translateX.setValue(gestureState.dx);
              }
          }
          // translateX.setValue(gestureState.dx);
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx < 50) {
            // Swipe right threshold
            Animated.spring(translateX, {
              toValue: -50, // Move the item off the screen
              velocity: 10,
              useNativeDriver: true,
              bounciness: 0
            }).start(() => {});
            // translateX.setValue( -50);
            opened = true
          } else {
            // If not swiped enough, reset position
            Animated.spring(translateX, {
              toValue: 0, // Move the item off the screen
              velocity: 10,
              useNativeDriver: true,
              bounciness: 0
            }).start();
            // translateX.setValue(0);
            opened = false
          }
        },
      });
      return (
      <>{skeletonName.includes("notificationList") ? customCommonSeketon(screenScale(110), '100%') :
      <>{translateValue && translateValue?.length > 0 &&
      <View style={styles.listItemBack} >
        <TouchableOpacity onPress={() => onDelete(item)} style={styles.deleteView}>
          <Image style={styles.deleteButton} source={images.deleteIcon} tintColor={Colors.white} />
        </TouchableOpacity>
      <Animated.View style={{transform: [{ translateX }] }} {...panResponder.panHandlers}>
        <TouchableOpacity onPress={() => onItemPress(item, index)} activeOpacity={0.99} style={styles.listItem}>
          <Image style={styles.userImage} source={{ uri: item?.data?.data?.image_url?.length > 0 ? item?.data?.data?.image_url : null}} defaultSource={images.noImage} />
          <View style={styles.sideView}>
            <View style={styles.nameView}>
              <Text style={item?.read_at ? styles.userName : styles.userNameUnread}>{item?.data?.data?.title}</Text>
              <View style={styles.timeView}>
                <Text numberOfLines={2} style={styles.timeText}>{getOnlyTimeEstimatedString(item.created_at)}</Text>
                {!item?.read_at && <View style={styles.redDot} />}
              </View>
            </View>
            <Text style={item?.read_at ? styles.lastMessage : styles.lastMessageUnread}>{item.data?.data?.message}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
      }
      </>
      }
      </>
    )
  }
        
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
        <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={LABELS.NotificationList.header}
        showBack
      />
      <View style={CommonStyleSheets.commonMainView}>
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={() => refreshList()}
        refreshing={skeletonName.includes("notificationListPage")}
        // refreshControl={<ActivityIndicator color={Colors.primary} />}
        data={skeletonName.includes("notificationList") ? SkeletonData : notificationList}
        contentContainerStyle={styles.flatContainer}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => rennderListItem(item, index)}
        ListEmptyComponent={() => (
          <CustomEmptyView text={LABELS.NotificationList.noNotifications} />
        )}
        ListFooterComponent={() => current_page < last_page && loadMoreView(() => getNotificationListPagination(), skeletonName.includes("notificationListPagination"))}

      />
      </View>
      </CustomScreen>
    );
  };
  
  export default NotificationListScreen;