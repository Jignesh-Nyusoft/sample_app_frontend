import { useEffect, useState } from "react";
import { StackPropsType } from "../../navigation/NavigationProps";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import images from "../../theme/imageIndex";
import { LABELS } from "../../locales/common";
import { CustomScreen } from "../../components/CustomScreen";
import styles from "./RegistrationSuccessScreenStyle";
import { navigate } from "../../navigation/RootNavigationFunctions";
import screens from "../../navigation/NavigationScreens";
import { CommonActions } from "@react-navigation/native";

const RegistrationSuccessScreen = ({ navigation }: StackPropsType<"RegistrationSuccess">) => {

    return (
      <CustomScreen customStyle={{alignItems: 'center'}}>
        {/* <Text>Success SCreen</Text> */}
        <ImageBackground 
            source={images.successBackground}
            // imageStyle={{ height: '100%', width: '100%',}}
            style={{ flex: 1, height: '100%', width: '100%', }}
        >
            <View style={styles.mainView}>
                <Image source={images.bigTrue} style={styles.bigTrue} />
                <Text style={styles.topText}>{LABELS.RegistrationSuccessScreen.allSet}</Text>
                <Text style={styles.subText}>{LABELS.RegistrationSuccessScreen.subText}</Text>
                <View style={styles.bottomView}>
                    <TouchableOpacity onPress={() => {
                        navigation.dispatch(
                            CommonActions.reset({
                              index: 2, // Index of the active screen (0 means the first screen)
                              routes: [
                                { name: 'BottomTabs', state: { routes: [{ name: 'Profile' }] } },
                                { name: 'MyProducts' },
                                { name: 'AddNewProduct', params: {} },
                              ],
                            })
                          );
                        // navigation.navigate("BecomeASeller")
                        }} style={styles.buttons}>
                        <Image style={styles.buttonIcon} source={images.storeIcon} />
                        <Text style={styles.buttonText}>{LABELS.RegistrationSuccessScreen.startSelling}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate("BottomTabs", {})} style={styles.buttons}>
                        <Image style={styles.buttonIcon} source={images.cartIcon} />
                        <Text style={styles.buttonText}>{LABELS.RegistrationSuccessScreen.startShopping}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ImageBackground>
      </CustomScreen>
    );
  };
  
  export default RegistrationSuccessScreen;