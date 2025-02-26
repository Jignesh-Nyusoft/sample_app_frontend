import {useEffect, useState} from 'react';
import {StackPropsType, tabStackProps} from '../../navigation/NavigationProps';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomScreen} from '../../components/CustomScreen';
import CustomHeader from '../../components/CustomHeader';
import {goBack, navigate} from '../../navigation/RootNavigationFunctions';
import {Colors} from '../../theme';
import {LABELS} from '../../locales/common';
import styles from './SellerInfoScreenStyle';
import images from '../../theme/imageIndex';
import {dummyItemsData, dummyProductData} from '../../utils/dummyData';
import {CommonStyleConstants, CommonStyleSheets} from '../../utils/CommonStyle';
import CustomButton from '../../components/CustomButton';
import ReadMore from '@fawazahmed/react-native-read-more';
import {CustomTopTab} from '../../components/CustomTopTab';
import {CustomProductCard} from '../../components/CustomProductCard';
import screens from '../../navigation/NavigationScreens';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { getSellerInfo } from '../../redux/actions/homeActions';
import { ProductItem, ReviewItem, SellerDetails } from '../../redux/types/homeTypes';
import { SkeletonData } from '../../utils/commonData';
import { customCommonSeketon, productSkeleton } from '../../utils/CommonSkeletons';
import { addToWishList, removeFromList } from '../../redux/actions/wishlistActions';
import { getTimeEstimatedString, showToast } from '../../utils/CommonFunctions';
import { screenScale } from '../../utils/scaling';

let currentwishitem = 0

