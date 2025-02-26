import { useEffect, useState } from "react";
import { StackPropsType, tabStackProps } from "../../navigation/NavigationProps";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CustomScreen } from "../../components/CustomScreen";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { getCmsData } from "../../redux/actions/generalActions";
import CustomHeader from "../../components/CustomHeader";
import { screenWidthPercentage } from "../../utils/scaling";
import { Colors } from "../../theme";
import { goBack } from "../../navigation/RootNavigationFunctions";
import { LABELS } from "../../locales/common";
import styles from "./OrderSuccessScreenStyle";
import images from "../../theme/imageIndex";
import { CommonStyleSheets } from "../../utils/CommonStyle";
import CustomButton from "../../components/CustomButton";

const OrderSuccessScreen = ({ navigation }: StackPropsType<"OrderSuccess">) => {
    const dispatch = useDispatch<AppDispatch>();
    const {profileData} = useSelector((state: RootState) => state.profileSlice);
    const {isSkeleton, skeletonName} = useSelector((state: RootState) => state.loaderSlice);
    useEffect(() => {
      
    },[]);

    const onContinue = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "BottomTabs" }],
          });
    }

    const renderButton = () => (
        <View
          style={[
            CommonStyleSheets.commonBottomView
          ]}>
          <CustomButton
            // customStyle={styles.buttonStyle}
            title={LABELS.OrderSuccessScreen.continueShopping}
            onPress={() => onContinue()}
          />
        </View>
      );
        
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
       <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={""}
        showBack={false}
      />
      <View style={[CommonStyleSheets.commonMainView, { alignItems: 'center' }]}>
        <Image style={styles.bigImage} source={images.orderSuccess} />
        <Text style={styles.bigText}>{LABELS.OrderSuccessScreen.bigText}</Text>
        <Text style={styles.smallText}>{LABELS.OrderSuccessScreen.smallText}</Text>
      </View>
      {renderButton()}
      </CustomScreen>
    );
  };
  
  export default OrderSuccessScreen;