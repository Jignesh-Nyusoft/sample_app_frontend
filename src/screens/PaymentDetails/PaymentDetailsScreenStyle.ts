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
    paddingTop:  screenScale(16)
    // paddingHorizontal: CommonStyleConstants.commonScreenPadding
  },
  addCardView: {
    backgroundColor: Colors.white,
    borderColor:  Colors.placeHolderBorder,
    borderWidth: 1,
    padding: screenScale(8),
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {

  },
  addCard: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
    marginLeft: screenScale(8)
  },
  rightArrow: {
    position: 'absolute',
    right: screenScale(12),
    top: '40%'
  }
});
export default styles;