import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { screenScale, verticalScale } from '../../utils/scaling';
import { hasNotch } from 'react-native-device-info';
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bigText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_big,
    color: Colors.primaryText,
    marginBottom: screenScale(12),
    alignItems: 'center',
    marginTop: screenScale(24)
  },
  overallText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
    marginBottom: screenScale(18),
  },
  ratingView: {
    borderRadius: 16,
    borderColor: Colors.placeHolderBorder,
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    paddingVertical: screenScale(18)
  },
  singleStar: {
    height: screenScale(27),
    width: screenScale(27)
  },
  itemSeparator: {
    width: screenScale(12)
  },
  detaildViewTitle: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_big,
    color: Colors.primaryText,
    marginBottom: screenScale(-10),
    marginTop: screenScale(16)
  },
  commonInput: {
    marginBottom: screenScale(5),
     // marginTop: verticalScale(0)
  },
  reviewImage: {
    height: screenScale(56),
    width: screenScale(56),
    borderRadius: 12,
    marginHorizontal: screenScale(4),
    marginVertical: screenScale(6),
    borderColor: Colors.placeHolderBorder,
    borderWidth: 1
  },
  cross: {
    height: screenScale(14),
    width: screenScale(14),
  },
  crossView: {
    position: 'absolute',
    right: screenScale(10),
    top: screenScale(10),
  },
  inputStyle: {
    height: 80
  }
});
export default styles;