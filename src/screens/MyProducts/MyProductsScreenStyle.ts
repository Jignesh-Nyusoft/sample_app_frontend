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
  flatContainer: {
    width: '100%',
    paddingTop: screenScale(24),
    paddingBottom: screenScale(180)
  },
  becomeSellerView: {
    
    paddingVertical: screenScale(16),
    paddingHorizontal: screenScale(16),
    backgroundColor: Colors.yellow,
    marginHorizontal: CommonStyleConstants.commonScreenPadding,
    borderRadius:8
  },
  becomeTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  becomeSellerText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
    marginLeft: screenScale(12)
  },
  becomeSellerTextSub: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_small,
    color: Colors.primaryText,
    marginLeft: screenScale(44)
  },
  rightArrow: {
    position: 'absolute',
    right: screenScale(-8),
    top: screenScale(-8),
    padding: 5
  },
  close: {
    height: screenScale(24),
    width: screenScale(24)
  },
  imageWrapper2: {
    borderRadius: 8,
    width: screenScale(32),
    height: screenScale(32),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryText10
  },
});
export default styles;