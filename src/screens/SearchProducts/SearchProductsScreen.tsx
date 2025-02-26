import { useEffect, useState } from "react";
import { StackPropsType, tabStackProps } from "../../navigation/NavigationProps";
import { FlatList, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CustomScreen } from "../../components/CustomScreen";
import CustomSearchBar from "../../components/CustomSearchBar";
import { LABELS } from "../../locales/common";
import styles from "./SearchProductsScreenStyle";
import { CommonStyleConstants, CommonStyleSheets } from "../../utils/CommonStyle";
import { Colors } from "../../theme";
import images from "../../theme/imageIndex";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { addRecentSearch, clearRecentSearch, removeRecentSearch } from "../../redux/reducers/homeReducer/homeSlice";
import { goBack, navigate } from "../../navigation/RootNavigationFunctions";
import screens from "../../navigation/NavigationScreens";
import { SuitableItem } from "../../redux/types/homeTypes";
import LinearGradient from "react-native-linear-gradient";
import { screenScale } from "../../utils/scaling";
const exploreImages = [
  require('../../assets/dummy/ExploreNew/Explore2New.png'),
  require('../../assets/dummy/ExploreNew/Explore1New.jpeg'),
  require('../../assets/dummy/ExploreNew/Explore3New.png'),
  require('../../assets/dummy/BabiesNew.png'),
]

const SearchProductsScreen = ({ navigation }: tabStackProps<"SearchProducts">) => {
    const [searchText, setSearchText] = useState('');
    const { recentSearches, suitableList } = useSelector(
        (state: RootState) => state.homeSlice
      );
      const [visibleItem, setVisibleItem] = useState<number>();
    
      
      const renderExploreItem = (item:SuitableItem, index: number) => (
        <>
        <View key={item.name} style={styles.exploreMainView}>
          <ImageBackground source={exploreImages[index]} imageStyle={{ borderRadius: 16, resizeMode: 'cover' }} style={styles.exploreImage}>
          <LinearGradient
            colors={['#19231A00', '#19231A99', '#19231AFF']} 
            style={styles.linearView}>
              <View style={styles.exploreInner}>
                <Text style={styles.exploreName}>{item.name}</Text>
                <View style={styles.exploreButtonView}>
                  <Text style={styles.exploreText}>{LABELS.ExploreScreen.expore}</Text>
                  <TouchableOpacity onPress={() => visibleItem !== index ? setVisibleItem(index) : setVisibleItem(-1)}>
                    <Image source={visibleItem === index ? images.upCircle : images.downCircle} />
                  </TouchableOpacity>
                </View>
              </View>
        </LinearGradient>
          </ImageBackground>
        {visibleItem === index && <View style={styles.exploreBottom} >
        <FlatList
            showsVerticalScrollIndicator={false}
            data={item?.category}
            contentContainerStyle={styles.flatItemContainer}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => navigate(screens.SUBCATEGORIES, { suitableItem: suitableList[visibleItem], category: item, isFrom: "Explore" })} style={styles.bottomItem}>
                <Text style={styles.bottomText}>{item.name}</Text>
                <Image source={images.rightArrow} />
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <View>
                <Text style={styles.bottomText}>{LABELS.ExploreScreen.emptyData}</Text>
              </View>
            )}
    
            ItemSeparatorComponent={() => <View style={styles.seprator}/>}
          />
        </View>}
        </View>
    
        </>
      )
      const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        // dispatch(addRecentSearch("abc"))
        // dispatch(addRecentSearch("xyz"))
        // dispatch(addRecentSearch("something"))
        // dispatch(addRecentSearch("different"))
        // dispatch(addRecentSearch("new"))
    },[]);
    
    const renderListItem = (item: any, index: number) => (
         <TouchableOpacity onPress={() => navigate(screens.PRODUCT_LISTING, { searchText: item })} style={styles.listItem}>
            <Image source={images.history} />
            <Text numberOfLines={1} style={styles.itemText}>{item}</Text>
            <TouchableOpacity onPress={() => dispatch(removeRecentSearch(item))}><Image style={styles.itemCross} source={images.closeIcon} /></TouchableOpacity>
        </TouchableOpacity>
    )
        
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
        <View style={CommonStyleSheets.commonMainView}>
       <View style={styles.searchRoot}>
        <CustomSearchBar
            value={searchText}
            onChangeText={val => setSearchText(val)}
            searchTintColor={Colors.placeHolderText}
            placeholder={LABELS.SearchProductsScreen.searchForProductsAndSeller}
            customContainerStyle={styles.customSearch}
            customStyle={styles.customSearchMainView}
            // placeholderTextColor={Colors.white50}
            textInputStyle={styles.customSearchTextInput}
            rightView={() => searchText && (
                <TouchableOpacity onPress={() => setSearchText("")} >
                    <Image style={styles.cross} source={images.closeIcon} />
                </TouchableOpacity>
            )}
          />
          <Text onPress={() => searchText ? navigate(screens.PRODUCT_LISTING, { searchText }) : goBack() } style={styles.cancel}>{searchText ? LABELS.COMMON_LABELS.search : LABELS.COMMON_LABELS.cancel}</Text>
        </View>
        {recentSearches?.length > 0 && <View style={styles.recentRoot}>
            <Text style={styles.recentTitle}>{LABELS.SearchProductsScreen.recentSearches}</Text>
            <Text onPress={() => dispatch(clearRecentSearch({}))} style={styles.clearall}>{LABELS.SearchProductsScreen.clearAll}</Text>
        </View>}
        <FlatList
      showsVerticalScrollIndicator={false}
      data={recentSearches}
      inverted
    //   contentContainerStyle={styles.flatContainer}
      keyExtractor={item => item.toString()}
      renderItem={({item, index}) => renderListItem(item, index)}

    />
    <ScrollView showsVerticalScrollIndicator={false}>
     <Text style={[styles.recentTitle, { marginVertical: screenScale(16) }]}>{LABELS.ExploreScreen.exploreProducts}</Text>
      <View style={styles.exploreParent}>
      {suitableList?.map((item: SuitableItem, index: number) => renderExploreItem(item, index))}
      </View>
      </ScrollView>
        </View>
      </CustomScreen>
    );
  };
  
  export default SearchProductsScreen;