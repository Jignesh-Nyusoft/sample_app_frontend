import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { screenScale, verticalScale } from '../../utils/scaling';
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.white,
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
  mobileView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  mobileText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    textAlign: 'center',
    color: Colors.primaryText,
  },
  editImage: {
    width: screenScale(20),
    aspectRatio: 1,
    marginLeft: screenScale(10)
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