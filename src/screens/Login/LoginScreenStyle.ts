import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { screenScale, verticalScale } from '../../utils/scaling';
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bigImageView: {
    // width: '90%',
    height: verticalScale(415),
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  bigImage: {
    height: verticalScale(412),
    width: screenScale(345),
    resizeMode: 'stretch'
  },
  text: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_huge,
    textAlign: 'center',
    color: Colors.primaryText,
    
    // marginHorizontal: screenScale(24)
  },
  text2: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_large,
    textAlign: 'center',
    color: Colors.primaryText,
    marginTop: screenScale(8),
    marginBottom: screenScale(32)
  },
  belowView: {
    // height: '45%',
    paddingTop: verticalScale(16),
    paddingHorizontal: screenScale(24),
    width: '100%',
  },
  mobile: {
    marginTop: verticalScale(32)
  },
  buttonStyle: {
    marginTop: verticalScale(20)
  },
  bottomText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    textAlign: 'center',
    marginTop: verticalScale(16)
  },
  commonInput: {
    marginBottom: screenScale(5),
     // marginTop: verticalScale(0)
  },
});
export default styles;