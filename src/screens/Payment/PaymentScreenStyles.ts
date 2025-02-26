import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { screenScale, verticalScale } from '../../utils/scaling';
import { hasNotch } from 'react-native-device-info';
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  applePayView: {
    backgroundColor: Colors.white,
    borderColor:  Colors.placeHolderBorder,
    borderWidth: 1,
    padding: screenScale(8),
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    marginHorizontal: screenScale(8)
  },
  addCard: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
    marginLeft: screenScale(8)
  },
  titleText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_big,
    color: Colors.primaryText,
    marginBottom: screenScale(12),
    marginTop: screenScale(24)
  }
});
export default styles;