import { useEffect, useState } from "react";
import { StackPropsType, tabStackProps } from "../../navigation/NavigationProps";
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { CustomScreen } from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { goBack, navigate } from "../../navigation/RootNavigationFunctions";
import { Colors } from "../../theme";
import { LABELS } from "../../locales/common";
import { CustomTopTab } from "../../components/CustomTopTab";
import { CustomOrderCard } from "../../components/CustomOrderCard";
import { CommonStyleSheets } from "../../utils/CommonStyle";
import styles from "./MyOrdersScreenStyle";
import { dummyOrderList } from "../../utils/dummyData";
import screens from "../../navigation/NavigationScreens";
import { CustomEmptyView } from "../../components/CustomEmptyView";
import { customCommonSeketon, loadMoreView } from "../../utils/CommonSkeletons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { screenScale } from "../../utils/scaling";
import { getOrderList } from "../../redux/actions/orderActions";
import { SkeletonData } from "../../utils/commonData";
import { OrderListItem } from "../../redux/types/orderTypes";

const MyOrdersScreen = ({ navigation }: StackPropsType<"MyOrders">) => {
  const [current, setCurrent] = useState('Pending');
  const { isSkeleton, skeletonName } = useSelector(
    (state: RootState) => state.loaderSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const [orderList, setOrderList] = useState<OrderListItem[] | any>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const getOrderListNormal = () => {
    // current_page = 1
    // last_page = 1
    setLastPage(1);
    setCurrentPage(1);
    dispatch(getOrderList(current))
    .unwrap()
    .then((res: any) => {
      let resp = res?.data ? res.data : res;
      if (resp) {
        setOrderList(resp);
        console.log(' my order list ::', resp, resp?.last_page);
      }
      if (resp?.last_page) {
        setLastPage(resp?.last_page);
        setCurrentPage(resp?.current_page);
      }
    });
  }
  useEffect(() => {
    getOrderListNormal()
    },[current]);
    
    const refreshList = () => { 
      getOrderListNormal()
      // dispatch(getOrderList(current))
      // .unwrap()
      // .then((res: any) => {
      //   let resp = res?.data ? res.data : res;
      //   if (resp?.data) {
      //     setOrderList(resp?.data);
      //     console.log(' my order list ::', resp?.data);
      //   }
      //   if (resp?.last_page) {
      //     setLastPage(resp?.last_page)
      //   }
      // });
    }

    const getOrderListPagination = () => {

    }

    const renderTopTabs = () => (
      <CustomTopTab
        onPress={(route: any) => {
          setCurrent(route), console.log('route data', route);
        }}
        selectedTab={current}
        options={[
          LABELS.MyOrdersScreen.pending,
          LABELS.MyOrdersScreen.shipped,
          LABELS.MyOrdersScreen.delivered
        ]}
      />
    );

    const rennderListItem = (item: OrderListItem, index: any) => (
      <>{ skeletonName.includes("orderList") ? customCommonSeketon(screenScale(120), '100%') :
      <CustomOrderCard 
          item={item?.orderitem?.product}
          isOrder
          onItemPress={() => navigate(screens.ORDER_DETAILS, { orderItem: item })}
          onAddReview={() => navigate(screens.ADD_REVIEW, { orderItem: item })}
          orderData={item}
      />}
      </>
  )  

  const renderOrderList = () => (
      <View style={CommonStyleSheets.commonMainView}>
      <FlatList
      showsVerticalScrollIndicator={false}
      onRefresh={() => refreshList()}
      refreshing={skeletonName.includes("myProductRefresh")}
      data={skeletonName.includes("orderList") ? SkeletonData : orderList}
      contentContainerStyle={styles.flatContainer}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => rennderListItem(item, index)}
      // ListEmptyComponent={renderEmpty}
      ListEmptyComponent={() => (
        <CustomEmptyView text={LABELS.MyOrdersScreen.noOrdersAvailable} />
      )}
      ListFooterComponent={() => currentPage < lastPage && loadMoreView(() => getOrderListPagination(), skeletonName.includes("orderListPagination"))}
    />
    </View>
  )
        
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
        <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={LABELS.MyOrdersScreen.header}
        showBack
      />
      {renderTopTabs()}
      {renderOrderList()}
      </CustomScreen>
    );
  };
  
  export default MyOrdersScreen;