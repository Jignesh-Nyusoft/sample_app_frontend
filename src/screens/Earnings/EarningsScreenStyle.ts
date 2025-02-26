import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { screenScale, verticalScale } from '../../utils/scaling';
import { hasNotch } from 'react-native-device-info';
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topView: {
    borderRadius: 16,
    backgroundColor: Colors.yellow + "20",
    // padding: screenScale(12)
  },
  earningTop: {
    backgroundColor: Colors.yellow + "20",
    paddingBottom: screenScale(12),
    padding: screenScale(12),
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16
  },
  earningBelow: {
    backgroundColor: Colors.yellow + "20",
    paddingTop: screenScale(12),
    padding: screenScale(12),
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16
},
  titleText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.secondoryText,
    marginBottom: screenScale(5)
  },
  amountText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_huge,
    color: Colors.primaryText
  },
  cardText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText
  },
  moneyBag: {
    position: "absolute",
    right: screenScale(12),
    top: screenScale(16)
  },
  devider: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.white,
  },
  changeButton: {
    paddingVertical: screenScale(8),
    position: 'absolute',
    right: screenScale(8),
    top: screenScale(8),
    width: screenScale(100)
  },
  transactionText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
    marginVertical: screenScale(16)
  },
  listItem: {
    padding: screenScale(12),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.placeHolderBorder,
    marginBottom: screenScale(8)
  },
  itemTitle: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
    marginBottom: screenScale(6)
  },
  itemDate: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_very_small,
    color: Colors.secondoryText,
  },
  itemAmount: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
    position: 'absolute',
    right: screenScale(12),
    top: screenScale(24)
  },
  empty: {
    paddingTop: screenScale(16),

  },
  flatContainer: {
    paddingBottom: screenScale(400)
  }

});
export default styles;