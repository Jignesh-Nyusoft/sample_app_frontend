import { useEffect, useState } from "react";
import { StackPropsType, tabStackProps } from "../../navigation/NavigationProps";
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { CustomScreen } from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { goBack, navigate } from "../../navigation/RootNavigationFunctions";
import { Colors } from "../../theme";
import { CommonStyleConstants } from "../../utils/CommonStyle";
import { SkeletonData, sortItemsData } from "../../utils/commonData";
import { CustomProductCard } from "../../components/CustomProductCard";
import { loadMoreView, productSkeleton } from "../../utils/CommonSkeletons";
import { ProductItem } from "../../redux/types/homeTypes";
import screens from "../../navigation/NavigationScreens";
import { CustomEmptyView } from "../../components/CustomEmptyView";
import { LABELS } from "../../locales/common";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductListingScreenStyle";
import { addToWishList, removeFromList } from "../../redux/actions/wishlistActions";
import { showToast } from "../../utils/CommonFunctions";
import { getAttributeList, getProductList } from "../../redux/actions/homeActions";
import { addRecentSearch, setEmptyFilterData } from "../../redux/reducers/homeReducer/homeSlice";
import images from "../../theme/imageIndex";
import { CustomFilterModal } from "../../components/CustomFilterModal";
import { screenScale } from "../../utils/scaling";

let last_page = 1
let current_page = 1
let currentwishitem = 0

