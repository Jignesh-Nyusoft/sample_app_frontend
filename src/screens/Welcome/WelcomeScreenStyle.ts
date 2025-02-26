import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { screenScale, verticalScale } from '../../utils/scaling';
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topImage: {
    height: '60%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    width: '100%',
  },
  belowView: {
    height: '40%',
    paddingTop: screenScale(24),
    alignItems: 'center',
    paddingHorizontal: screenScale(24),
  },
  title: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_huge,
    color: Colors.primaryText,
  },
  text: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_regular,
    color: Colors.secondoryText,
    textAlign: 'center',
    marginTop: verticalScale(12),
  },
  skipText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primary,
    textAlign: 'center',
    marginTop: verticalScale(24),
  },
  dotRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    width: '20%',
  },
  dotViewSelected: {
    height: 8,
    width: 8,
    backgroundColor: Colors.primary,
    borderRadius: 90,
  },
  dotView: {
    height: 8,
    width: 8,
    backgroundColor: Colors.placeHolderText,
    borderRadius: 90,
  },
});
export default styles;