const SellerInfoScreen = ({navigation, route}: StackPropsType<'SellerInfo'>) => {
  const [current, setCurrent] = useState('Closet');
  const { sellerId } = route.params;
  const {isSkeleton, skeletonName} = useSelector(
    (state: RootState) => state.loaderSlice,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [sellerData, setSellerData] = useState<SellerDetails>()
  const [closetData, setClosetData] = useState<ProductItem[] | any>()
  const [reviewsData, setReviewsData] = useState<ReviewItem[] | any>()
  useEffect(() => {
    console.log(' seller id ::', sellerId);
    if (sellerId) {
      dispatch(getSellerInfo(sellerId))
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        if (resp) {
          setSellerData(resp?.seller);
          setClosetData(resp?.product?.data);
          setReviewsData(resp?.reviews?.data);
          console.log(' seller dertails ::', resp?.seller, resp?.product);
        }
      });
    }
  }, [route]);

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
      let newDetails = {...closetData}
      closetData?.forEach((e: ProductItem) => {
        let newObj = {...e}
        console.log('added to wishlist data', resp.product_id, newObj.id);
        if (newObj.id?.toString() === resp?.product_id) {
          console.log("in if", resp.product_id, newObj.id);
        newObj.is_wishlist = true
        }
        newProductArr.push(newObj)
      });
      setClosetData(JSON.parse(JSON.stringify(newProductArr)))
      
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
      let newDetails = {...closetData}
      closetData?.forEach((e: ProductItem) => {
        let newObj = {...e}
        console.log('removed wishlist data', resp);
        if (newObj.id === productId) {
          console.log("in if", resp.product_id, newObj.id);
        newObj.is_wishlist = false
        }
        newProductArr.push(newObj)
      });
      setClosetData(JSON.parse(JSON.stringify(newProductArr)))
              
            })
  }

  const renderSellerDetails = () => (
    <View style={styles.sellerMainView}>
      <View style={styles.sellerDetailView}>
        <Image
          style={styles.sellerImage}
          source={sellerData?.user_image ? { uri: sellerData?.user_image } : images.emptyUser}
        />
        <View style={styles.sellerMiddle}>
          <Text style={styles.sellerName}>
            {sellerData?.first_name + ' ' +sellerData?.last_name}
          </Text>
          <View style={styles.sellerLocationView}>
            <Image source={images.locationIcon} />
            <Text style={styles.sellerLocationText}>
              {sellerData?.pickpaddress?.city}
            </Text>
          </View>
        </View>
        <Image style={styles.reverseInfo} source={images.reverseInfo} />
      </View>
      <View style={styles.reviewsView}>
        <Image source={images.starIcon} />
        <Text style={styles.reviewsText}>
          {sellerData?.total_rating?.rating === 0 ? "0.00" : parseFloat(sellerData?.total_rating?.rating).toFixed(2)}
        </Text>
        <View style={styles.singledot} />
        <Text style={styles.reviewsText}>
          {sellerData?.total_rating?.review_count +
            ' ' +
            LABELS.ProductDetailScreen.reviews}
        </Text>
      </View>
      <ReadMore
        numberOfLines={3}
        seeMoreText={LABELS.SellerInfoScreen.readMore}
        seeLessText={LABELS.SellerInfoScreen.readLess}
        seeMoreStyle={styles.readMoreText}
        seeLessStyle={styles.readMoreText}
        style={styles.sellerText}>
        {sellerData?.bio}
      </ReadMore>
      {/* <Text style={{ flexDirection: 'row' }} >
            <Text numberOfLines={3} style={styles.sellerText}>{dummyProductData.sellerInfo.sellerText}</Text>
            <Text style={styles.readMoreText}>{LABELS.SellerInfoScreen.readMore}</Text>
          </Text> */}
      {/* <CustomButton
        title={LABELS.SellerInfoScreen.message}
        customStyle={styles.message}
        onPress={() => {}}
        /> */}
    </View>
  );

  const renderTopTabs = () => (
    <CustomTopTab
      onPress={(route: any) => {
        setCurrent(route), console.log('route data', route);
      }}
      selectedTab={current}
      options={[
        LABELS.SellerInfoScreen.closet,
        LABELS.ProductDetailScreen.reviews,
      ]}
    />
  );

  const renderCloset = () => (
    <View>
      <View style={styles.closetTopView}>
        <Text style={styles.closetTitle}>
          {LABELS.SellerInfoScreen.Products}
        </Text>
        {/* <View style={styles.topButtonsView}>
          <TouchableOpacity style={styles.singleButtonView}>
            <Image style={styles.buttonImage} source={images.sortIcon} />
            <Text style={styles.buttonText}>{LABELS.COMMON_LABELS.sort}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.singleButtonView}>
            <Image style={styles.buttonImage} source={images.filterIcon} />
            <Text style={styles.buttonText}>{LABELS.COMMON_LABELS.filter}</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      {renderProducts()}
    </View>
  );

  const renderProducts = () => (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 0,
      }}>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={skeletonName.includes("sellerDetails") ? SkeletonData :  closetData}
        contentContainerStyle={styles.flatItemContainer}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item, index}) => renderProductItem(item, index)}
      />
    </View>
  );

  const renderProductItem = (item: ProductItem, index: number) => (
    <>{skeletonName.includes("sellerDetails") ? productSkeleton() :
    <CustomProductCard
      onItemPress={() => navigate(screens.PRODUCTDETAIL, {product: item})}
      itemImage={item.product_image}
      itemName={item.product_name}
      prize={item.price?.toString()}
      size={item.size_id.toString()}
      sellerName={sellerData?.first_name + ' ' + sellerData?.last_name}
      showHeart
      isNewArrival={item.is_fresh}
      onHeartPress={() => item?.is_wishlist ? removeItemToWishlist(item.id) : addItemToWishlist(item.id)}
          isWishlist={item?.is_wishlist}
          wishLoader={(skeletonName.includes("addToWishList") || skeletonName.includes("removeFromList")) && currentwishitem === item.id}
    />}
    </>
  );

  const renderReviews = () => (
    <View>
      <View style={styles.reviewsTop}>
        <Image source={images.starIcon} style={styles.starStyle} />
        <Text style={styles.reviewsTextBig}>
          {sellerData?.total_rating?.rating === 0 ? "0.00" : parseFloat(sellerData?.total_rating?.rating).toFixed(2)}
        </Text>
        <View style={styles.singledotBig} />
        <Text style={styles.reviewsTextBig}>
          {sellerData?.total_rating?.review_count +
            ' ' +
            LABELS.ProductDetailScreen.reviews}
        </Text>
      </View>
      {renderReviewList()}
    </View>
  );

  const renderReviewList = () => (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={skeletonName.includes("sellerDetails") ? SkeletonData : reviewsData}
      // contentContainerStyle={styles.flatItemContainer}
      keyExtractor={item => item.id.toString()}
      renderItem={({item, index}) => renderReviewListItem(item, index)}
    />
  );

  const renderReviewListItem = (item: ReviewItem, index: number) => (
    <>{skeletonName.includes("sellerDetails") ? customCommonSeketon(screenScale(150), '100%') :
    <View style={styles.listItemView}>
      <View style={styles.reviewDetailView}>
        <Image
          style={styles.sellerImage}
          source={item.review_given_by_user?.user_image ? { uri: item.review_given_by_user?.user_image } : images.emptyUser}
        />
        <View style={styles.sellerMiddle}>
          <Text style={styles.sellerName}>
            {item.review_given_by_user?.first_name + " " + item.review_given_by_user?.last_name}
          </Text>
          <View style={styles.sellerLocationView}>
            <Text style={styles.sellerLocationText}>
              {getTimeEstimatedString(item?.created_at)}
            </Text>
          </View>
        </View>
        <View style={styles.ratingView}>
          <Image source={images.starIcon} />
          <Text style={styles.reviewsText}>
            {item.rating?.toFixed(2)}
          </Text>
        </View>
      </View>

      <ReadMore
        numberOfLines={3}
        seeMoreText={LABELS.SellerInfoScreen.readMore}
        seeLessText={LABELS.SellerInfoScreen.readLess}
        seeMoreStyle={styles.readMoreText}
        seeLessStyle={styles.readMoreText}
        style={styles.sellerText}>
        {item?.review}
      </ReadMore>
      {item?.review_images && renderReviewImages(item?.review_images)}
    </View>
    }
    </>
  );

  const renderReviewImages = (images: any[]) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} >
      {images.map((item, index) => (
        <Image style={styles.reviewImage} source={{ uri: item?.review_image }} />
      ))}
    </View>
  )

  return (
    <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
      <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={LABELS.SellerInfoScreen.sellerInfo}
        showBack
      />
      <ScrollView style={CommonStyleSheets.commonMainView}>
        {skeletonName.includes("sellerDetails") ? customCommonSeketon(screenScale(165), '100%') : renderSellerDetails()}
        {renderTopTabs()}
        {current === 'Closet' ? renderCloset() : renderReviews()}
      </ScrollView>
    </CustomScreen>
  );
};

export default SellerInfoScreen;
