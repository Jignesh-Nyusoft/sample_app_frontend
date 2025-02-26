import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { screenHightPercentage, screenScale, verticalScale } from '../../utils/scaling';
import { hasNotch } from 'react-native-device-info';
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flatContainer: {

  },
  bigText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_big,
    color: Colors.primaryText,
    marginVertical: screenScale(12)
  },
  subText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_small,
    color: Colors.secondoryText,
    marginBottom: screenScale(12)
  },
  itemView: {
    padding: screenScale(16),
    borderRadius: 8,
    borderColor: Colors.placeHolderBorder,
    borderWidth: 1,
    marginTop: screenScale(12)
  },
  addressName: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_regular,
    color: Colors.primaryText,
    marginBottom: screenScale(10)
  },
  addressDetail: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.secondoryText
  },
  radio: {
    position: 'absolute',
    right: screenScale(8),
    top: screenScale(8),
    flexDirection: 'row',
  },
  buttons: {
    position: 'absolute',
    right: screenScale(16),
    top: screenScale(16),
    flexDirection: 'row',
  },
  button: {
    width: screenScale(24),
    height: screenScale(24),
    marginLeft: screenScale(8)
  },
  editAddress: {
    width: screenScale(130),
    paddingVertical: screenScale(12)
  },
  itemBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  empty: {
    paddingTop: screenScale(16),
    paddingBottom: 0

  },
  emptyImage: {

  },
  titleText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_big,
    color: Colors.primaryText,
    marginBottom: screenScale(14),
    textAlign: 'center'
  },
  addressView: {
    borderRadius: 8,
    paddingHorizontal: screenScale(12),
    paddingVertical: screenScale(12),
    flexDirection: 'row',
    alignItems:'center',
    borderWidth: 1,
    borderColor: Colors.placeHolderBorder,
    justifyContent: 'space-between'
  },
  addressLeft: {
    width: '75%',
  },
  addressDetails: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_small,
    color: Colors.secondoryText,
  },
  changeButton: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primary,
  },
  connectedView: {
    borderRadius: 16,
    padding: screenScale(18),
    backgroundColor: Colors.grayBackground
  },
  addCard: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
    marginLeft: screenScale(8)
  },
  applePayView: {
    backgroundColor: Colors.white,
    borderColor:  Colors.placeHolderBorder,
    borderWidth: 1,
    padding: screenScale(16),
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    // paddingLeft: screenScale(16)
    // justifyContent: 'center'
  },
  skiptext: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primary,
  }
});
export default styles;