import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { screenScale, verticalScale } from '../../utils/scaling';
import { hasNotch } from 'react-native-device-info';
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainView: {
    flex: 1,
    paddingHorizontal:screenScale(24),
    alignItems: 'center',
    justifyContent:'flex-end',
    paddingBottom: hasNotch() ? screenScale(42) : screenScale(24)
  },
  bigTrue: {
    width:screenScale(78),
    aspectRatio: 1,
    margin: 26
  },
  topText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_huge,
    textAlign: 'center',
    color: Colors.white,
    marginTop: screenScale(12)
  },
  subText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_regular,
    textAlign: 'center',
    color: Colors.white,
    marginTop: screenScale(10),
    marginBottom: screenScale(30)
  },
  bottomView: {
    width:'100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: screenScale(16)
  },
  buttons: {
    width: '47%',
    paddingVertical: screenScale(14),
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.white
  },
  buttonIcon: {

  },
  buttonText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    textAlign: 'center',
    color: Colors.white,
    marginTop: screenScale(12)
  }
});
export default styles;