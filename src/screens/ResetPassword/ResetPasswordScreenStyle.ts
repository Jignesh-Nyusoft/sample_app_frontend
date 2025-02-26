import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { screenScale, verticalScale } from '../../utils/scaling';
import { hasNotch } from 'react-native-device-info';
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  commonInput: {
    marginBottom: screenScale(5),
     // marginTop: verticalScale(0)
  },
  topText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_huge,
    textAlign: 'center',
    color: Colors.primaryText,
    marginTop: screenScale(24)
  },
  subText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_regular,
    textAlign: 'center',
    color: Colors.secondoryText,
    marginTop: screenScale(10),
    marginBottom: screenScale(30)
  },
  buttonStyle: {
    marginTop: screenScale(32),
    marginBottom: screenScale(16)
    // marginHorizontal: screenScale(24)
  },
  bottomText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    textAlign: 'center',
    marginTop: verticalScale(16)
  }
});
export default styles;