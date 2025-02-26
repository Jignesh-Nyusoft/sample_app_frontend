import {useEffect, useState} from 'react';
import {StackPropsType, tabStackProps} from '../../navigation/NavigationProps';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomScreen} from '../../components/CustomScreen';
import styles from './HomeScreenStyle';
import CustomHeader from '../../components/CustomHeader';
import images from '../../theme/imageIndex';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, fontSize} from '../../theme';
import CustomSearchBar from '../../components/CustomSearchBar';
import {screenScale} from '../../utils/scaling';
import {LABELS} from '../../locales/common';
import Swiper from 'react-native-swiper';
import {CustomProductCard} from '../../components/CustomProductCard';
import {navigate} from '../../navigation/RootNavigationFunctions';
import screens from '../../navigation/NavigationScreens';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { getAttributeList, getBannerList, getCategoryList, getFreshFindsList, getSuitableList } from '../../redux/actions/homeActions';
import { BannerItem, Category, ProductItem, SuitableItem } from '../../redux/types/homeTypes';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { CustomSkeleton } from '../../components/CustomSkeleton';
import { SkeletonData } from '../../utils/commonData';
import { loadMoreView, productSkeleton } from '../../utils/CommonSkeletons';
import { CustomEmptyView } from '../../components/CustomEmptyView';
import CustomButton from '../../components/CustomButton';
import { addToWishList, removeFromList } from '../../redux/actions/wishlistActions';
import { showToast } from '../../utils/CommonFunctions';
import FastImage from 'react-native-fast-image';
import { getProfileData } from '../../redux/actions/profileActions';
import { useIsFocused } from '@react-navigation/native';

const dummyBannerData = [
  {
    id: 1,
    image: require('../../assets/dummy/homeBanner.png'),
  },
  {
    id: 2,
    image: require('../../assets/dummy/homeBanner.png'),
  },
  {
    id: 3,
    image: require('../../assets/dummy/homeBanner.png'),
  },
  {
    id: 4,
    image: require('../../assets/dummy/homeBanner.png'),
  },
];

const dummyCategoryData = [
  {
    id: 1,
    name: 'Women',
    image: require('../../assets/dummy/cat2.png'),
  },
  {
    id: 2,
    name: 'Men',
    image: require('../../assets/dummy/cat1.png'),
  },
  {
    id: 3,
    name: 'Kids',
    image: require('../../assets/dummy/cat3.png'),
  },
  {
    id: 4,
    name: 'Baby',
    image: require('../../assets/dummy/BabyNew.png'),
  },

];

const allItem = [{
  id: 0,
  name: "All",
}]

let last_page = 1
let current_page = 1
let currentwishitem = 0

