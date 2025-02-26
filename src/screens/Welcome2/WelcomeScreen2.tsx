import { useEffect } from "react";
import { StackPropsType } from "../../navigation/NavigationProps";
import CustomPhoneInput from "../../components/CustomPhoneInput";
import { Image, Text, View } from "react-native";
import images from "../../theme/imageIndex";
import styles from "./WelcomeScreen2Style";
import { LABELS } from "../../locales/common";
import CustomButton from "../../components/CustomButton";
import { Colors } from "../../theme";
import { navigate } from "../../navigation/RootNavigationFunctions";
import screens from "../../navigation/NavigationScreens";

const WelcomeScreen2 = ({ navigation }: StackPropsType<"Welcome2">) => {
    useEffect(() => {
    },[]);
        
  
    return (
      <View style={styles.rootView}>
        <Image source={images.slide2} style={styles.topImage} />
        <View style={styles.belowView}>
          <Text style={styles.title}>{LABELS.WelcomeScreen.title2}</Text>
          <Text style={styles.text}>{LABELS.WelcomeScreen.text2}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24, paddingHorizontal: 10, justifyContent: 'space-around', width: '20%' }} >
            <View style={{ height: 8, width: 8, backgroundColor: Colors.placeHolderText, borderRadius: 90 }}></View>
            <View style={{ height: 8, width: 8, backgroundColor: Colors.primary, borderRadius: 90 }}></View>
            <View style={{ height: 8, width: 8, backgroundColor: Colors.placeHolderText, borderRadius: 90 }}></View>
          </View>
          <Text style={styles.skipText}>{LABELS.COMMON_LABELS.skip}</Text>
          <CustomButton
            customStyle={{ position: 'absolute', bottom: 0 }}
            title={LABELS.COMMON_LABELS.next}
            onPress={() => navigate(screens.WELCOMESCREEN3, {})}
          />
        </View>
      </View>
    );
  };
  
  export default WelcomeScreen2;