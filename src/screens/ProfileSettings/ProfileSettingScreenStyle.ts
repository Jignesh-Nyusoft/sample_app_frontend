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
  topText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_huge,
    textAlign: 'center',
    color: Colors.primaryText,
    marginTop: screenScale(24)
  },
  subText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_regular,
    textAlign: 'center',
    color: Colors.secondoryText,
    marginTop: screenScale(10),
    marginBottom: screenScale(30)
  },
  commonInput: {
    marginBottom: screenScale(5),
     // marginTop: verticalScale(0)
  },
  buttonStyle: {

  },
  bottomView: {
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
  },
  image: {
    width: screenScale(96),
    height: screenScale(96),
    borderRadius: 120
  },
  addPhoto: {
    width: screenScale(32),
    height: screenScale(32),
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom:0,
    right:0,
    backgroundColor: Colors.white
  },
  imageWrapper: {
    padding: 0,
    alignSelf: 'center',
    marginTop: screenScale(32),
    marginBottom: screenScale(32)
  },
  genderRoot: {
    width: '100%',
    marginVertical: screenScale(4)
  },
  genderView: {
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: Colors.grayBackground,
    paddingVertical: screenScale(8),
    borderWidth: 1,
    borderColor: Colors.placeHolderBorder
  },
  singleGender: {
    flexDirection: 'row',
    width: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
    marginLeft: screenScale(8)
  },
  borderView: {
    borderRightWidth: 1,
    borderRightColor: Colors.placeHolderBorder
  },
  genderTitle: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_small,
    color: Colors.primaryText,
    marginBottom: screenScale(8)
  },
  errorTxt: {
    zIndex: -1,
    fontFamily: Font.FontRegular,
    fontSize: fontSize.fontSize_very_small,
    color: Colors.red,
    lineHeight: 15,
    marginTop: 2,
  },
  deleteAccount: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primary,
    alignSelf: 'center',
    marginTop: screenScale(12)
  }
});
export default styles;