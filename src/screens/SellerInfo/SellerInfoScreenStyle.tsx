import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { screenScale, verticalScale } from '../../utils/scaling';
import { hasNotch } from 'react-native-device-info';
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  // Seller Details Style
  sellerMainView: {
    // paddingVertical: screenScale(12),
    backgroundColor: Colors.grayBackground,
    borderWidth: 1,
    borderColor: Colors.placeHolderBorder,
    borderRadius: 16,
    paddingBottom: screenScale(12),
    paddingHorizontal: screenScale(12),
    marginTop: screenScale(16)
    // flexDirection: 'row',
    // backgroundColor: Colors.grayBackground,
    // borderWidth: 1,
    // borderColor: Colors.placeHolderBorder
  },
  sellerTitle: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_big,
    color: Colors.primaryText,
  },
  sellerDetailView: {
    // paddingHorizontal: screenScale(12),
    paddingVertical: screenScale(12),
    flexDirection: 'row',

    // marginTop: screenScale(12),
    alignItems: 'center',
    // justifyContent: 'space-between'
  },
  sellerImage: {
    width: screenScale(48),
    aspectRatio: 1,
    borderRadius: 90,
    marginRight: screenScale(12)
  },
  sellerMiddle: {
    // width: "50%",
  },
  sellerName: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
    marginBottom: screenScale(4)
  },
  sellerLocationView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sellerLocationText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_very_small,
    color: Colors.secondoryText,
  },
  reverseInfo: {
    position: 'absolute',
    right: screenScale(0)
  },
  reviewsView: {
    paddingHorizontal: screenScale(4),
    paddingVertical: screenScale(8),
    backgroundColor: Colors.yellow,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%'
    // position: 'absolute',
    // right: screenScale(12)
    // height: screenScale(32)
  },
  reviewsText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_very_small,
    color: Colors.primaryText,
    marginHorizontal: screenScale(4)
  },
  singledot: {
    width: 4,
    height: 4,
    backgroundColor: Colors.black,
    borderRadius: 90,
    marginHorizontal: screenScale(2)
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
  message: {
    paddingVertical: screenScale(12)
  },
  // Closet Styles
  closetTopView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: screenScale(16),
  },
  closetTitle: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_big,
    color: Colors.primaryText,
  },
  topButtonsView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  singleButtonView: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.placeHolderBorder,
    paddingHorizontal: screenScale(10),
    paddingVertical: screenScale(6),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: screenScale(10)
  },
  buttonText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_very_small,
    color: Colors.primaryText,
  },
  buttonImage: {
    height: screenScale(18),
    width: screenScale(18),
    marginRight: screenScale(4)
  },
  flatItemContainer: {
    // width: screenScale(393),
    // width: '100%',
    justifyContent: 'space-between',
    marginTop: screenScale(0),
    paddingBottom: screenScale(40)
  },
  // Reviews Styles
  reviewsTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: screenScale(12),
    marginTop: screenScale(16)
  },
  reviewsTextBig: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_big,
    color: Colors.primaryText,
    marginHorizontal: screenScale(4)
  },
  singledotBig: {
    width: 6,
    height: 6,
    backgroundColor: Colors.black,
    borderRadius: 90,
    marginHorizontal: screenScale(2)
  },
  starStyle: {
    height: screenScale(32),
    width: screenScale(32)
  },
  listItemView: {
    borderRadius: 16,
    borderColor: Colors.placeHolderBorder,
    padding: screenScale(12),
    borderWidth: 1,
    marginBottom: screenScale(16)
  },
  ratingView: {
    paddingHorizontal: screenScale(4),
    paddingVertical: screenScale(8),
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
    paddingVertical: screenScale(0),
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
  }

});
export default styles;