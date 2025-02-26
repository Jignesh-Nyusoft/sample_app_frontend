import { useEffect, useState } from "react";
import { StackPropsType, tabStackProps } from "../../navigation/NavigationProps";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CustomScreen } from "../../components/CustomScreen";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { getCmsData } from "../../redux/actions/generalActions";
import CustomHeader from "../../components/CustomHeader";
import { screenScale, screenWidthPercentage } from "../../utils/scaling";
import { Colors } from "../../theme";
import { goBack } from "../../navigation/RootNavigationFunctions";
import { LABELS } from "../../locales/common";
import RenderHtml from 'react-native-render-html';
import { CommonStyleConstants } from "../../utils/CommonStyle";
import images from "../../theme/imageIndex";

const PrivacyPolicyScreen = ({ navigation }: StackPropsType<"PrivacyPolicy">) => {
    const dispatch = useDispatch<AppDispatch>();
    const {profileData} = useSelector((state: RootState) => state.profileSlice);
    const {isSkeleton, skeletonName} = useSelector((state: RootState) => state.loaderSlice);
    const [termsData, setTermsData] = useState()
    useEffect(() => {
        dispatch(getCmsData("privacy-policy"))
        .unwrap()
        .then((res: any) => {
          let resp = res?.data ? res.data : res;
          setTermsData(resp?.content)
          console.log('privacy policy data', resp?.content);
        });
    },[]);
        
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
       <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={LABELS.PrivacyPolicyScreen.header}
        showBack
      />
      <ScrollView style={{ width: screenWidthPercentage(100), paddingHorizontal: CommonStyleConstants.commonScreenPadding }}>
      {termsData && <RenderHtml
      contentWidth={screenWidthPercentage(100)}
      source={{
        html: `${termsData}`
      }}
    />}
    {termsData && <Image source={images.bottomLogo} style={{ alignSelf: 'center', marginTop: screenScale(12), marginBottom: screenScale(12) }} />}
    </ScrollView>
      </CustomScreen>
    );
  };
  
  export default PrivacyPolicyScreen;