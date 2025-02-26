import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { screenScale, verticalScale } from '../../utils/scaling';
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
  agreeText: {
    fontFamily: Font.FontRegular,
    fontSize: fontSize.fontSize_small,
    color: Colors.primaryText,
    // marginLeft: screenScale(10),
    // maxWidth: screenScale(324),
    lineHeight: 19
  },
  termsView: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: screenScale(345),
    marginTop: screenScale(12),
    marginBottom: screenScale(16)
  },
  buttonStyle: {

  },
  bottomView: {
    position: 'absolute',
    bottom: screenScale(0),
    width: '100%',
    paddingHorizontal: screenScale(24),
    backgroundColor: Colors.white
  },
  bottomText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    textAlign: 'center',
    marginTop: verticalScale(16)
  },
  genderRoot: {
    width: '100%',
    marginBottom: screenScale(8)
  },
  genderView: {
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: screenScale(8),
    borderWidth: 0,
    borderColor: Colors.placeHolderBorder
  },
  singleGender: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  genderText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText,
    marginLeft: screenScale(12)
  },
  borderView: {
    borderRightWidth: 0,
    borderRightColor: Colors.placeHolderBorder
  },
  genderTitle: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_small,
    color: Colors.primaryText,
    marginBottom: screenScale(8)
  },
  customSearch: {
    // backgroundColor: Colors.primaryText,
    // marginHorizontal: CommonStyleConstants.commonScreenPadding,
  },
  customSearchMainView: {
    backgroundColor: Colors.grayBackground,
    borderWidth: 1,
    borderColor: Colors.placeHolderBorder,
    paddingRight: screenScale(32)
  },
  customSearchTextInput: {
    color: Colors.primaryText,
    paddingRight: screenScale(32)
  },
  flatContainer: {
    // height: screenHightPercentage(50),
    // paddingTop: screenScale(72)
  },
  searchedItemView: {
    borderWidth: 1,
    borderColor: Colors.placeHolderBorder,
    borderRadius: 8,
    paddingHorizontal: screenScale(12),
    paddingVertical: screenScale(12),
    marginBottom: screenScale(8)
  },
  searchedItemText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText
  }
});
export default styles;