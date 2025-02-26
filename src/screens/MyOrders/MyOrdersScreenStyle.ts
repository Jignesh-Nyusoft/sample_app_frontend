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
    paddingBottom: screenScale(88)
  }
});
export default styles;