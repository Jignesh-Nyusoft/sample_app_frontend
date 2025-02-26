import { useEffect, useState } from "react";
import { StackPropsType } from "../../navigation/NavigationProps";
import CustomPhoneInput from "../../components/CustomPhoneInput";
import { Image, StatusBar, Text, View } from "react-native";
import images from "../../theme/imageIndex";
import styles from "./WelcomeScreenStyle";
import { t } from "i18next";
import { LABELS } from "../../locales/common";
import CustomButton from "../../components/CustomButton";
import { Colors } from "../../theme";
import { navigate } from "../../navigation/RootNavigationFunctions";
import screens from "../../navigation/NavigationScreens";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomScreen } from "../../components/CustomScreen";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { setFirstOpen } from "../../redux/reducers/authReducer/authSlice";
import { screenScale } from "../../utils/scaling";

const welcomeArray = [
    {
        id: 1,
        title: LABELS.WelcomeScreen.title1,
        text: LABELS.WelcomeScreen.text1,
        image: images.slide1,
        buttonName: LABELS.COMMON_LABELS.next
    },
    {
        id: 2,
        title: LABELS.WelcomeScreen.title2,
        text: LABELS.WelcomeScreen.text2,
        image: images.slide2,
        buttonName: LABELS.COMMON_LABELS.next
    },
    {
        id: 3,
        title: LABELS.WelcomeScreen.title3,
        text: LABELS.WelcomeScreen.text3,
        image: images.slide3,
        buttonName: LABELS.WelcomeScreen.letstart
    }
]

const WelcomeScreen = ({ navigation }: StackPropsType<"Welcome">) => {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch<AppDispatch>()
    const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(() => {
    },[]);
    const onNext = () => {
        if (currentIndex < 2) {
            setCurrentIndex(currentIndex + 1)
        } else {
            dispatch(setFirstOpen(false));
            navigate(screens.LOGIN, {})
        }
    }
        
  
    return (
      <CustomScreen>
        {/* <StatusBar backgroundColor={Colors.transparent} barStyle={"light-content"} /> */}
        <Image source={welcomeArray[currentIndex].image} style={styles.topImage} />
        <View style={styles.belowView}>
          <Text style={styles.title}>{welcomeArray[currentIndex].title}</Text>
          <Text style={styles.text}>{welcomeArray[currentIndex].text}</Text>
          <View style={[styles.dotRoot, { position: 'absolute', bottom: insets.bottom + screenScale(120) }]} >
            <View style={currentIndex === 0 ? styles.dotViewSelected : styles.dotView}></View>
            <View style={currentIndex === 1 ? styles.dotViewSelected : styles.dotView}></View>
            <View style={currentIndex === 2 ? styles.dotViewSelected : styles.dotView}></View>
          </View>
          {currentIndex !== 2 && <Text onPress={() => { dispatch(setFirstOpen(false)), navigate(screens.LOGIN, {})}} style={[styles.skipText, {position: 'absolute', bottom: insets.bottom + screenScale(82)}]}>{LABELS.COMMON_LABELS.skip}</Text>}
          <CustomButton
            customStyle={{ position: 'absolute', bottom: insets.bottom + 8 }}
            title={welcomeArray[currentIndex].buttonName}
            onPress={() => onNext()}
          />
        </View>
        </CustomScreen>
    );
  };
  
  export default WelcomeScreen;