const ProductListingScreen = ({ navigation, route }: StackPropsType<"ProductListing">) => {
    const { searchText } = route.params
    const { emptyFilterData } = useSelector(
        (state: RootState) => state.homeSlice
      );
      const { isSkeleton, skeletonName } = useSelector(
        (state: RootState) => state.loaderSlice
      );
      const dispatch = useDispatch<AppDispatch>();
      const [productList, setProductList] = useState<ProductItem[] | any>([])
      const [numOfItems, setNumOfItems] = useState(0)  
      const [attributeData, setAttributeData] = useState<any>();
      const [shortedIndex, setShortedIndex] = useState(0)
    useEffect(() => {
      if (searchText.length > 0) {
        dispatch(addRecentSearch(searchText))
       }
        dispatch(getAttributeList({ body: undefined }))
        .unwrap()
        .then((res: any) => {
          let resp = res?.data ? res.data : res;
          if (resp) {
            let newobj: any = []
            console.log('attribute data', resp);
            Object.keys(resp)?.forEach((item: any, index: number) => {
              console.log('attribute item', item);
              let newArr: any = []
              resp[item]?.data?.forEach((element: any) => {
               element = { ...element, isSelected: false }
               newArr.push(element)
              })
              newobj.push({
                id: index,
                name: resp[item]?.title,
                slug: item,
                type: "multiCheck",
                items: newArr
              })
            })
            newobj.push({
              id: newobj?.length,
              name: "Price Range",
              type: "range",
              slug: "price",
              items: [{ min: 1, max: 2000 }]
            })
            dispatch(setEmptyFilterData(newobj))
            // setAttributeOldData(newobj)
            setAttributeData(newobj)
            getProductsWithFilter(newobj, 0)
            // const latestObj =  _.assign(newobj,resp)
            // setTimeout(() => {
            //   console.log('attribute new obj', newobj);
            // }, 2000);
            
            // setSubCategoryList(res?.data?.data)
          }
        });
    },[]);

    const prepareFilterData = (attributeDataTemp: any, sortIndex?: number) => {
        let body: any = {
          search: searchText,
         //  sortby: sortIndex ? sortItemsData[sortIndex]?.slug : sortItemsData[shortedIndex]?.slug
        };
        if (sortIndex && sortIndex > 0) {
          body= {
            ...body,
            sortby: sortIndex ? sortItemsData[sortIndex]?.slug : sortItemsData[shortedIndex]?.slug
          }
        }
        attributeDataTemp?.forEach((item: any) => {
        //   if(item?.slug === "suitable") {
        //     body = { ...body, 
        //        [item.slug] : [suitableItem.id],
        //     }
        //   }
           if(item?.slug === "price") {
            body = { ...body,
              start_price: item?.items[0].min,
              end_price: item?.items[0].max,
            }
          } else if (item?.slug === "category") {
            if (item?.items?.some((item: any ) => item.isSelected)) {
              let catArr = []
              let subArr: any[] = []
              item?.items?.forEach((item1: any ) => {
                if (item1.isSelected) {
                  // catArr.push(item1.id)
                  item1?.sub_category?.forEach((item2: any) => {
                    if (item2.isSelected) {
                      subArr.push(item2.id)
                    }
                  })
                 }
              })
              body = { ...body, 
                subcategory : subArr,
             }
            }
          } else {
            if (item?.items?.some((item: any ) => item.isSelected)) {
              let filterArr: any[] = []
              item?.items?.forEach((item1: any ) => {
                if (item1.isSelected) {
                  filterArr.push(item1.id)
                 }
              })
              body = { ...body, 
                [item.slug] : filterArr,
             }
            }
          }
        })
        return body;
    }
  
    const getProductsWithFilter = (attributeDataTemp: any, sortIndex?: number) => {
      current_page = 1
      last_page = 1
      const bodyData = prepareFilterData(attributeDataTemp, sortIndex)
      console.log(" filter body data", bodyData)
      dispatch(getProductList({ body: bodyData }))
        .unwrap()
        .then((res: any) => {
          console.log('product data', res);
          let resp = res?.data ? res.data : res;
          if (resp.last_page) {
            last_page = resp.last_page
          }
          if (resp?.data) {
            setNumOfItems(resp?.total)
            console.log('product filter data', resp?.data, resp?.total);
            setProductList(resp.data)
          }
        })
    }
  
    const onClearFilter = () => {
      setAttributeData(emptyFilterData)
      getProductsWithFilter(emptyFilterData, shortedIndex)
    }

    const onApplyFilter = (attributeDataTemp: any) => {
        setAttributeData(attributeDataTemp)
        getProductsWithFilter(attributeDataTemp, shortedIndex)
    }

    const onSortSelection = (index: number) => {
        setShortedIndex(index)
        getProductsWithFilter(attributeData, index)
    }

    const getProductListPagination = () => {
      if (!isSkeleton && current_page < last_page) {
      
        let body = prepareFilterData(attributeData, shortedIndex)
        dispatch(getProductList({ body: body, page: current_page + 1 }))
        .unwrap()
        .then((res: any) => {
          let resp = res?.data ? res.data : res;
          if (resp?.data) {
            current_page = current_page + 1
            console.log('pagination data', resp?.data);
            setProductList([ ...productList, ...resp?.data])
          }
        })
      }
    }

    const addItemToWishlist = (productId: number) => {
        currentwishitem = productId
        let body = {
          product_id: productId
        }
        dispatch(addToWishList({ body: body }))
        .unwrap()
        .then((res: any) => {
          if (res?.message) {
            showToast(res?.message, "success")
          }
          currentwishitem = 0
          let resp = res?.data ? res.data : res;
          let newProductArr: ProductItem[] | any = []
          productList?.forEach((e: ProductItem) => {
            let newObj = {...e}
            console.log('added to wishlist data', resp.product_id, newObj.id);
            if (newObj.id?.toString() === resp?.product_id) {
              console.log("in if", resp.product_id, newObj.id);
            newObj.is_wishlist = true
            }
            newProductArr.push(newObj)
          });
          setProductList(newProductArr)
          
        })
      }
    
      const removeItemToWishlist = (productId: number) => {
        currentwishitem = productId
        dispatch(removeFromList({id :productId, isSkeleton: true}))
                .unwrap()
                .then((res: any) => {
                  if (res?.message) {
                    showToast(res?.message, "success")
                  }
                  currentwishitem = 0
          let resp = res?.data ? res.data : res;
          let newProductArr: ProductItem[] | any = []
          productList?.forEach((e: ProductItem) => {
            let newObj = {...e}
            console.log('removed wishlist data', resp);
            if (newObj.id === productId) {
              console.log("in if", resp.product_id, newObj.id);
            newObj.is_wishlist = false
            }
            newProductArr.push(newObj)
          });
          setProductList(newProductArr)
                  
                })
      }

    const renderProductItem = (item: ProductItem, index: number) => (
        <>{skeletonName.includes("productList") ? productSkeleton() : 
        <CustomProductCard
          onItemPress={() => navigate(screens.PRODUCTDETAIL, { product: item })}
          itemImage={item.product_image}
          itemName={item.product_name}
          prize={item.price?.toString()}
          size={item.size.name}
          sellerName={item.seller.first_name + " " + item.seller.last_name}
          showHeart
          isNewArrival={item.is_fresh}
          onHeartPress={() => item?.is_wishlist ? removeItemToWishlist(item.id) : addItemToWishlist(item.id)}
          isWishlist={item?.is_wishlist}
          wishLoader={(skeletonName.includes("addToWishList") || skeletonName.includes("removeFromList")) && currentwishitem === item.id}
        />
    }
        </>
      );

    const renderProducts = () => (
        <View
          style={{
            width: '100%',
            paddingHorizontal: CommonStyleConstants.commonScreenPadding,
          }}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={skeletonName.includes("productList") ? SkeletonData : productList}
            contentContainerStyle={styles.flatItemContainer}
            keyExtractor={item => item.id.toString()}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            renderItem={({item, index}) => renderProductItem(item, index)}
            ListEmptyComponent={() => (
              <>{skeletonName.length === 0 && <CustomEmptyView text={LABELS.HomeScreen.noProductsAvailable} />}</>
            )}
            ListFooterComponent={() => current_page < last_page && productList?.length > 0 && loadMoreView(() => getProductListPagination(), skeletonName.includes("productListPagination"))}
          />
        </View>
      );

    //   const renderBottomView = () => (
    //     <View style={styles.bottomView}>
    //       <TouchableOpacity
    //         onPress={() => {
    
    //         //    setIsFilter(false), setShowBottomSheet(true);
    //         }}
    //         style={[styles.bottomButton, styles.borderRight]}>
    //         <Image source={images.sortIcon} />
    //         <Text style={styles.buttonName}>{LABELS.COMMON_LABELS.sort}</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         onPress={() => {
    //             setIsFilter(true), setShowBottomSheet(true);
    //          // setAttributeData(attributeOldData),setIsFilter(true), setShowBottomSheet(true);
    //         }}
    //         style={styles.bottomButton}>
    //         <Image source={images.filterIcon} />
    //         <Text style={styles.buttonName}>{LABELS.COMMON_LABELS.filter}</Text>
    //       </TouchableOpacity>
    //     </View>
    //   );
        
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
        <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={searchText}
        subTitle={numOfItems + " Items"}
        rightView={() => (
            <TouchableOpacity onPress={() => goBack()} >
                <Image style={{ height: screenScale(28), width: screenScale(28) }} source={images.searchIcon} tintColor={Colors.primaryText} />
            </TouchableOpacity>
        )}
        showBack
      />
      {/* <View style={{ flex:1 }}> */}
        {renderProducts()}
        {/* {renderBottomView()} */}
        <CustomFilterModal 
            // showBottomSheet={showBottomSheet}
            // isFilter={isFilter}
            attributeData={attributeData}
            onSortSelection={(index) => onSortSelection(index)}
            onApplyFilter={(attributeDataTemp) => onApplyFilter(attributeDataTemp)}
            onClearFilter={() => onClearFilter()}
        />
      {/* </View> */}
      </CustomScreen>
    );
  };
  
  export default ProductListingScreen;