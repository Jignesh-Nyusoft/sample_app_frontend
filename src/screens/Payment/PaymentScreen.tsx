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
import { goBack, navigate } from "../../navigation/RootNavigationFunctions";
import { LABELS } from "../../locales/common";
import { CommonStyleSheets } from "../../utils/CommonStyle";
import CustomButton from "../../components/CustomButton";
import screens from "../../navigation/NavigationScreens";
import { CustomOrderSummary } from "../../components/CustomOrderSummary";
import styles from "./PaymentScreenStyles";
import { CustomRadio } from "../../components/CustomRadio";
import images from "../../theme/imageIndex";
import { createOrder, orderCheckout } from "../../redux/actions/orderActions";
import { CreateOrderResponse } from "../../redux/types/orderTypes";
import { PlatformPay, confirmPlatformPayPayment, initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import { isIOS } from "../../utils/CommonFunctions";

const PaymentScreen = ({ navigation, route }: StackPropsType<"Payment">) => {
    const dispatch = useDispatch<AppDispatch>();
    const {profileData} = useSelector((state: RootState) => state.profileSlice);
    const {isSkeleton, skeletonName} = useSelector((state: RootState) => state.loaderSlice);
    const { paymentData } = route.params;
    const [isApplePay, setIsApplePay] = useState<boolean>(false)
    useEffect(() => {
      console.log(" payment data =>", paymentData);

    },[route]);

    const orderCheckoutCall = (intent_id: string, type: any, orderId: number) => {
      dispatch(orderCheckout({body : {
        order_intent_id: intent_id,
        type: type,
        order_id: orderId
      }}))
      .unwrap()
      .then(async(res: any) => {
        let resp = res?.data ? res.data : res;
        if (resp) {
          console.log(" order checkout response", resp)
          navigate(screens.ORDER_SUCCESS, {})
        }
      })
    }

    const onPayment = async() => {
      // dispatch(createOrder({body : paymentData.createOrderBody}))
      // .unwrap()
      // .then(async(res: any) => {
      //   let resp = res?.data ? res.data : res;
      //   if (resp) {
      //     let orderCreated : CreateOrderResponse = resp
      //     console.log(" order created: ", orderCreated)
          if (isApplePay) {
            const { error, paymentIntent } = await confirmPlatformPayPayment(
              paymentData?.createOrderBody?.payment_intent_secret_id,
              {
                applePay: {
                  cartItems: [
                    {
                      label: "GreenClusta",
                      amount: `${paymentData?.createOrderBody?.total_amount}`,
                      paymentType: PlatformPay.PaymentType.Immediate,
                    },
                  ],
                  merchantCountryCode: "US",
                  currencyCode: "USD",
  
                  // requiredShippingAddressFields: [PlatformPay.ContactField.PostalAddress],
                  // requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
                },
              }
            );
            if (error && error.code === "Canceled") {
              console.log("payment sheet error ", error);
            } else {
              console.log("payment success");
              orderCheckoutCall(paymentData?.createOrderBody?.payment_intent_secret_id, "applepay", paymentData?.createOrderBody?.id)
              // savePaymentWithApi(resp?.response.payment_intent_id, 3);
            }
        } else {
          await initPaymentSheet({
            merchantDisplayName: "GreenClusta",
            customerId: paymentData?.createOrderBody?.stripe_customer_id,
            customerEphemeralKeySecret:
            paymentData?.createOrderBody?.ephemeral_key_secret_id,
            paymentIntentClientSecret:
            paymentData?.createOrderBody?.payment_intent_secret_id,
            // applePay: {
            //   merchantCountryCode: "CO",
            // },
            // googlePay: {
            //   merchantCountryCode: "CO",
            //   testEnv: true,
            //   currencyCode: "COP",
            // },
            appearance: {
              primaryButton: {
                shapes: {
                  borderRadius: 15,
                  borderWidth: 0.5,
                },
                colors: {
                  background: Colors.primary,
                },
              },
              colors: {
                primary: Colors.primary,
              },
            },
          })
            .then(async (r) => {
              const { error, paymentOption } = await presentPaymentSheet();
              if (error && error.code === "Canceled") {
                console.log("payment sheet error ", error);
              } else {
                console.log("payment success");
                orderCheckoutCall(paymentData?.createOrderBody?.payment_intent_secret_id, null, paymentData?.createOrderBody?.id)
                // savePaymentWithApi(resp?.response.payment_intent_id, 3);
              }
            })
            .catch((error) => {
              console.log(error, "catch error");
            });
        }
      // }

      //   console.log(" create order response", resp)
      // })
       // navigate(screens.ORDER_SUCCESS, {})
    }

    const renderButton = () => (
        <View
          style={[
            CommonStyleSheets.commonBottomView
            
          ]}>
          <CustomButton
            // customStyle={styles.buttonStyle}
            title={LABELS.PaymentScreen.continuePayment}
            onPress={() => onPayment()}
          />
        </View>
      );
        
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
       <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={LABELS.PaymentScreen.header}
        showBack
      />
      <View style={CommonStyleSheets.commonMainView} >
      <Text style={styles.titleText}>{LABELS.PaymentScreen.payWith}</Text>
        {isIOS() && <TouchableOpacity onPress={() => setIsApplePay(true)} style={styles.applePayView}>
          <CustomRadio disabled value={isApplePay} />
          <Image style={styles.cardImage} source={images.applePay} />
          <Text style={styles.addCard} >{LABELS.PaymentScreen.applePay}</Text>
        </TouchableOpacity>}
        <TouchableOpacity onPress={() => setIsApplePay(false)} style={[styles.applePayView, { marginTop: screenScale(12) }]}>
        <CustomRadio disabled value={!isApplePay} />
          <Image style={styles.cardImage} source={images.card} />
          <Text style={styles.addCard} >{LABELS.PaymentScreen.creditDebitCard}</Text>
        </TouchableOpacity>
        <CustomOrderSummary summaryData={paymentData?.summaryData} />
      </View>
      {renderButton()}
      </CustomScreen>
    );
  };
  
  export default PaymentScreen;