const HomeScreen = ({navigation}: tabStackProps<'Home'>) => {
  const { userData } = useSelector(
    (state: RootState) => state.authSlice
  );
  const { categoryList, suitableList } = useSelector(
    (state: RootState) => state.homeSlice
  );
  const { isSkeleton, skeletonName } = useSelector(
    (state: RootState) => state.loaderSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState(0);
  const [productList, setProductList] = useState<ProductItem[] | any>();
  const [bannerList, setBannerList] = useState<BannerItem[] | any>();
  const isFocused = useIsFocused()

  useEffect(() => {
    console.log(" User Data", userData);
    dispatch(getBannerList())
    .unwrap()
    .then((res: any) => {
      let resp = res?.data ? res.data : res;
      setBannerList(resp)
      console.log('banner data', resp);
    })
    // Promise.all([
    dispatch(getSuitableList())
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        console.log('suitable data', resp);
      })
    dispatch(getCategoryList())
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        console.log('category data', resp);
      })
      dispatch(getAttributeList({ body: undefined }))
      .unwrap()
      .then((res: any) => {
      });
      dispatch(getProfileData())
        .unwrap()
        .then((res: any) => {
          let resp = res?.data ? res.data : res;
          console.log('profile data', resp);
        });
      // dispatch(getFreshFindsList({ body: undefined }))
      // .unwrap()
      // .then((res: any) => {
      //   let resp = res?.data ? res.data : res;
      //   if (resp?.data) {
      //     console.log('fresh finds data', resp?.data);
      //     setProductList(resp.data)
      //   }
      // })
    // ])
  }, [])

  useEffect(() => {
    // if(selectedSubCategory) {
      current_page = 1
      last_page = 1
      let body = undefined
      if (selectedSubCategory > 0) {
        const obj = [categoryList[selectedSubCategory -1].id]
        body = {
          category: obj
        }
      }
      console.log(" body fresh find", body)
      dispatch(getFreshFindsList({ body: body }))
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        if (resp.last_page) {
          last_page = resp.last_page
        }
        if (resp?.data) {
          console.log('fresh finds data', resp?.data);
          setProductList(resp.data)
        }
      })
    // }
  }, [selectedSubCategory])

  useEffect(() => {
    if (isFocused) {
      current_page = 1
      last_page = 1
      let body = undefined
      if (selectedSubCategory > 0) {
        const obj = [categoryList[selectedSubCategory -1].id]
        body = {
          category: obj
        }
      }
      console.log(" body fresh find", body)
      dispatch(getFreshFindsList({ body: body }))
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        if (resp.last_page) {
          last_page = resp.last_page
        }
        if (resp?.data) {
          console.log('fresh finds data', resp?.data);
          setProductList(resp.data)
        }
      })
    }
  },[isFocused])

  const getFreshListPagination = () => {
    if (!isSkeleton && current_page < last_page) {
    
    let body = undefined
      if (selectedSubCategory > 0) {
        const obj = [categoryList[selectedSubCategory -1].id]
        body = {
          category: obj
        }
      }
      dispatch(getFreshFindsList({ body: body, page: current_page + 1 }))
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        if (resp?.data) {
          current_page = current_page + 1
          console.log('fresh finds data', resp?.data);
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

  const renderBannerSkeleton = () => (
    <CustomSkeleton extras={{  }} >
      <View style={styles.slideImage} />
    </CustomSkeleton>
  )


  const renderSuitable = (item: SuitableItem, index: number) => (
    <>{skeletonName?.includes("suitableList") ? <SkeletonPlaceholder borderRadius={16} ><TouchableOpacity
      style={styles.categoryView}>
      <Image source={{}} style={styles.categoryImage} defaultSource={images.noImage} />
      <View style={styles.categoryBottom}>
        <Text style={styles.categoryText}>{item.name}</Text>
      </View>
    </TouchableOpacity></SkeletonPlaceholder> :
    <TouchableOpacity
      onPress={() => navigate(screens.SUBCATEGORIES, { suitableItem: item })}
      style={styles.categoryView}>
      <FastImage source={dummyCategoryData[index]?.image} style={styles.categoryImage} defaultSource={images.noImage} />
      <View style={styles.categoryBottom}>
        <Text style={styles.categoryText}>{item.name}</Text>
      </View>
    </TouchableOpacity>}
    </>
  );

  const renderSubCategory = (item: any, index: number) => (
    <>{skeletonName.includes("categoryList") ?
    <SkeletonPlaceholder borderRadius={16} enabled={true} ><TouchableOpacity
      onPress={() => setSelectedSubCategory(index)}
      style={{
         ...styles.subCategoryView,
        height: screenScale(32), width: screenScale(75),
      }}>
    </TouchableOpacity>
  </SkeletonPlaceholder>
  : 
  <TouchableOpacity
      onPress={() => setSelectedSubCategory(index)}
      style={[
        styles.subCategoryView,
        selectedSubCategory === index && {backgroundColor: Colors.primaryText},
      ]}>
      <Text
        style={[
          styles.categoryText,
          selectedSubCategory === index && {color: Colors.white},
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
      }
      </>
  );

  const renderProductItem = (item: ProductItem, index: number) => (
    <>{skeletonName.includes("freshFindList") ? productSkeleton()  : 
    <CustomProductCard
      itemImage={item.product_image}
      itemName={item.product_name}
      prize={item.price?.toString()}
      size={item.size.name}
      sellerName={item.seller.first_name + " " + item.seller.last_name}
      onItemPress={() => navigate(screens.PRODUCTDETAIL, {product: item})}
      showHeart
      isNewArrival={item.is_fresh}
      onHeartPress={() => item?.is_wishlist ? removeItemToWishlist(item.id) : addItemToWishlist(item.id)}
      isWishlist={item?.is_wishlist}
      wishLoader={(skeletonName.includes("addToWishList") || skeletonName.includes("removeFromList"))&& currentwishitem === item.id}
    />
  }
  </>
  );

  return (
    <CustomScreen customStyle={{alignItems: 'center'}}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.primary} />
      <CustomHeader
            showBack={false}
            container={{
              backgroundColor: Colors.primary,
              paddingHorizontal: screenScale(20),
              paddingTop: insets.top,
            }}
            leftView={() => (
              <Image
                source={images.appLogoGreen}
                style={{ height: screenScale(36), resizeMode: 'contain', tintColor: Colors.white, marginLeft: screenScale(-66)}}
              />
            )}
            rightView={() => (
              <View style={styles.headerRightView}>
                <TouchableOpacity onPress={() => navigate(screens.NOTIFICATION_LIST, {})} >
                  <Image
                    source={images.notificationIcon}
                    style={{resizeMode: 'contain', tintColor: Colors.white}}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity>
                  <Image
                    source={images.cartIcon}
                    style={{resizeMode: 'contain', tintColor: Colors.white}}
                  />
                  <View style={styles.countView}>
                    <Text style={styles.countText}>2</Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            )}
          />
      <ScrollView style={styles.mainScrollView} overScrollMode='never' bounces={false}>
        <View style={[styles.topView]}>
          <CustomSearchBar
            isEditable={false}
            onPressSearch={() => navigate(screens.SEARCH_PRODUCTS, {})}
            value={searchText}
            onChangeText={val => setSearchText(val)}
            placeholder={LABELS.HomeScreen.searchPlaceholder}
            customContainerStyle={styles.customSearch}
            customStyle={styles.customSearchMainView}
            placeholderTextColor={Colors.white50}
            textInputStyle={styles.customSearchTextInput}
          />
          {skeletonName.includes("bannerList") ? renderBannerSkeleton()
          : <>
          {bannerList?.length > 0 &&
          <Swiper
            paginationStyle={styles.pagination}
            activeDotColor={Colors.white}
            dotColor={Colors.white50}
            style={styles.wrapper}
            autoplay
            autoplayTimeout={3}
            showsButtons={false}>
            {bannerList?.map((item: BannerItem , index: number) => (
                <View key={item.id} style={styles.slideImage}>
                <FastImage
                  source={{ uri: item.banner_image, priority: FastImage.priority.high }}
                  resizeMode="cover"
                  style={{width: screenScale(353), height: screenScale(160), borderRadius: 16}}
                />
              </View>
            ))}
          </Swiper>}
          </>
          }
        </View>
        <View style={styles.categoryParent}>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.categoryTitle}>
            {LABELS.HomeScreen.shopTheLook}
          </Text>
          <Text onPress={() => navigate(screens.SEARCH_PRODUCTS, {})} style={[styles.categoryTitle, { color: Colors.primary, fontSize: fontSize.fontSize_extra_medium }]}>
            {LABELS.HomeScreen.seeMore}
          </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={skeletonName.includes("suitableList") ? SkeletonData : suitableList}
            contentContainerStyle={styles.flatContainer}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => renderSuitable(item, index)}
          />
        </View>
        <View style={styles.listingParent}>
          <Text style={styles.categoryTitle}>
            {LABELS.HomeScreen.freshFinds}
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={skeletonName?.includes("categoryList") ? SkeletonData : [ ...allItem, ...categoryList ]}
            contentContainerStyle={styles.flatContainer}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => renderSubCategory(item, index)}
          />
          <FlatList
            numColumns={2}
            data={skeletonName.includes("freshFindList") ? SkeletonData : productList }
            contentContainerStyle={styles.flatItemContainer}
            keyExtractor={item => item.id.toString()}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            renderItem={({item, index}) => renderProductItem(item, index)}
            ListEmptyComponent={() => (
              <CustomEmptyView text={LABELS.HomeScreen.noProductsAvailable} />
            )}
            ListFooterComponent={() => current_page < last_page && loadMoreView(() => getFreshListPagination(), skeletonName.includes("freshFindListPagination"))}
          />
        </View>
      </ScrollView>
    </CustomScreen>
  );
};

export default HomeScreen;
