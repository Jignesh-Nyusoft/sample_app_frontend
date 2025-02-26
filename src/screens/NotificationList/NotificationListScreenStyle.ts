import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { screenScale, verticalScale } from '../../utils/scaling';
import { hasNotch } from 'react-native-device-info';
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flatContainer: {
    width: '100%',
    paddingTop: screenScale(24),
    paddingBottom: screenScale(180)
  },
  listItemBack: {
    marginBottom: screenScale(12),
    backgroundColor: Colors.primary,
    borderRadius: 16,
  },
  listItem: {
    padding: screenScale(16),
    borderRadius: 16,
    borderColor: Colors.placeHolderBorder,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white
  },
  userImage: {
    width: screenScale(48),
    height: screenScale(48),
    borderRadius: 12
  },
  deleteButton: {
     height: screenScale(24),
     width: screenScale(24)
  },
  deleteView: {
    position: 'absolute', 
    right: screenScale(0),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%'
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
    color: Colors.primaryText,
    width: screenScale(120)
  },
  userNameUnread: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
    width: screenScale(120)
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  timeText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_very_small,
    color: Colors.secondoryText,
    // width: screenScale(70)
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