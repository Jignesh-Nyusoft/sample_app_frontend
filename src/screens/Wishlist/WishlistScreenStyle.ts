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
    width: '100%',
  },
  flatItemContainer: {
    // width: screenScale(393),
    // width: '100%',
    justifyContent: 'space-between',
    marginTop: screenScale(0),
    paddingBottom: screenScale(180),
  },
});
export default styles;