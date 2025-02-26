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
    width: '100%', paddingHorizontal: CommonStyleConstants.commonScreenPadding,
    paddingBottom: screenScale(100)
  }
});
export default styles;