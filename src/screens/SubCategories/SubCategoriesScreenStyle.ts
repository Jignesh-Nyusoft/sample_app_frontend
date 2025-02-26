import {StyleSheet} from 'react-native';
import {Colors, Font, fontSize} from '../../theme';
import {screenHightPercentage, screenScale, verticalScale} from '../../utils/scaling';
import {hasNotch} from 'react-native-device-info';
import {CommonStyleConstants} from '../../utils/CommonStyle';
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerRightView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenScale(40),
    justifyContent: 'space-between',
  },
  countView: {
    height: screenScale(16),
    width: screenScale(16),
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.yellow,
    position: 'absolute',
    top: -5,
    right: -5,
  },
  countText: {
    fontFamily: Font.FontRegular,
    fontSize: fontSize.fontSize_very_small,
    color: Colors.primaryText,
  },
  categoryText: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_small,
    color: Colors.primaryText,
  },
  flatContainer: {
    // width: screenScale(393),
    marginLeft: CommonStyleConstants.commonScreenPadding,
    alignSelf: 'flex-start',
    height: screenScale(41),
    paddingRight: screenScale(20),
    width: '100%'
  },
  topView: {
    marginTop: screenScale(8),
    height: screenScale(42),
    marginBottom: screenScale(12),
  },
  subCategoryView: {
    backgroundColor: Colors.placeHolderBorder,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: screenScale(16),
    paddingVertical: screenScale(10),
    marginRight: screenScale(12),
    height: screenScale(40),
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
  sortItemContainer: {
    // width: screenScale(393),
    paddingHorizontal: CommonStyleConstants.commonScreenPadding,
    paddingBottom: screenScale(20),
  },
  // Filter styles
  filterView: {
    height: screenHightPercentage(70),
    flexDirection: 'row',
    marginTop: screenScale(-12)
  },
  leftView: {
    borderRightWidth: 1,
    borderRightColor: Colors.placeHolderBorder,
    width: screenScale(140)
  },
  leftItem: {
    flexDirection: 'row',
    marginVertical: screenScale(8),
    alignItems: 'center'
  },
  leftListContainer: {
    // width: screenScale(393),
    // paddingHorizontal: CommonStyleConstants.commonScreenPadding,
  },
  leftItemText: {
    fontFamily: Font.FontMedium,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primaryText
  },
  leftItemTextCurrent: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_extra_medium,
    color: Colors.primary
  },
  leftCurrent: {
    height: screenScale(32),
    width:  screenScale(16),
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginRight: screenScale(10),
    marginLeft: screenScale(-8)
  },
  leftDOt: {
    height: screenScale(8),
    width:  screenScale(8),
    borderRadius: 16,
    marginRight: screenScale(8),
    marginLeft: screenScale(-8),
    alignSelf: 'center'
  },
  rightView: {
    paddingTop: screenScale(16),
    paddingLeft: screenScale(16)
  },
  rightTitle: {
    fontFamily: Font.FontRegular,
    fontSize: fontSize.fontSize_very_small,
    color: Colors.secondoryText
  },
  rightListContainer: {
    paddingTop: screenScale(8)
  },
  filterBottom: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    paddingBottom: hasNotch() ? screenScale(32) : screenScale(16),
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
  }
});
export default styles;
