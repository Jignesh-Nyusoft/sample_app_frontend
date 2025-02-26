import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");
/**  set value as per figma screen height and width */
const guidelineBaseWidth = 392;
const guidelineBaseHeight = 850;

/** This line logic is applied to style for managing all views, text, etc. calculating the width of device and showing properly as per figma */
const screenScale = (size: number) => (width / guidelineBaseWidth) * size;
/**This line logic is applied to style for managing all views, text, etc. calculating the height of device and showing properly as per figma */
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
/** this line logic applied to style for manage text size as per figma for all device */
const moderateScale = (size: number, factor = 0.5) =>
  size + (screenScale(size) - size) * factor;

const screenHightPercentage = (per: number) => height * (per/100)

const screenWidthPercentage = (per: number) => width * (per/100)



export {
    screenScale,
    verticalScale,
    moderateScale,
    height as ScreenHeight,
    width as ScreenWidth,
    screenHightPercentage,
    screenWidthPercentage
  };