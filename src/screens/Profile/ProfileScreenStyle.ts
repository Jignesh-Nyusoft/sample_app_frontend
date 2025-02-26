import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { screenScale, verticalScale } from '../../utils/scaling';
import { CommonStyleConstants } from '../../utils/CommonStyle';
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  ScrollView: {
    paddingHorizontal: CommonStyleConstants.commonScreenPadding,
    width: '100%',
    // paddingTop: screenScale(56)
  },
  viewPadding: {
    paddingBottom: screenScale(150),
    width: '100%',
    backgroundColor: Colors.transparent
  },
  mainTopView: {
    backgroundColor: Colors.yellow,
    borderRadius: 16,
    marginTop: screenScale(56)
  },
  topView: {
    borderRadius: 16,
    backgroundColor: Colors.primary,
    padding: screenScale(12),
    alignItems: 'center',
  },
  userImageView: {
    width: screenScale(100),
    height: screenScale(100),
    backgroundColor: Colors.transparent,
    // marginBottom: screenScale(-64)
  },
  userImage: {
    width: screenScale(96),
    height: screenScale(96),
    borderRadius: 90,
    borderColor:Colors.white,
    borderWidth:4,
    backgroundColor: Colors.white,

    marginTop: screenScale(-64),
    zIndex: 99999
  },
  userName: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_big,
    color: Colors.white,
    marginVertical: screenScale(8)
  },
  userEmail: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.white50,
    marginBottom: screenScale(16)
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: screenScale(8)
  },
  myOrdersView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '47%',
    padding: screenScale(8),
    backgroundColor: Colors.primaryText40,
    borderRadius: 12
  },
  myOrdersViewFull: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: screenScale(8),
    backgroundColor: Colors.primaryText40,
    borderRadius: 12
  },
  earningText: {
    position: 'absolute',
    right: screenScale(16),
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_regular,
    color: Colors.white
  },
  myOrdersText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_small,
    color: Colors.white,
    marginLeft: screenScale(8)
  },
  imageWrapper: {
    borderRadius: 8,
    width: screenScale(32),
    height: screenScale(32),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white16
  },
  imageWrapper2: {
    borderRadius: 8,
    width: screenScale(32),
    height: screenScale(32),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryText10
  },
  becomeSellerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: screenScale(16),
    paddingHorizontal: screenScale(16)
  },
  becomeSellerText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_small,
    color: Colors.primaryText,
    marginLeft: screenScale(12)
  },
  rightArrow: {
    position: 'absolute',
    right: screenScale(16)
  },
  // My Account Styling
  myAccountView: {
    paddingVertical: screenScale(16),

  },
  myAccountText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_big,
    color: Colors.primaryText,
    marginBottom: screenScale(16)
  },
  listView: {
    borderColor: Colors.placeHolderBorder,
    borderRadius: 16,
    borderWidth: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems:'center',
    paddingHorizontal: screenScale(8),
    paddingVertical: screenScale(8)
  },
  itemImageWrapper: {
    borderRadius: 8,
    width: screenScale(40),
    height: screenScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayBackground,
    marginRight: screenScale(12)
  },
  listItemtext: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
  },
  bottomBorder: {
    borderBottomColor: Colors.placeHolderBorder,
    borderBottomWidth: 1
  },
  logOutView: {
    paddingVertical: screenScale(5),
    paddingHorizontal: screenScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOutText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primary,
  }

});
export default styles;