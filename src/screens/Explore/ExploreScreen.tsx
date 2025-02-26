import {useEffect, useRef, useState} from 'react';
import {StackPropsType, tabStackProps} from '../../navigation/NavigationProps';
import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomScreen} from '../../components/CustomScreen';
import CustomHeader from '../../components/CustomHeader';
import {LABELS} from '../../locales/common';
import {Colors} from '../../theme';
import styles from './ExploreScreenStyle';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../theme/imageIndex';
import { dummyexploreData } from '../../utils/dummyData';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { SuitableItem } from '../../redux/types/homeTypes';
import { navigate } from '../../navigation/RootNavigationFunctions';
import screens from '../../navigation/NavigationScreens';

const exploreImages = [
  require('../../assets/dummy/ExploreNew/Explore2New.png'),
  require('../../assets/dummy/ExploreNew/Explore1New.jpeg'),
  require('../../assets/dummy/ExploreNew/Explore3New.png'),
  require('../../assets/dummy/BabiesNew.png'),
]

const ExploreScreen = ({navigation}: tabStackProps<'Explore'>) => {
  const { suitableList } = useSelector(
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

  return (
    <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
      <CustomHeader
        container={{backgroundColor: Colors.white}}
        title={LABELS.ExploreScreen.exploreProducts}
        showBack={false}
      />
      <ScrollView style={{ width:'100%' }} >
      <View style={styles.exploreParent}>
      {suitableList?.map((item: SuitableItem, index: number) => renderExploreItem(item, index))}
      </View>
      </ScrollView>
    </CustomScreen>
  );
};

export default ExploreScreen;
