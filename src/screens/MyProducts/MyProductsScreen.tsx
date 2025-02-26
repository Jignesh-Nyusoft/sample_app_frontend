import { useEffect, useState } from "react";
import { StackPropsType, tabStackProps } from "../../navigation/NavigationProps";
import { ActivityIndicator, FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { CustomScreen } from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { goBack, navigate } from "../../navigation/RootNavigationFunctions";
import { Colors } from "../../theme";
import { LABELS } from "../../locales/common";
import { CustomTopTab } from "../../components/CustomTopTab";
import { dummyProductList } from "../../utils/dummyData";
import styles from "./MyProductsScreenStyle";
import { CustomOrderCard } from "../../components/CustomOrderCard";
import { CommonStyleSheets } from "../../utils/CommonStyle";
import CustomButton from "../../components/CustomButton";
import screens from "../../navigation/NavigationScreens";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { MyProductItem } from "../../redux/types/myProductTypes";
import { deleteMyProduct, getMyProducts } from "../../redux/actions/productActions";
import { customCommonSeketon, loadMoreView } from "../../utils/CommonSkeletons";
import { screenScale } from "../../utils/scaling";
import { SkeletonData } from "../../utils/commonData";
import { CustomEmptyView } from "../../components/CustomEmptyView";
import { setDialogData } from "../../redux/reducers/AlertReducer/alertSlice";
import { showToast } from "../../utils/CommonFunctions";
import { useIsFocused } from "@react-navigation/native";
import images from "../../theme/imageIndex";
let current_page = 1
let last_page = 1

const MyProductsScreen = ({ navigation, route }: StackPropsType<"MyProducts">) => {
    const [current, setCurrent] = useState('Approved');
    const {  } = useSelector(
      (state: RootState) => state.myProductSlice
    );
    const { isSkeleton, skeletonName } = useSelector(
      (state: RootState) => state.loaderSlice
    );
    const { profileData } = useSelector(
      (state: RootState) => state.profileSlice
    );
    const dispatch = useDispatch<AppDispatch>();
    const [productList, setProductList] = useState<MyProductItem[] | any>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const isFocused = useIsFocused()
    const [showWarning, setShowWarning] = useState(false)


    const getMyProductListNormal = () => {
      // current_page = 1
      // last_page = 1
      setLastPage(1);
      setCurrentPage(1);
      dispatch(getMyProducts({ isApproved: current === "Approved"}))
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        if (resp?.data) {
          setProductList(resp?.data);
          console.log(' my product list ::', resp?.data, resp?.last_page, current_page);
        }
        if (resp?.last_page) {
          setLastPage(resp?.last_page);
          setCurrentPage(resp?.current_page);
          current_page = resp?.current_page
          last_page = resp?.last_page
        }
      });
    }

    // useEffect(() => {
    //   if (isFocused) {
    //     getMyProductListNormal()
    //   }
    // },[isFocused]);

    useEffect(() => {
      if (profileData?.is_seller_details_pending === 1 || profileData?.pickup_address_available === 0) {
        setShowWarning(true)
      }
    },[profileData]);

    useEffect(() => {
      getMyProductListNormal()
    },[current]);



    const getMyProductListPagination = () => {
      dispatch(getMyProducts({ isApproved: current === "Approved", page: current_page + 1}))
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        if (resp?.data) {
          setProductList(resp?.data);
          
          current_page = current_page + 1
          console.log(' my product pagination data', resp?.data);
          setProductList([ ...productList, ...resp?.data])
        }
        if (resp?.last_page) {
          setCurrentPage(resp?.current_page)
          setLastPage(resp?.last_page)
          last_page = resp?.last_page
        }
      });
    }

    const refreshList = () => { 
      current_page = 1
      last_page = 1
      dispatch(getMyProducts({ isApproved: current === "Approved", isRefresh:  true}))
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        if (resp?.data) {
          setProductList(resp?.data);
          console.log(' my product list ::', resp?.data);
        }
        if (resp?.last_page) {
          last_page = resp?.last_page
        }
      });
    }

    const renderTopTabs = () => (
        <CustomTopTab
          onPress={(route: any) => {
            setCurrent(route), console.log('route data', route);
          }}
          selectedTab={current}
          options={[
            LABELS.MyProductsScreen.pending,
            LABELS.MyProductsScreen.approved,
          ]}
        />
      );

    const onProductDelete = (item: any) => {
      dispatch(
        setDialogData({
          isVisible: true,
          title: LABELS.MyProductsScreen.deleteProduct,
          description: LABELS.MyProductsScreen.areYouSureDeleteProduct,
          doneButtonText: LABELS.COMMON_LABELS.yes,
          onDone: () => {
            dispatch(
              deleteMyProduct(item.id),
            )
              .unwrap()
              .then((res: any) => {
                let resp = res?.data ? res.data : res;
                if (resp) {
                  console.log(' my product delete', resp);
                  showToast(resp?.message, "success");
                  getMyProductListNormal()
                  // setProductList([...productList, ...resp?.data]);
                }
              });
          },
          onCancel: () => {},
        }),
      );
    }  

    const rennderListItem = (item: MyProductItem, index: any) => (
      <>{ skeletonName.includes("myProducts") ? customCommonSeketon(screenScale(120), '100%') :
        <CustomOrderCard 
            item={item}
            isOrder={false}
            showEditDelete={!item.is_sold?.is_sold}
            onItemPress={() => item.is_sold?.is_sold ? navigate(screens.ORDER_DETAILS, { orderItem: { id: item?.is_sold?.order_id }, isFrom: "MyProducts"}) : navigate(screens.PRODUCTDETAIL, { product: item, isFrom: "MyProducts"})}
            onDelete={() => onProductDelete(item)}
            onEdit={() => navigate(screens.ADD_NEW_PRODUCT, { product: item, onDone: () => getMyProductListNormal() })}
        />}
      </>
    )  

    const renderProductList = () => (
        <View style={CommonStyleSheets.commonMainView}>
        <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={() => refreshList()}
        refreshing={skeletonName.includes("myProductRefresh")}
        // refreshControl={<ActivityIndicator color={Colors.primary} />}
        data={skeletonName.includes("myProducts") ? SkeletonData : productList}
        contentContainerStyle={styles.flatContainer}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => rennderListItem(item, index)}
        ListEmptyComponent={() => (
          <CustomEmptyView text={LABELS.MyProductsScreen.noProductsAvailable} />
        )}
        ListFooterComponent={() => currentPage < lastPage && loadMoreView(() => getMyProductListPagination(), skeletonName.includes("myProductListPagination"))}

      />
      </View>
    )

    const renderBottomView = () => (
        <View style={CommonStyleSheets.commonBottomView} >
        <CustomButton
          title={LABELS.MyProductsScreen.addNewProduct}
          customStyle={{ width: '100%' }}
          onPress={() => {
            navigate(screens.ADD_NEW_PRODUCT, { onDone: () => getMyProductListNormal() })
          }}
        />
      </View>
    )

    const renderTopWarning = () => (
      <TouchableOpacity
          onPress={() => navigate(screens.BECOMEASELLER, { isFrom: "MyProducts" })}
          style={styles.becomeSellerView}>
            <View style={styles.becomeTop}>
          <View style={styles.imageWrapper2}>
            <Image source={images.reverseInfo} tintColor={Colors.primaryText} />
          </View>
          <Text style={styles.becomeSellerText}>
            {/* {profileData?.is_seller === 1 ? LABELS.ProfileScreen.yourSellingInfo : LABELS.ProfileScreen.becomeASeller} */}
            {LABELS.ProfileScreen.completeProfile}
          </Text>

            <TouchableOpacity onPress={() => setShowWarning(false)} style={styles.rightArrow}>
              <Image style={styles.close}  source={images.closeIcon} />
            </TouchableOpacity> 
          </View>
          <Text style={styles.becomeSellerTextSub}>
            {/* {profileData?.is_seller === 1 ? LABELS.ProfileScreen.yourSellingInfo : LABELS.ProfileScreen.becomeASeller} */}
            {LABELS.ProfileScreen.warningText}
          </Text>
        </TouchableOpacity>
    )
        
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
      <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={LABELS.MyProductsScreen.myProducts}
        showBack
      />
      {showWarning && renderTopWarning()}
      {/* {renderTopTabs()} */}
      {renderProductList()}
      {renderBottomView()}
      </CustomScreen>
    );
  };
  
  export default MyProductsScreen;