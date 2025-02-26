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
  customSearch: {
    // backgroundColor: Colors.primaryText,
    // marginHorizontal: CommonStyleConstants.commonScreenPadding,
  },
  customSearchMainView: {
    backgroundColor: Colors.grayBackground,
    borderWidth: 1,
    borderColor: Colors.placeHolderBorder,
  },
  customSearchTextInput: {
    color: Colors.primaryText
  },
  cross: {
    marginRight: screenScale(28),
    height: screenScale(22),
    width: screenScale(22),
  },
  searchRoot: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cancel: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
    marginLeft: screenScale(12),
    marginBottom: screenScale(2)
  },
  recentRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: screenScale(11),
    marginBottom: screenScale(16)
  },
  recentTitle : {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_big,
    color: Colors.primaryText,
  },
  clearall: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_small,
    color: Colors.primaryText,
  },
  itemText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
    width: '80%'
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: screenScale(12),
    width: '100%',
    justifyContent: 'space-between',
    borderBottomColor: Colors.placeHolderBorder,
    borderBottomWidth: 1,
    paddingTop: screenScale(12)
  },
  itemCross: {
    // marginRight: screenScale(28),
    height: screenScale(22),
    width: screenScale(22),
  },
  emptyrecent: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
  },

  // explore style---->
  exploreMainView: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: Colors.grayBackground,
    marginBottom: screenScale(24)
  },
  exploreImage: {
    width: '100%',
    height: screenScale(132),
    resizeMode: 'cover',
  },
  linearView: {
    height : '100%', width : '100%' ,
    borderRadius: 16
  },
  exploreInner: {
    position: 'absolute',
    bottom: screenScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: CommonStyleConstants.commonScreenPadding
  },
  exploreName: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_big,
    color: Colors.white
  },
  exploreButtonView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  exploreText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.white,
    marginRight: screenScale(12)
  },
  exploreBottom: {
    paddingTop: screenScale(16), 
    width: '100%', 
    backgroundColor: Colors.grayBackground,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  flatItemContainer: {
    paddingHorizontal: screenScale(12),
    paddingBottom: screenScale(10),
  },
  bottomText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText
  },
  bottomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  seprator: {
    height: 1,
    backgroundColor: Colors.placeHolderBorder,
    marginVertical: screenScale(12),
    marginHorizontal: screenScale(-16)
  },
  exploreParent: {
    width: '100%', paddingHorizontal: 0,
    paddingBottom: screenScale(350)
  }
});
export default styles;