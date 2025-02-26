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
  slideImage: {
    height: screenScale(412),
    width: '100%',
    // resizeMode: 'cover'
  },
  wrapper: {
    // width: '100%',
    // alignItems: 'center',
    height: screenScale(412),

    
    // height: verticalScale(250)
  },
  pagination: {
    marginBottom: screenScale(5),
  },
  dot: {
    width: screenScale(8),
    height: screenScale(8),
    borderRadius: 90,
    borderWidth: 1,
    borderColor: Colors.white
  },
  selectedDot: {
    width: screenScale(16),
    height: screenScale(8),
    borderRadius: 90,
    backgroundColor:  Colors.white,
    borderWidth: 1,
    borderColor: Colors.white
  },
  // Product Detail Style
  belowImageView: {
    paddingHorizontal: CommonStyleConstants.commonScreenPadding,
    paddingTop: screenScale(0),
    width: '100%',
    paddingBottom: screenScale(80),
  },
  productName: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_regular,
    color: Colors.primaryText,
    marginBottom: screenScale(8)
  },
  productPrize:{
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
    marginBottom: screenScale(8)
  },
  productSize: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_very_small,
    color: Colors.secondoryText
  },
  textinfo: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  moreInfoView: {
    borderRadius: 16,
    borderColor: Colors.placeHolderBorder,
    borderWidth: 1,
    paddingHorizontal: screenScale(12),
    paddingVertical: screenScale(16),
    marginVertical: screenScale(16)
  },
  moreInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: screenScale(12)
  },
  moreInfoHalf: {
    width: '50%',
  },
  moreInfoTitle: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_small,
    color: Colors.primaryText,
    marginBottom: screenScale(4)
  },
  moreInfoSubtext: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_very_small,
    color: Colors.secondoryText,
  },
  // Seller Info Style
  sellerMainView: {
    paddingVertical: screenScale(12),
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
    paddingHorizontal: screenScale(12),
    paddingVertical: screenScale(12),
    flexDirection: 'row',
    backgroundColor: Colors.grayBackground,
    borderWidth: 1,
    borderColor: Colors.placeHolderBorder,
    borderRadius: 16,
    marginTop: screenScale(12),
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
    marginBottom: screenScale(4),
    maxWidth: screenScale(130)
  },
  sellerLocationView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sellerLocationText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_very_small,
    color: Colors.primaryText,
  },
  reviewsView: {
    paddingHorizontal: screenScale(4),
    paddingVertical: screenScale(8),
    backgroundColor: Colors.yellow,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: screenScale(12)
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

  flatItemContainer: {
    // width: screenScale(393),
    // width: '100%',
    justifyContent: 'space-between',
    marginTop: screenScale(20),
    paddingBottom: screenScale(100)
  },
  filterBottom: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    paddingBottom: hasNotch() ? screenScale(28) : screenScale(12),
    backgroundColor: Colors.white,
    justifyContent:'space-between',
    paddingHorizontal: CommonStyleConstants.commonScreenPadding,
    borderTopWidth: 1,
    borderTopColor: Colors.placeHolderBorder,
    shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.24,
        shadowRadius: 4,
        elevation: 4,
  }

});
export default styles;