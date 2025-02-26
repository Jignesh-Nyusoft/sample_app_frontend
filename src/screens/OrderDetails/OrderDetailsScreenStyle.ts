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
  mainView: {
    paddingHorizontal: CommonStyleConstants.commonScreenPadding
  },
  titles: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_big,
    color: Colors.primaryText,
    marginTop: screenScale(16),
    marginBottom: screenScale(8)
  },
  borderView: {
    paddingHorizontal: screenScale(12),
    paddingVertical: screenScale(12),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.placeHolderBorder,
    
  },
  detailsItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginBottom: screenScale(12)
  },
  detailsItemTitle: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.secondoryText,
  },
  detailsItemText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
  },
  addressTitle: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_regular,
    color: Colors.primaryText,
    marginBottom: screenScale(8)
  },
  addressText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.secondoryText,
  },
  seperator: {
    // borderWidth: 0.5,
    // // borderTopWidth:1,
    // borderStyle: 'dashed',
    textDecorationStyle: 'dashed',
    textDecorationLine: 'underline',
    textDecorationColor: Colors.placeHolderBorder,
    color: Colors.white,
    // borderColor: Colors.primaryText,
    // borderTopColor: Colors.primaryText,
    // height: 1,
    // borderTopColor: Colors.grayBackground,
    width: '100%',
    marginBottom: screenScale(8)
  },
  listItemView: {
    borderRadius: 16,
    borderColor: Colors.placeHolderBorder,
    padding: screenScale(12),
    borderWidth: 1,
    marginBottom: screenScale(16),
    marginTop: screenScale(8)
  },
  ratingView: {
    paddingHorizontal: screenScale(4),
    paddingVertical: screenScale(4),
    backgroundColor: Colors.yellow,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: screenScale(4)
    // height: screenScale(32)
  },
  reviewDetailView: {
    // paddingHorizontal: screenScale(12),
    paddingVertical: screenScale(8),
    flexDirection: 'row',

    // marginTop: screenScale(12),
    alignItems: 'center',
    // justifyContent: 'space-between'
  },
  reviewImage: {
    height: screenScale(48),
    width: screenScale(48),
    borderRadius: 8,
    marginHorizontal: screenScale(8),
    marginVertical: screenScale(6)
  },
  sellerText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_small,
    color: Colors.secondoryText,
    marginVertical: screenScale(8)
  },
  readMoreText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_small,
    color: Colors.primaryText,
  },
  reviewsText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_very_small,
    color: Colors.primaryText,
    marginHorizontal: screenScale(4)
  },
  sellerLocationText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_very_small,
    color: Colors.secondoryText,
  },
  buyerImage: {
    height: screenScale(32),
    width: screenScale(32),
    marginRight: screenScale(12),
    borderRadius: 90
  },
  buyerName: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_regular,
    color: Colors.primaryText,
  },
  bottomText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    textAlign: 'center',
    marginTop: verticalScale(4)
  },
});
export default styles;