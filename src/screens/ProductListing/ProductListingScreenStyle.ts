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
  flatContainer: {
    // width: screenScale(393),
    marginLeft: CommonStyleConstants.commonScreenPadding,
    alignSelf: 'flex-start',
    height: screenScale(41),
    paddingRight: screenScale(20),
    width: '100%'
  },
  flatItemContainer: {
    // width: screenScale(393),
    // width: '100%',
    justifyContent: 'space-between',
    marginTop: screenScale(0),
    paddingBottom: screenScale(180)
  },
  bottomView: {
    position: 'absolute',
    bottom: hasNotch() ? screenScale(28) : screenScale(16),
    width: '70%',
    alignSelf: 'center',
    alignItems:'center',
    flexDirection: 'row',
    borderRadius: 100,
    backgroundColor: Colors.white,
    height: screenScale(48),
    shadowColor: '#000',
        shadowOffset: {
          width: 4,
          height: 2,
        },
        shadowOpacity: 0.24,
        shadowRadius: 4,
        elevation: 3,
    
  },
  bottomButton: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: screenScale(16),
  },
  buttonName: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: Colors.placeHolderBorder
  },
});
export default styles;