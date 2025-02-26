import {useEffect, useState} from 'react';
import {StackPropsType, tabStackProps} from '../../navigation/NavigationProps';
import {
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomScreen} from '../../components/CustomScreen';
import CustomHeader from '../../components/CustomHeader';
import images from '../../theme/imageIndex';
import styles from './SubCategoriesScreenStyle';
import {goBack, navigate} from '../../navigation/RootNavigationFunctions';
import {Colors} from '../../theme';
import {CustomProductCard} from '../../components/CustomProductCard';
import {CommonStyleConstants} from '../../utils/CommonStyle';
import {LABELS} from '../../locales/common';
import {screenScale} from '../../utils/scaling';
import {CustomBottomSheet} from '../../components/CustomBottomSheet';
import {CustomRadio} from '../../components/CustomRadio';
import {SkeletonData, filterItems} from '../../utils/commonData';
import {dummyFilterData} from '../../utils/dummyData';
import {CustomFilterItem} from '../../components/CustomFilterItem';
import RangeSlider from 'rn-range-slider';
import {CustomRangeSlider} from '../../components/CustomRangeSlider';
import CustomButton from '../../components/CustomButton';
import screens from '../../navigation/NavigationScreens';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { getAttributeList, getCategoryList, getProductList, getSubCategoryList } from '../../redux/actions/homeActions';
import { AttributeList, Category, FilterBody, ProductItem, SubCategory } from '../../redux/types/homeTypes';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { CustomSkeleton } from '../../components/CustomSkeleton';
import { loadMoreView, productSkeleton, subCategorySkeleton } from '../../utils/CommonSkeletons';
import { CustomEmptyView } from '../../components/CustomEmptyView';
import _ from 'lodash';
import { setEmptyFilterData } from '../../redux/reducers/homeReducer/homeSlice';
import { showToast } from '../../utils/CommonFunctions';
import { addToWishList, removeFromList } from '../../redux/actions/wishlistActions';
import { CustomFilterModal } from '../../components/CustomFilterModal';

const dummySubCategoryData = [
  {
    id: 1,
    name: 'All',
  },
  {
    id: 2,
    name: 'Sweaters',
  },
  {
    id: 3,
    name: 'Jeans',
  },
  {
    id: 4,
    name: 'Hoodies',
  },
  {
    id: 5,
    name: 'Shirts',
  },
  {
    id: 6,
    name: 'Cargos',
  },
];

const dummyItemsData = [
  {
    id: 1,
    itemName: 'Style one year',
    itemImage: require('../../assets/dummy/Item1.png'),
    prize: '$ 12.03',
    size: '4 / S',
  },
  {
    id: 2,
    itemName: 'Style one year',
    itemImage: require('../../assets/dummy/Item1.png'),
    prize: '$ 12.03',
    size: '4 / S',
  },
  {
    id: 3,
    itemName: 'Style one year',
    itemImage: require('../../assets/dummy/Item1.png'),
    prize: '$ 12.03',
    size: '4 / S',
  },
  {
    id: 4,
    itemName: 'Style one year',
    itemImage: require('../../assets/dummy/Item1.png'),
    prize: '$ 12.03',
    size: '4 / S',
  },
  {
    id: 5,
    itemName: 'Style one year',
    itemImage: require('../../assets/dummy/Item1.png'),
    prize: '$ 12.03',
    size: '4 / S',
  },
  {
    id: 6,
    itemName: 'Style one year',
    itemImage: require('../../assets/dummy/Item1.png'),
    prize: '$ 12.03',
    size: '4 / S',
  },
  {
    id: 7,
    itemName: 'Style one year',
    itemImage: require('../../assets/dummy/Item1.png'),
    prize: '$ 12.03',
    size: '4 / S',
  },
  {
    id: 8,
    itemName: 'Style one year',
    itemImage: require('../../assets/dummy/Item1.png'),
    prize: '$ 12.03',
    size: '4 / S',
  },
  {
    id: 9,
    itemName: 'Style one year',
    itemImage: require('../../assets/dummy/Item1.png'),
    prize: '$ 12.03',
    size: '4 / S',
  },
  {
    id: 10,
    itemName: 'Style one year',
    itemImage: require('../../assets/dummy/Item1.png'),
    prize: '$ 12.03',
    size: '4 / S',
  },
];

