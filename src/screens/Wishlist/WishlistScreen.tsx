import {useEffect, useState} from 'react';
import {StackPropsType, tabStackProps} from '../../navigation/NavigationProps';
import {
  FlatList,
  View,
} from 'react-native';
import {CustomScreen} from '../../components/CustomScreen';
import CustomHeader from '../../components/CustomHeader';
import {Colors} from '../../theme';
import {LABELS} from '../../locales/common';
import styles from './WishlistScreenStyle';
import {CommonStyleConstants} from '../../utils/CommonStyle';
import {CustomProductCard} from '../../components/CustomProductCard';
import {goBack, navigate} from '../../navigation/RootNavigationFunctions';
import screens from '../../navigation/NavigationScreens';
import {AppDispatch, RootState} from '../../redux/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {getWishList, removeFromList} from '../../redux/actions/wishlistActions';
import {CustomEmptyView} from '../../components/CustomEmptyView';
import {loadMoreView, productSkeleton} from '../../utils/CommonSkeletons';
import {setDialogData} from '../../redux/reducers/AlertReducer/alertSlice';
import {showToast} from '../../utils/CommonFunctions';
import {WishlistProduct} from '../../redux/types/wishlistTypes';
import {SkeletonData} from '../../utils/commonData';
import {useIsFocused} from '@react-navigation/native';

let current_page = 1;
let last_page = 1;

const WishListScreen = ({navigation}: StackPropsType<'WishList'>) => {
  const {isSkeleton, skeletonName} = useSelector(
    (state: RootState) => state.loaderSlice,
  );
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[] | any>(
    [],
  );
  useEffect(() => {
    if (isFocused) {
      current_page = 1;
      last_page = 1;
      dispatch(getWishList())
        .unwrap()
        .then((res: any) => {
          let resp = res?.data ? res.data : res;
          if (resp.last_page) {
            last_page = resp.last_page;
          }
          if (resp) {
            console.log('wishlist data', resp);
            setWishlistItems(resp);
          }
        });
    }
  }, [isFocused]);

  const getWishListPagination = () => {
    if (!isSkeleton && current_page < last_page) {
      dispatch(getWishList(current_page + 1))
        .unwrap()
        .then((res: any) => {
          let resp = res?.data ? res.data : res;
          if (resp.last_page) {
            last_page = resp.last_page;
          }
          if (resp?.data) {
            current_page = current_page + 1;
            console.log('wishlist pagination data', resp?.data);
            setWishlistItems([...wishlistItems, ...resp?.data]);
          }
        });
    }
  };

  const removeItemToWishlist = (product_id: number) => {
    dispatch(
      setDialogData({
        isVisible: true,
        title: LABELS.WishListScreen.removeItem,
        description: LABELS.WishListScreen.sureRemove,
        onDone: () => {
          dispatch(removeFromList({id: product_id, isSkeleton: false}))
            .unwrap()
            .then((res: any) => {
              if (res?.message) {
                showToast(res?.message, 'success');
              }
              let newProductArr: WishlistProduct[] | any = [];
              wishlistItems?.forEach((e: WishlistProduct) => {
                let newObj = {...e};
                if (newObj.product_id !== product_id) {
                  newProductArr.push(newObj);
                }
              });
              setWishlistItems(newProductArr);
            });
        },
        onCancel: () => {},
      }),
    );
  };

  const renderProducts = () => (
    <View
      style={{
        width: '100%',
        paddingHorizontal: CommonStyleConstants.commonScreenPadding,
      }}>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={skeletonName.includes('wishList') ? SkeletonData : wishlistItems}
        contentContainerStyle={styles.flatItemContainer}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item, index}) => renderProductItem(item, index)}
        ListEmptyComponent={() => (
          <CustomEmptyView text={LABELS.HomeScreen.noProductsAvailable} />
        )}
        ListFooterComponent={() =>
          current_page < last_page &&
          loadMoreView(
            () => getWishListPagination(),
            skeletonName.includes('wishListPagination'),
          )
        }
      />
    </View>
  );

  const renderProductItem = (item: WishlistProduct, index: number) => (
    <>
      {skeletonName.includes('wishList') ? (
        productSkeleton()
      ) : (
        <CustomProductCard
          onItemPress={() =>
            navigate(screens.PRODUCTDETAIL, {product: item?.product})
          }
          itemImage={item.product.product_image}
          itemName={item.product.product_name}
          prize={item.product.price?.toString()}
          size={item.product.size.name}
          sellerName={
            item.product.seller.first_name + ' ' + item.product.seller.last_name
          }
          showCross
          onCrossPress={() => removeItemToWishlist(item.product_id)}
        />
      )}
    </>
  );

  return (
    <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
      <CustomHeader
        container={{backgroundColor: Colors.white}}
        title={LABELS.WishListScreen.myWishList}
        showBack
        goBack={() => goBack()}
      />
      <View style={styles.mainView}>{renderProducts()}</View>
    </CustomScreen>
  );
};

export default WishListScreen;
