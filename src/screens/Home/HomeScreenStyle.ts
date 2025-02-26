import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { screenScale, verticalScale } from '../../utils/scaling';
import { hasNotch } from 'react-native-device-info';
import { CommonStyleConstants } from '../../utils/CommonStyle';
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainScrollView:{
    width: '100%',
    // flex: 1
    // paddingHorizontal: screenScale(24)
  },
  topView: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingTop: screenScale(8),
    paddingBottom: screenScale(22),
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    // height: 200
  },
  headerRightView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenScale(30),
    justifyContent: 'space-between'
  },
  customSearch: {
    // backgroundColor: Colors.primaryText,
    marginHorizontal: CommonStyleConstants.commonScreenPadding,
  },
  customSearchMainView: {
    backgroundColor: Colors.primaryText40,
    borderWidth: 0,
    borderColor: Colors.primary
  },
  customSearchTextInput: {
    color: Colors.white
  },
  countView: {
    height: screenScale(16),
    width: screenScale(16),
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.yellow,
    position: 'absolute',
    top: -5,
    right: -5
  },
  countText: {
    fontFamily: Font.FontRegular,
    fontSize: fontSize.fontSize_very_small,
    color: Colors.primaryText
  },
  wrapper: {
    // width: '100%',
    // alignItems: 'center',
    height: 220,
    
    // height: verticalScale(250)
  },
  slideImage: {
    marginHorizontal: screenScale(20),
    marginVertical: screenScale(10),
    height: screenScale(200),
    width: screenScale(345)
    // width: '100%',
  },
  pagination: {
    marginBottom: -screenScale(28)
  },
  categoryView: {
    width: screenScale(104),
    // borderRadius: 16,
    marginRight: screenScale(20),
    borderWidth: 0.5,
    borderColor: Colors.placeHolderBorder,
    borderRadius: 16,
  },
  categoryImage: {
    width: '100%',
    height: 92,
    resizeMode: 'cover',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  categoryBottom: {
    backgroundColor: Colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: screenScale(10),
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  categoryText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_small,
    color: Colors.primaryText
  },
  flatContainer: {
      // width: screenScale(393),
      marginTop: screenScale(24)
  },
  categoryTitle: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_big,
    color: Colors.primaryText
    
  },
  categoryParent: {
    paddingVertical: screenScale(20),
    paddingHorizontal: CommonStyleConstants.commonScreenPadding,
    width: '100%'
  },
  listingParent: {
    paddingHorizontal: CommonStyleConstants.commonScreenPadding,
  },
  subCategoryView: {
    backgroundColor: Colors.placeHolderBorder,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
    paddingHorizontal: screenScale(16),
    paddingVertical: screenScale(10),
    marginRight: screenScale(16)
  },
  flatItemContainer: {
    // width: screenScale(393),
    // width: '100%',
    justifyContent: 'space-between',
    marginTop: screenScale(24),
    paddingBottom: screenScale(110)
},
});
export default styles;