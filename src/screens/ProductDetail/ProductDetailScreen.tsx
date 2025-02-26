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
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {goBack, navigate} from '../../navigation/RootNavigationFunctions';
import CustomHeader from '../../components/CustomHeader';
import Swiper from 'react-native-swiper';
import {dummyItemsData, dummyProductData} from '../../utils/dummyData';
import styles from './ProductDetailScreenStyle';
import {screenScale} from '../../utils/scaling';
import LinearGradient from 'react-native-linear-gradient';
import {LABELS} from '../../locales/common';
import images from '../../theme/imageIndex';
import {CustomProductCard} from '../../components/CustomProductCard';
import screens from '../../navigation/NavigationScreens';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {getProductDetails} from '../../redux/actions/homeActions';
import {BannerItem, ProductItem, ProductItemDetail} from '../../redux/types/homeTypes';
import { addToWishList, removeFromList } from '../../redux/actions/wishlistActions';
import { getTimeEstimatedString, isIOS, showToast } from '../../utils/CommonFunctions';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FastImage from 'react-native-fast-image';
import { CustomEmptyView } from '../../components/CustomEmptyView';

let currentwishitem = 0

const ProductDetailScreen = ({
  navigation,
  route,
}: StackPropsType<'ProductDetail'>) => {
  const {product, isFrom} = route.params;
  const {emptyFilterData} = useSelector((state: RootState) => state.homeSlice);
  const {profileData} = useSelector((state: RootState) => state.profileSlice);
  const {isSkeleton, skeletonName} = useSelector(
    (state: RootState) => state.loaderSlice,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [productDetails, setProductDetails] = useState<ProductItemDetail>();

  useEffect(() => {
    dispatch(getProductDetails(product.id))
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        if (resp) {
          setProductDetails(resp);
        }
      });
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
      let newDetails = {...productDetails}
      productDetails?.related_products?.forEach((e: ProductItem) => {
        let newObj = {...e}
        if (newObj.id?.toString() === resp?.product_id) {
        newObj.is_wishlist = true
        }
        newProductArr.push(newObj)
      });
      if (newDetails) {
        newDetails.related_products = newProductArr
      }
      setProductDetails(JSON.parse(JSON.stringify(newDetails)))
      
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
      let newDetails = {...productDetails}
      productDetails?.related_products?.forEach((e: ProductItem) => {
        let newObj = {...e}
        if (newObj.id === productId) {
        newObj.is_wishlist = false
        }
        newProductArr.push(newObj)
      });
      if (newDetails) {
        newDetails.related_products = newProductArr
      }
      setProductDetails(JSON.parse(JSON.stringify(newDetails)))
              
            })
  }

  const onMessageSeller = () => {
    let newChatId = `chat_${productDetails?.id}_${profileData?.id}_${productDetails?.seller?.id}`
    console.log(" created chatid =>", newChatId)
    navigate(screens.CHAT, { chatId: newChatId, currentUser: profileData, otherUser: productDetails?.seller, product: productDetails })
  }

  const renderImages = () => (
    <SkeletonPlaceholder enabled={skeletonName.includes("productDetails")}>
    <View style={{height: screenScale(412), width: '100%'}}>
     {productDetails?.product_images && productDetails?.product_images?.length > 0 ?
    <Swiper
            paginationStyle={styles.pagination}
            activeDotColor={Colors.white}
            dotColor={Colors.white50}
            style={styles.wrapper}
            dotStyle={styles.dot}
            activeDotStyle={styles.selectedDot}
            showsButtons={false}>
            {productDetails?.product_images?.map((item: any , index: number) => (
                <View key={item.id} style={styles.slideImage}>
                 <FastImage
                  source={{ uri: item.image }}
                  style={{
                    width: '100%',
                    height: screenScale(393),
                    justifyContent: 'flex-end',
                  }}>
                  <LinearGradient
                    colors={['#00000000', 'rgba(0,0,0,0.4)']}
                    style={{height: '30%', width: '100%'}}></LinearGradient>
                </FastImage>
              </View>
            ))}
          </Swiper>
        :
        <View style={styles.slideImage}>
               <ImageBackground
                  source={images.noImage}
                  style={{
                    width: '100%',
                    height: screenScale(393),
                    justifyContent: 'flex-end',
                  }}></ImageBackground>
              </View>  
        }
          </View>
          </SkeletonPlaceholder>
  );

  const renderDetails = () => (
    <>
      <View style={styles.textinfo}>
        <Text style={styles.productName}>{product?.product_name}</Text>
        <Text style={styles.productPrize}>{"$" + product?.price}</Text>
        <Text style={styles.productSize}>{"Size " +  product?.size?.name}</Text>
      </View>
      <SkeletonPlaceholder enabled={skeletonName.includes("productDetails")}>
      <View style={styles.moreInfoView}>
        <View style={styles.moreInfoRow}>
          <View style={styles.moreInfoHalf}>
            <Text style={styles.moreInfoTitle}>
              {LABELS.ProductDetailScreen.condition}
            </Text>
            <Text style={styles.moreInfoSubtext}>
              {productDetails?.condition?.name || "New"}
            </Text>
          </View>
          <View style={styles.moreInfoHalf}>
            <Text style={styles.moreInfoTitle}>
              {LABELS.ProductDetailScreen.color}
            </Text>
            <Text style={styles.moreInfoSubtext}>{productDetails?.color.name}</Text>
          </View>
        </View>
        <View style={styles.moreInfoRow}>
          <View style={styles.moreInfoHalf}>
            <Text style={styles.moreInfoTitle}>
              {LABELS.ProductDetailScreen.paymentOptions}
            </Text>
            <Text style={styles.moreInfoSubtext}>
              {isIOS() ? "Bank Cards / ApplePay" : "Bank Cards"}
            </Text>
          </View>
          <View style={styles.moreInfoHalf}>
            <Text style={styles.moreInfoTitle}>
              {LABELS.ProductDetailScreen.uploadedOn}
            </Text>
            <Text style={styles.moreInfoSubtext}>
              {getTimeEstimatedString(productDetails?.created_at)}
            </Text>
          </View>
        </View>
        <Text style={styles.moreInfoTitle}>
          {LABELS.ProductDetailScreen.productDescription}
        </Text>
        <Text style={styles.moreInfoSubtext}>
          {productDetails?.description}
        </Text>
      </View>
      </SkeletonPlaceholder>
    </>
  );

  const renderSellerInfo = () => (
    <SkeletonPlaceholder enabled={skeletonName.includes("productDetails")}>
    <View style={styles.sellerMainView}>
      <Text style={styles.sellerTitle}>
        {LABELS.ProductDetailScreen.sellerInfo}
      </Text>
      <TouchableOpacity
        onPress={() => navigate(screens.SELLERINFO, { sellerId: productDetails?.seller.id })}
        style={styles.sellerDetailView}>
        <Image
          style={styles.sellerImage}
          source={productDetails?.seller.user_image ? { uri: productDetails?.seller.user_image } : images.emptyUser}
          defaultSource={images.emptyUser}
        />
        <View style={styles.sellerMiddle}>
          <Text numberOfLines={2} style={styles.sellerName}>
            {productDetails?.seller.first_name + " " + productDetails?.seller.last_name}
          </Text>
          <View style={styles.sellerLocationView}>
            <Image source={images.locationIcon} />
            <Text style={styles.sellerLocationText}>
              {productDetails?.seller?.pickpaddress?.city}
            </Text>
          </View>
        </View>
        <View style={styles.reviewsView}>
          <Image source={images.starIcon} />
          <Text style={styles.reviewsText}>
            {productDetails?.seller.total_rating?.rating === 0 ? "0.00" : parseFloat(productDetails?.seller.total_rating?.rating).toFixed(2)}
          </Text>
          <View style={styles.singledot} />
          <Text style={styles.reviewsText}>
            {productDetails?.seller.total_rating?.review_count +
              ' ' +
              LABELS.ProductDetailScreen.reviews}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
    </SkeletonPlaceholder>
  );

  const renderMoreFromSeller = () => (
    <>
      <Text style={styles.sellerTitle}>
        {LABELS.ProductDetailScreen.moreFromThisSelller}
      </Text>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={productDetails?.related_products}
        contentContainerStyle={styles.flatItemContainer}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        ListEmptyComponent={() => (
          <CustomEmptyView text={LABELS.MyProductsScreen.noProductsAvailable} />
        )}
        renderItem={({item, index}) => renderProductItem(item, index)}
      />
    </>
  );

  const renderProductItem = (item: ProductItem, index: number) => (
    <CustomProductCard
      itemImage={item.product_image}
      itemName={item.product_name}
      prize={item.price?.toString()}
      size={item.size.name}
      sellerName={productDetails?.seller.first_name + ' ' + productDetails?.seller.last_name}
      showHeart
      onItemPress={() => navigation.push("ProductDetail", {product: item})}
          isNewArrival={item.is_fresh}
          onHeartPress={() => item?.is_wishlist ? removeItemToWishlist(item.id) : addItemToWishlist(item.id)}
          isWishlist={item?.is_wishlist}
          wishLoader={(skeletonName.includes("addToWishList") || skeletonName.includes("removeFromList")) && currentwishitem === item.id}
    />
  );

  const renderBottomView = () => (
    <View style={styles.filterBottom}>
      <CustomButton
        disable={skeletonName?.length > 0}
        title={LABELS.ProductDetailScreen.messageSeller}
        isLeftButton
        customStyle={{width: '45%'}}
        onPress={() => onMessageSeller()}
      />
      <CustomButton
        disable={skeletonName?.length > 0 || (productDetails?.seller?.is_seller_details_pending === 1 || productDetails?.seller?.pickup_address_available === 0)}
        title={LABELS.ProductDetailScreen.buyNow}
        customStyle={{width: '45%'}}
        onPress={() => navigate(screens.MY_CART, { product: productDetails})}
      />
    </View>
  );

  const renderBottomForMyProducts = () => (
    <>
    <View style={styles.filterBottom}>
      <CustomButton
        title={LABELS.ProductDetailScreen.editProduct}
        // customStyle={{width: '45%'}}
        onPress={() => navigate(screens.ADD_NEW_PRODUCT, { product: productDetails })}
      />
    </View>
    </>
  );

  return (
    <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
      <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={product.product_name}
        showBack
      />
      <ScrollView style={{ width: '100%' }} >
        {renderImages()}
        <View style={styles.belowImageView}>
          {renderDetails()}
          {isFrom==="MyProducts" ? <></> : renderSellerInfo()}
          {isFrom==="MyProducts" ? <></> : renderMoreFromSeller()}
        </View>
      </ScrollView>
      {isFrom==="MyProducts" ? renderBottomForMyProducts() :renderBottomView()}
    </CustomScreen>
  );
};

export default ProductDetailScreen;
