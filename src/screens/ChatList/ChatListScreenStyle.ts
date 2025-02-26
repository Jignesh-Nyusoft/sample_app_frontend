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
  mainPadding: {
    paddingHorizontal: CommonStyleConstants.commonScreenPadding,
    width: '100%'
  },
  searchView: {
    marginBottom: screenScale(12)
  },
  customSearch: {
    // backgroundColor: Colors.primaryText,
    // marginHorizontal: CommonStyleConstants.commonScreenPadding,
  },
  customSearchMainView: {
    backgroundColor: Colors.grayBackground,
    borderWidth: 1,
    borderColor: Colors.placeHolderBorder
  },
  customSearchTextInput: {
    color: Colors.primaryText
  },
  flatItemContainer:{
    paddingHorizontal: 0,
    paddingBottom: screenScale(150)
  },
  listWrapper: {
    marginTop: screenScale(10),
    
  },
  chatItem: {
    padding: screenScale(16),
    borderRadius: 16,
    borderColor: Colors.placeHolderBorder,
    borderWidth: 1,
    marginBottom: screenScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userImage: {
    width: screenScale(48),
    height: screenScale(48),
    borderRadius: 16
  },
  sideView: {
    width: '80%',
    height: '100%'
  },
  nameView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: screenScale(6)
  },
  userName: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText
  },
  userNameUnread: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  timeText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_very_small,
    color: Colors.secondoryText
  },
  redDot: {
    height: screenScale(8),
    width: screenScale(8),
    borderRadius: 90,
    backgroundColor:Colors.redDot,
    marginLeft: 2
  },
  lastMessage: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_small,
    color: Colors.secondoryText
  },
  lastMessageUnread:{
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_small,
    color: Colors.primaryText
  }
});
export default styles;