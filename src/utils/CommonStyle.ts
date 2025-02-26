import {StyleSheet} from 'react-native';
import {screenScale} from './scaling';
import {Colors, Font, fontSize} from '../theme';
import {hasNotch} from './CommonFunctions';

export const CommonStyleConstants = {
  commonScreenPadding: screenScale(20),
  commonMainView: {
    width: '100%',
  },
};

export const CommonStyleSheets = StyleSheet.create({
  commonMainView: {
    width: '100%',
    paddingHorizontal: CommonStyleConstants.commonScreenPadding,
  },
  commonBottomView: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    paddingBottom: hasNotch() ? screenScale(28) : screenScale(12),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
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
  commonShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 2,
    elevation: 4,
  },
  bigTitle: {
    fontFamily: Font.FontBold,
    fontSize: fontSize.fontSize_big,
    color: Colors.primaryText
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.black + "90",
  },
  deviderView: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.primary + "60",
    marginBottom: screenScale(20),
    marginTop: screenScale(5),
  },
  multiLineStyle: {
    height: screenScale(100), justifyContent: 'flex-start', paddingTop: screenScale(8)
  }
});
