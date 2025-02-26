import { useEffect, useState } from "react";
import { StackPropsType, tabStackProps } from "../../navigation/NavigationProps";
import { FlatList, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CustomScreen } from "../../components/CustomScreen";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { getCmsData } from "../../redux/actions/generalActions";
import CustomHeader from "../../components/CustomHeader";
import { screenScale, screenWidthPercentage } from "../../utils/scaling";
import { Colors } from "../../theme";
import { goBack, navigate } from "../../navigation/RootNavigationFunctions";
import { LABELS } from "../../locales/common";
import { CommonStyleSheets } from "../../utils/CommonStyle";
import CustomButton from "../../components/CustomButton";
import screens from "../../navigation/NavigationScreens";
import { SkeletonData } from "../../utils/commonData";
import styles from "./PaymentDetailsScreenStyle";
import { CustomCard } from "../../components/CustomCard";
import images from "../../theme/imageIndex";
import { deleteCard, getCardList, makeDefaultCard } from "../../redux/actions/profileActions";
import { CardItem } from "../../redux/types/profileTypes";
import { customCommonSeketon } from "../../utils/CommonSkeletons";
import { setDialogData } from "../../redux/reducers/AlertReducer/alertSlice";
import { showToast } from "../../utils/CommonFunctions";

const dummyCards = [
    {
        id: 1,
        holderName: "Jenny Wilson",
        cardNumber: "123456789123",
        expiryDate: "May 2028",
        isDefault: false
    },
    {
        id: 2,
        holderName: "Jenny Wilson",
        cardNumber: "123456789123",
        expiryDate: "May 2028",
        isDefault: false
    },
]

const PaymentDetailsScreen = ({ navigation }: StackPropsType<"PaymentDetails">) => {
    const dispatch = useDispatch<AppDispatch>();
    const {profileData} = useSelector((state: RootState) => state.profileSlice);
    const {isSkeleton, skeletonName} = useSelector((state: RootState) => state.loaderSlice);
    const [cardsData, setCardsData] = useState<CardItem[] | any>([])
    const [defaultCard, setDefaultCard] = useState()
    useEffect(() => {
     getAllCards()
    },[]);

    const getAllCards = () => {
        dispatch(getCardList())
        .unwrap()
        .then((res: any) => {
          let resp = res?.data ? res.data : res;
          setCardsData(resp?.cards)
          setDefaultCard(resp?.default_card?.id)
          console.log(" card list data ",resp)
        });
      }

      const deleteCardItem = (item: CardItem) => { 
        dispatch(
          setDialogData({
            isVisible: true,
            title: LABELS.PaymentDetailsScreen.deleteCard,
            description: LABELS.PaymentDetailsScreen.sureDeleteCard,
            doneButtonText: LABELS.COMMON_LABELS.yes,
            onDone: () => {
              dispatch(
                deleteCard(item.id),
              )
                .unwrap()
                .then((res: any) => {
                  let resp = res?.data ? res.data : res;
                  if (resp) {
                    showToast(resp?.message, "success");
                    getAllCards()
                  }
                });
            },
            onCancel: () => {},
          }),
        );
      }

      const makeDefault = (item: CardItem) => {
        dispatch(
          makeDefaultCard(item.id),
        )
          .unwrap()
          .then((res: any) => {
            let resp = res?.data ? res.data : res;
            if (resp) {
              showToast(resp?.message, "success");
              getAllCards()
            }
          });
      }

    const renderCardItem = (item: CardItem, index: number) => (
        <>{skeletonName.includes("cardList") ? customCommonSeketon(screenScale(100), "100%") : 
        <CustomCard 
            cardData={item}
            isDefault={defaultCard === item?.id}
            onDelete={() => deleteCardItem(item)}
            onMakeDefault={() => makeDefault(item)}
        />
    }</>
)
        
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
       <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={LABELS.PaymentDetailsScreen.header}
        showBack
      />
      <View style={CommonStyleSheets.commonMainView}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={skeletonName.includes("cardList") ? SkeletonData : cardsData}
        contentContainerStyle={styles.flatContainer}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => renderCardItem(item, index)}
        // ListEmptyComponent={renderEmpty}
        // ListFooterComponent={() => 
        // <View style={{ marginTop: screenScale(0), marginBottom: screenScale(88) }}>
        //     <TouchableOpacity style={styles.addCardView}>
        //         <Image style={styles.cardImage} source={images.card} />
        //         <Text style={styles.addCard} >{LABELS.PaymentDetailsScreen.addCard}</Text>
        //         <Image style={styles.rightArrow} source={images.rightArrow} />
        //     </TouchableOpacity>
        // </View>}
      />
      </View>
      </CustomScreen>
    );
  };
  
  export default PaymentDetailsScreen;