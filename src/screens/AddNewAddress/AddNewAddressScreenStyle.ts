import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { screenHightPercentage, screenScale, verticalScale } from '../../utils/scaling';
import { hasNotch } from 'react-native-device-info';
import { CommonStyleConstants } from '../../utils/CommonStyle';
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  commonInput: {
    marginBottom: screenScale(5),
     // marginTop: verticalScale(0)
  },
  title: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_big,
    color: Colors.primaryText,
    marginVertical: screenScale(12)
  },
  setDefaultView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: screenScale(10)
  },
  setDefaultText: { 
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_small,
    color: Colors.primaryText,
    marginLeft: screenScale(10)
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
  },
  typeButton: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: screenScale(8),
    borderColor: Colors.primary,
    borderWidth: 1,
    marginRight: screenScale(8)
  },
  typeButtonSelected: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: screenScale(8),
    borderColor: Colors.white,
    backgroundColor: Colors.primary,
    marginRight: screenScale(8)
  },
  typeText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primary,
  },
  typeTextSelected: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.white,
  },
  typesView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: screenScale(12)
  }
});
export default styles;