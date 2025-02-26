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
    paddingHorizontal: CommonStyleConstants.commonScreenPadding,
    width: '100%'
  },
  flatContainer: {
    paddingBottom: screenScale(16)
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
    marginBottom: screenScale(10),
    maxWidth: "80%"
  },
  addressDetail: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.secondoryText
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
  radio: {
    position: 'absolute',
    right: screenScale(8),
    top: screenScale(8),
    flexDirection: 'row',
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
  selectableButtons: {
    flexDirection: 'row',
  }
});
export default styles;