const sortItems = [
  {
    id: 0,
    name: 'Relevance',
    selected: true,
    slug: 'relevance'
  },
  {
    id: 1,
    name: 'Newest First',
    selected: false,
    slug: 'Newest'
  },
  {
    id: 2,
    name: 'Price - Low to High',
    selected: false,
    slug: 'low-to-high'
  },
  {
    id: 3,
    name: 'Price - High to Low',
    selected: false,
    slug: 'high-to-low'
  },
];

const allItem = [{
  id: 0,
  name: "All",
}]

let last_page = 1
let current_page = 1
let currentwishitem = 0

const SubCategoriesScreen = ({navigation, route}: StackPropsType<'SubCategories'>) => {
  const { emptyFilterData } = useSelector(
    (state: RootState) => state.homeSlice
  );
  const { isSkeleton, skeletonName } = useSelector(
    (state: RootState) => state.loaderSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [sortData, setSortData] = useState(sortItems);
  const [selectedSort, setSelectedSort] = useState(0);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [filterData, setFilterData] = useState(filterItems);
  const [attributeData, setAttributeData] = useState<any>();
  const [attributeOldData, setAttributeOldData] = useState<any>();
  const [currentFilter, setCurrentFilter] = useState(2);
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [subCategoryList, setSubCategoryList] = useState<SubCategory[]>([])
  const [productList, setProductList] = useState<ProductItem[] | any>([])
  const [numOfItems, setNumOfItems] = useState(0)
  const { suitableItem, isFrom, category } = route.params;
  useEffect(() => {
    if (suitableItem?.id) {
      last_page = 1
      current_page = 1
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
          setAttributeOldData(newobj)
          setAttributeData(newobj)
          // const latestObj =  _.assign(newobj,resp)
          // setTimeout(() => {
          //   console.log('attribute new obj', newobj);
          // }, 2000);
          if (isFrom === "Explore") {
            let body = prepareFilterData(newobj,undefined, true, category.id)
            console.log(" select category explore:", category.id, categoryList)
            selectCategory(2, newobj, category.id)
            console.log(" filter body explore:", body, "attribute data", attributeData)
            dispatch(getProductList({ body: body }))
            .unwrap()
            .then((res: any) => {
              console.log('product items data', res);
              let resp = res?.data ? res.data : res;
              if (resp.last_page) {
                last_page = resp.last_page
              }
              if (resp?.data) {
                setNumOfItems(resp?.total)
                setProductList(resp.data)
              }
            })
          }
          
          // setSubCategoryList(res?.data?.data)
        }
      });
      dispatch(getCategoryList())
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        if (res?.data?.data) {
          console.log('category data', resp);
          isFrom === "Explore" && setSelectedCategory(res?.data?.data?.findIndex((item: any) => item.id === category.id) + 1)
          setCategoryList(res?.data?.data)
        }
      });
    }
  }, [route]);

  // const getSubCategorys = () => {
  //   dispatch(getSubCategoryList(categoryList[selectedCategory -1].id))
  //   .unwrap()
  //   .then((res: any) => {
  //     let resp = res?.data ? res.data : res;
  //     if (res?.data?.data) {
  //       console.log('sub category data', resp?.data);
  //       let newobj: any = []
  //       // attributeData?.forEach((item: any, index: number) => {
  //       //   console.log('attribute item', item);
  //       //   let newItem = {...item}
  //       //   if (index === 2) {
  //       //   let newArr: any = []
  //       //   resp?.data?.forEach((element: any) => {
  //       //    element = { ...element, isSelected: false }
  //       //    newArr.push(element)
  //       //   })
  //       //   if (item?.slug === "subcategory") {
  //       //     newItem = {
  //       //       id: attributeData?.length,
  //       //       name: "Sub Category",
  //       //       slug: "subcategory",
  //       //       type: "multiCheck",
  //       //       items: newArr
  //       //     }
  //       //   } else {
  //       //     newobj.push({
  //       //       id: attributeData?.length,
  //       //       name: "Sub Category",
  //       //       slug: "subcategory",
  //       //       type: "multiCheck",
  //       //       items: newArr
  //       //     })
  //       //   }
          
  //       // }
  //       //   newobj.push(newItem)
  //       // })
  //       // dispatch(setEmptyFilterData(newobj))
  //       // setAttributeOldData(newobj)
  //       // setAttributeData(newobj)
  //       setSubCategoryList(res?.data?.data)
  //     }
  //   });
  // }

  const selectCategory = (mainIndex: number, newAttributeData? :any, mainId?: number) => {
    let newAttributeArr: any = [];
    
    let tempAttributeArr = newAttributeData || attributeData
    tempAttributeArr?.forEach((item: any) => {
      const arrObj = {...item};
      if (item.slug === "category") {
        let itemArr: any = [];
        item?.items?.forEach((e: any, index1: number) => {
          let obj = {...e};
          let subArr: any = [];
          obj?.sub_category?.forEach((subCat: any, index2: number) => {
            let subObj = {...subCat};
            console.log("main id", mainId, e.id);
            if (mainId) {
              subObj.isSelected = mainId === e?.id
            } else {
              subObj.isSelected = mainIndex > -1 && index1 === mainIndex;
            }
            subArr.push(subObj);
          });
          // if (index1 === mainIndex) {
            obj.sub_category = subArr;
            obj.isSelected = subArr?.some((subItem: any) => subItem.isSelected);
          //}
          itemArr.push(obj);
        });
        arrObj.items = itemArr;
      }
      newAttributeArr.push(arrObj);
    });
    setAttributeData(newAttributeArr);
    return newAttributeArr
  };

  const prepareFilterData = (attributeDataTemp: any, sortIndex?: number, upperCategory?: boolean, mainId?: number) => {
      let body: any = {};
      if (sortIndex) {
        if (sortIndex > 0) {
          body = {
            ...body,
            sortby: sortData[sortIndex]?.slug
          }
        }
      } else {
        if (selectedSort > 0) {
          body = {
            ...body,
            sortby: sortData[selectedSort]?.slug
          }
        }
      }
      body = { ...body, 
        suitable: [suitableItem.id]
      }
      if (upperCategory && mainId) {
        body = { ...body, 
          category: [suitableItem.id]
        }
      }
      attributeDataTemp?.forEach((item: any) => {
        if(item?.slug === "suitable") {
          // body = { ...body, 
          //    [item.slug] : [suitableItem.id],
          // }
        }
        else if(item?.slug === "price") {
          body = { ...body,
            start_price: item?.items[0].min,
            end_price: item?.items[0].max,
          }
        } else if (item?.slug === "category") {
          console.log("isFrom", isFrom)
          if (upperCategory) {
            console.log("isFrom", isFrom)
            if (mainId) {
              body = {
                ...body,
                category: [mainId]
              }
            } else {
              if (selectedCategory > 0) {
                body = {
                  ...body,
                  category: [categoryList[selectedCategory - 1].id]
                }
            }
            
          }
          } else {
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
    const bodyData = sortIndex ? prepareFilterData(attributeDataTemp, sortIndex) : prepareFilterData(attributeDataTemp)
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
    // setShowBottomSheet(false)
    // setAttributeOldData(emptyFilterData)
    const newAttributeArr = isFrom === "Explore" ? selectCategory(0, emptyFilterData, category?.id) : selectCategory(selectedCategory - 1, emptyFilterData)
    // setAttributeData(emptyFilterData)
    getProductsWithFilter(newAttributeArr)
  }

  // const onClearFilter = () => {
  //   setAttributeData(emptyFilterData)
  //   getProductsWithFilter(emptyFilterData, shortedIndex)
  // }

  const onApplyFilter = (attributeDataTemp: any) => {
      setAttributeData(attributeDataTemp)
      getProductsWithFilter(attributeDataTemp, selectedSort)
  }

  const onSortSelection = (index: number) => {
      setSelectedSort(index)
      getProductsWithFilter(attributeData, index)
  }

  useEffect(() => {
    if(suitableItem?.id) {
      if (isFrom === "Explore") {
        // let body = prepareFilterData(attributeData,undefined, true, category.id)
        // console.log(" select category explore:", category.id, categoryList)
        // selectCategory(2, attributeData, category.id)
        // console.log(" filter body explore:", body, "attribute data", attributeData)
        // dispatch(getProductList({ body: body }))
        // .unwrap()
        // .then((res: any) => {
        //   console.log('product items data', res);
        //   let resp = res?.data ? res.data : res;
        //   if (resp.last_page) {
        //     last_page = resp.last_page
        //   }
        //   if (resp?.data) {
        //     setNumOfItems(resp?.total)
        //     setProductList(resp.data)
        //   }
        // })
      } else {
      let body = prepareFilterData(attributeData,undefined, true)
      if (selectedCategory > 0) {
        //getSubCategorys()
        selectCategory(selectedCategory -1)
    } else {
      selectCategory(selectedCategory -1)
    }
      console.log(" filter body :", body, "attribute data", attributeData)
      dispatch(getProductList({ body: body }))
      .unwrap()
      .then((res: any) => {
        console.log('product items data', res);
        let resp = res?.data ? res.data : res;
        if (resp.last_page) {
          last_page = resp.last_page
        }
        if (resp?.data) {
          setNumOfItems(resp?.total)
          console.log('fresh finds data', resp?.data, resp?.total);
          setProductList(resp.data)
        }
      })
    }
     }
  }, [selectedCategory, route])

  const getProductListPagination = () => {
    if (!isSkeleton && current_page < last_page) {
    
      let body = prepareFilterData(attributeData)
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

  const renderCategory = (item: any, index: number) => (
    <>{skeletonName.includes("categoryList") ?  subCategorySkeleton()  : 
    <TouchableOpacity
      onPress={() => setSelectedCategory(index)}
      style={[
        styles.subCategoryView,
        selectedCategory === index && {backgroundColor: Colors.primaryText},
      ]}>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === index && {color: Colors.white},
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
    }
    </>
  );

  const renderCategories = () => (
    <View style={styles.topView}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={skeletonName.includes("categoryList") ? SkeletonData : [...allItem, ...categoryList]}
        contentContainerStyle={styles.flatContainer}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => renderCategory(item, index)}
      />
    </View>
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
        data={skeletonName.includes("productList") || skeletonName.includes("arrtibuteList") ? SkeletonData : productList}
        contentContainerStyle={styles.flatItemContainer}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item, index}) => renderProductItem(item, index)}
        ListEmptyComponent={() => (
          <>{skeletonName.length === 0 && <CustomEmptyView text={LABELS.HomeScreen.noProductsAvailable} />}</>
        )}
        ListFooterComponent={() => current_page < last_page && loadMoreView(() => getProductListPagination(), skeletonName.includes("productListPagination"))}
      />
    </View>
  );

  const renderProductItem = (item: ProductItem, index: number) => (
    <>{skeletonName.includes("productList") || skeletonName.includes("arrtibuteList") ? productSkeleton() : 
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

  return (
    <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
      <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={isFrom === "Explore" ? suitableItem.name + " - " + category.name : suitableItem.name}
        subTitle={numOfItems + " Items"}
        // rightView={() => (
        //   <View style={styles.headerRightView}>
        //     <TouchableOpacity>
        //       <Image
        //         source={images.cartIcon}
        //         style={{resizeMode: 'contain', tintColor: Colors.black}}
        //       />
        //       <View style={styles.countView}>
        //         <Text style={styles.countText}>2</Text>
        //       </View>
        //     </TouchableOpacity>
        //   </View>
        // )}
        showBack
      />
      {isFrom === "Explore" ? <></> : renderCategories()}
      {renderProducts()}
      <CustomFilterModal 
            // showBottomSheet={showBottomSheet}
            // isFilter={isFilter}
            attributeData={attributeData}
            hideSuitable
            categorySelected={selectedCategory}
            onSortSelection={(index) => onSortSelection(index)}
            onApplyFilter={(attributeDataTemp) => onApplyFilter(attributeDataTemp)}
            onClearFilter={() => onClearFilter()}
        />
    </CustomScreen>
  );
};

export default SubCategoriesScreen;
