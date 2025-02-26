import { useEffect, useState } from "react";
import { StackPropsType, tabStackProps } from "../../navigation/NavigationProps";
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { CustomScreen } from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { goBack } from "../../navigation/RootNavigationFunctions";
import { Colors } from "../../theme";
import { LABELS } from "../../locales/common";
import styles from "./EarningsScreenStyle";
import { CommonStyleSheets } from "../../utils/CommonStyle";
import images from "../../theme/imageIndex";
import CustomButton from "../../components/CustomButton";
import { CustomEmptyView } from "../../components/CustomEmptyView";
import { dummyTransactions } from "../../utils/dummyData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { getTransactionHistory } from "../../redux/actions/profileActions";
import { TransactionItem } from "../../redux/types/profileTypes";
import _ from "lodash";
import { SkeletonData } from "../../utils/commonData";
import { customCommonSeketon } from "../../utils/CommonSkeletons";
import { screenScale } from "../../utils/scaling";
import { formattedDateTime, getOnlyTimeEstimatedString, getTimeEstimatedString } from "../../utils/CommonFunctions";

const EarningsScreen = ({ navigation }: StackPropsType<"Earnings">) => {
    const { skeletonName } = useSelector(
        (state: RootState) => state.loaderSlice
      );
      const { profileData } = useSelector(
        (state: RootState) => state.profileSlice
      );
      const dispatch = useDispatch<AppDispatch>(); 
      const [transactionList, setTransactionList] = useState<TransactionItem[] | any>()

      const getTransactions = () => {
        dispatch(getTransactionHistory())
        .unwrap()
        .then((res: any) => {
          let resp = res?.data ? res.data : res;
          if (resp) {
            setTransactionList(_.assign(resp))
          }
          
        });
      }
    useEffect(() => {
        getTransactions()
    },[]);

    const renderTopView = () => (
        <View style={styles.topView}>
            <View style={styles.earningTop}>
                <Text style={styles.titleText}>{LABELS.EarningsScreen.earnings}</Text>
                <Text style={styles.amountText}>{"$ " + profileData?.my_earning}</Text>
                <Image style={styles.moneyBag} source={images.moneyBag} />
            </View>
            <View style={styles.devider} />
            <View style={styles.earningBelow}>
                <Text style={styles.titleText}>{LABELS.EarningsScreen.connectPaymentAccount}</Text>
                <Text style={styles.cardText}>{profileData?.Stripe_connect_ac_id ?? "Not Connected"}</Text>
                {/* <CustomButton
                    title={LABELS.EarningsScreen.change}
                    onPress={() => {}}
                    customStyle={styles.changeButton}
                /> */}
            </View>
        </View>
    )

    const renderEmpty = () => (
        <CustomEmptyView
            text={LABELS.EarningsScreen.noTransactions}
            image={images.emptyEarning}
            customStyle={styles.empty}
        />
    )

    const renderTransactions = () => (
        <View>
            <Text style={styles.transactionText}>{LABELS.EarningsScreen.transactions}</Text>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={skeletonName.includes("transactionHistory") ? SkeletonData : transactionList}
            contentContainerStyle={styles.flatContainer}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => renderTransactionItem(item, index)}
            ListEmptyComponent={renderEmpty}
            />
        </View>
    )

    const renderTransactionItem = (item: TransactionItem, index: number) => (
        <>{skeletonName.includes("transactionHistory") ? customCommonSeketon(screenScale(70), '100%') :
        <View style={styles.listItem}>
            <Text style={styles.itemTitle}>{item?.order?.order_item?.product?.product_name}</Text>
            <Text style={styles.itemDate}>{formattedDateTime(item.created_at)}</Text>
            <Text style={styles.itemAmount}>{"+ $" + item?.net_amount}</Text>
        </View>
        }</>
    )
        
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
        <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={LABELS.EarningsScreen.earningsTransactions}
        showBack
      />
      <View style={[CommonStyleSheets.commonMainView, { paddingBottom: screenScale(88)  }]}>
        {renderTopView()}
        {renderTransactions()}
      </View>
      </CustomScreen>
    );
  };
  
  export default EarningsScreen;