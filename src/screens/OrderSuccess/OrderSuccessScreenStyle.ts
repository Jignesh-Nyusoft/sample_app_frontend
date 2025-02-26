import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { screenScale, verticalScale } from '../../utils/scaling';
import { hasNotch } from 'react-native-device-info';
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bigImage: {
    marginTop: screenScale(12)
  },
  bigText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_huge,
    color: Colors.primaryText,
    marginTop: screenScale(12),
    textAlign: 'center',
    marginBottom: screenScale(12),
  },
  smallText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_regular,
    color: Colors.secondoryText,
    marginTop: screenScale(12),
    textAlign: 'center',
  }
});
export default styles;