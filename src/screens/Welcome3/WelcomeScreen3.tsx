import { useEffect } from "react";
import { StackPropsType } from "../../navigation/NavigationProps";
import CustomPhoneInput from "../../components/CustomPhoneInput";
import { Image, Text, View } from "react-native";
import images from "../../theme/imageIndex";
import styles from "./WelcomeScreen3Style";
import { LABELS } from "../../locales/common";
import CustomButton from "../../components/CustomButton";
import { Colors } from "../../theme";

const WelcomeScreen3 = ({ navigation }: StackPropsType<"Welcome3">) => {
    useEffect(() => {
    },[]);
        
  
    return (
      <View style={styles.rootView}>
        <Image source={images.slide3} style={styles.topImage} />
        <View style={styles.belowView}>
          <Text style={styles.title}>{LABELS.WelcomeScreen.title3}</Text>
          <Text style={styles.text}>{LABELS.WelcomeScreen.text3}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24, paddingHorizontal: 10, justifyContent: 'space-around', width: '20%' }} >
            <View style={{ height: 8, width: 8, backgroundColor: Colors.placeHolderText, borderRadius: 90 }}></View>
            <View style={{ height: 8, width: 8, backgroundColor: Colors.placeHolderText, borderRadius: 90 }}></View>
            <View style={{ height: 8, width: 8, backgroundColor: Colors.primary, borderRadius: 90 }}></View>
          </View>
          {/* <Text style={styles.skipText}>{LABELS.COMMON_LABELS.skip}</Text> */}
          <CustomButton
            customStyle={{ position: 'absolute', bottom: 0 }}
            title={LABELS.WelcomeScreen.letstart}
            onPress={() => {}}
          />
        </View>
      </View>
    );
  };
  
  export default WelcomeScreen3;