import { useEffect, useState } from "react";
import { StackPropsType, tabStackProps } from "../../navigation/NavigationProps";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CustomScreen } from "../../components/CustomScreen";
import StepIndicator from 'react-native-step-indicator';
import { Colors, Font, fontSize } from "../../theme";
import { screenScale } from "../../utils/scaling";
import CustomHeader from "../../components/CustomHeader";
import { goBack, navigate } from "../../navigation/RootNavigationFunctions";
import { LABELS } from "../../locales/common";
import { CustomOrderCard } from "../../components/CustomOrderCard";
import { dummyOrderList, dummyProductData } from "../../utils/dummyData";
import styles from "./OrderDetailsScreenStyle";
import { CommonStyleSheets } from "../../utils/CommonStyle";
import { CustomOrderStatusBar } from "../../components/CustomOrderStatusBar";
import images from "../../theme/imageIndex";
import ReadMore from "@fawazahmed/react-native-read-more";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { getOrderDetails, markAsDelivered } from "../../redux/actions/orderActions";
import { OrderDetails } from "../../redux/types/orderTypes";
import { CustomOrderSummary } from "../../components/CustomOrderSummary";
import { customCommonSeketon } from "../../utils/CommonSkeletons";
import { combineAddress, formattedDateTime } from "../../utils/CommonFunctions";
import { readNotification } from "../../redux/actions/profileActions";
import CustomButton from "../../components/CustomButton";
import screens from "../../navigation/NavigationScreens";

const OrderDetailsScreen = ({ navigation, route }: StackPropsType<"OrderDetails">) => {
  const [currentPosition, setCurrentPosition] = useState(0)
  const { orderItem, isFrom } = route.params;
  const {isSkeleton, skeletonName} = useSelector(
    (state: RootState) => state.loaderSlice,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [orderDetails, setOrderDetails] = useState<OrderDetails>();
  useEffect(() => {

    dispatch(getOrderDetails(orderItem.id))
    .unwrap()
    .then((res: any) => {
      let resp = res?.data ? res.data : res;
      if (resp) {
        setOrderDetails(resp);
        setTimeout(() => {
          setCurrentPosition(resp?.orderstatus?.length -1)
        }, 500);
      }
    });
    if (isFrom === "Notifications" && orderItem?.notification_id) {
      dispatch(readNotification(orderItem?.notification_id))
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        if (resp) {
          console.log(" read notification response")
        }
      });
    }
        // [0,1,2,3].forEach((item) => {
        //   setTimeout(() => {
        //   setCurrentPosition(2)
        // }, 1000);
        // })
    },[route]);

    useEffect(() => {
      console.log("item product =>",orderDetails)
    }, [orderDetails])

    const markAsDeliveredAPICall = async(type: string) => {
      let body = {
        id: orderDetails?.id || 0,
        type: type
      }
      dispatch(markAsDelivered(body))
        .unwrap()
        .then((res: any) => {
          let resp = res?.data ? res.data : res;
          if (resp) {
            dispatch(getOrderDetails(orderItem.id))
              .unwrap()
              .then((res: any) => {
                let resp = res?.data ? res.data : res;
                if (resp) {
                  setOrderDetails(resp);
                  setTimeout(() => {
                    setCurrentPosition(resp?.orderstatus?.length - 1);
                  }, 500);
                }
              });
          }
        });
    }

    const getMethodName = (id: number) => {
      if (id === 1) return "Uber Direct"
      if (id === 2) return "USPS Delivery"
      if (id === 3) return "Drop-off/Pickup"
    }

    const renderOrderDetails = () => (
        <View>
            <Text style={styles.titles}>{LABELS.OrderDetailsScreen.header}</Text>
            {skeletonName.includes("orderDetails")  ? customCommonSeketon(screenScale(110), '100%')
        :<View style={[styles.borderView, { paddingBottom: screenScale(0) }]}>
                {/* <View style={styles.detailsItemView} >
                    <Text style={styles.detailsItemTitle}>{LABELS.OrderDetailsScreen.trackingId}</Text>
                    <Text style={styles.detailsItemText}>{"SKRKD745621"}</Text>
                </View> */}
                <View style={styles.detailsItemView} >
                    <Text style={styles.detailsItemTitle}>{LABELS.OrderDetailsScreen.paymentMethod}</Text>
                    <Text style={styles.detailsItemText}>{orderDetails?.payment_method}</Text>
                </View>
                <View style={styles.detailsItemView} >
                    <Text style={styles.detailsItemTitle}>{LABELS.OrderDetailsScreen.deliveryMethod}</Text>
                    <Text style={styles.detailsItemText}>{orderDetails?.order_shipment?.courier_partner_id && getMethodName(orderDetails?.order_shipment?.courier_partner_id)}</Text>
                </View>
                <View style={styles.detailsItemView} >
                    <Text style={styles.detailsItemTitle}>{LABELS.OrderDetailsScreen.totalAmount}</Text>
                    <Text style={styles.detailsItemText}>{"$" +orderDetails?.total_amount}</Text>
                </View>
            </View>}
            {skeletonName.includes("orderDetails")  ? customCommonSeketon(screenScale(90), '100%')
        :<View style={[styles.borderView, { marginTop: screenScale(8)}]} >
                {/* <Text style={styles.addressTitle}>{LABELS.OrderDetailsScreen.billingAddress}</Text>
                <Text style={styles.addressText}>{"2186 Joyce Street Rocky Mount New York -25645 United States"}</Text>
                <Text style={styles.seperator} numberOfLines={1} >{"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}</Text> */}
                <Text style={styles.addressTitle}>{LABELS.OrderDetailsScreen.shippingAddress}</Text>
                <Text style={styles.addressText}>{combineAddress(orderDetails?.deliveryaddress)}</Text>
            </View>}
        </View>
    )

    const renderOrderStatus = () => (
      <>
      <View> 
            <Text style={styles.titles}>{LABELS.OrderDetailsScreen.orderStatus}</Text>
            {skeletonName.includes("orderDetails")  ? customCommonSeketon(screenScale(300), '100%')
        : <View style={[styles.borderView, { paddingVertical: screenScale(0) }]} >
              {orderDetails && <CustomOrderStatusBar hideShipping={orderDetails?.is_offline_delivery === 1} orderStatusArray={orderDetails?.orderstatus} currentPosition={currentPosition} />}
            </View>}
        </View>
</>
    )

    const renderOrderSummary = () => (
      <CustomOrderSummary summaryData={orderDetails && {
        total_amount: orderDetails?.total_amount,
        service_fee: orderDetails?.service_fee,
        net_amount: orderDetails?.net_amount,
        shipping_charges: orderDetails?.delivery_charge,
        // tax: orderDetails?.buyer_tax,
        discount_price: orderDetails?.discount_price ?? "0.0",
        sales_tax_amount: orderDetails?.sales_tax_amount,
        stripe_platform_fee: orderDetails?.stripe_platform_fee

      }} 
      skeletonShow={skeletonName.includes("orderDetails")}
      />
    )

    const renderReviewImages = (images: any) => (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} >
          {images.map((item: any, index: number) => (
            <Image key={item?.review_image} style={styles.reviewImage} source={{ uri : item?.review_image}} />
          ))}
        </View>
      )

    const renderReview = () => (
        <View style={{ }}>
            <Text style={styles.titles}>{isFrom === "MyProducts" ? LABELS.OrderDetailsScreen.buyerReview : LABELS.OrderDetailsScreen.yourReviews}</Text>
            <View style={styles.listItemView}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={styles.buyerImage} source={{ uri: orderDetails?.review?.review_given_by_user?.user_image }} defaultSource={images.emptyUser} />
          <Text style={styles.buyerName}>{orderDetails?.review?.review_given_by_user?.first_name + " " + orderDetails?.review?.review_given_by_user?.last_name}</Text>
        </View>
      <View style={styles.reviewDetailView}>
        <View style={{ }}>
            <Text style={styles.sellerLocationText}>
              {formattedDateTime(orderDetails?.review?.created_at)}
            </Text>
        </View>
        <View style={styles.ratingView}>
          <Image source={images.starIcon} />
          <Text style={styles.reviewsText}>
            {orderDetails?.review?.rating?.toFixed(1)}
          </Text>
        </View>
      </View>

      <ReadMore
        numberOfLines={3}
        seeMoreText={LABELS.SellerInfoScreen.readMore}
        seeLessText={LABELS.SellerInfoScreen.readLess}
        seeMoreStyle={styles.readMoreText}
        seeLessStyle={styles.readMoreText}
        style={styles.sellerText}>
        {orderDetails?.review?.review}
      </ReadMore>
      {renderReviewImages(orderDetails?.review?.review_images)}
    </View>
    </View>
    )

    const renderButton = () => (
      <View
        style={[
          CommonStyleSheets.commonBottomView
        ]}>
        <CustomButton
          // customStyle={styles.buttonStyle}
          title={LABELS.OrderDetailsScreen.addReview}
          onPress={() => navigate(screens.ADD_REVIEW, { orderItem: orderDetails })}
        />
      </View>
    );

    const renderDeliveredButton = () => (
      <View
        style={[
          CommonStyleSheets.commonBottomView
        ]}>
        <CustomButton
          // customStyle={styles.buttonStyle}
          title={LABELS.OrderDetailsScreen.markDelivered}
          onPress={() => markAsDeliveredAPICall("seller")}
        />
      </View>
    );

    const renderRecievedButton = () => (
      <View
        style={[
          CommonStyleSheets.commonBottomView,
          { flexDirection: 'column' }
        ]}>
        <CustomButton
          // customStyle={styles.buttonStyle}
          title={LABELS.OrderDetailsScreen.markReceived}
          onPress={() => markAsDeliveredAPICall("customer")}
        />
        <Text style={styles.bottomText}>
              <Text style={[styles.bottomText, {color: Colors.secondoryText}]}>
                {LABELS.OrderDetailsScreen.didNotRecieve}
              </Text>
              <Text
                onPress={() => navigate(screens.CONTACT_US, {})}
                style={[styles.bottomText, {color: Colors.primaryText}]}>
                {LABELS.OrderDetailsScreen.contactUs}
              </Text>
            </Text>
      </View>
    );
        
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
        <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={LABELS.OrderDetailsScreen.header}
        subTitle={"Order ID: " + (orderDetails?.order_number && orderDetails?.order_number)}
        showBack
      />
      <ScrollView style={[CommonStyleSheets.commonMainView, { paddingTop: screenScale(16) }]} >
        {skeletonName.includes("orderDetails")  ? customCommonSeketon(screenScale(105), '100%') : <CustomOrderCard 
            item={orderDetails?.order_item?.product}
            isOrder
            orderData={orderDetails}
            inDetails={true}
        />}
        {orderDetails?.review && renderReview()}
        {renderOrderDetails()}
        {orderDetails && renderOrderStatus()}
        {renderOrderSummary()}
        <View style={{ paddingBottom: screenScale(120)}} />
        </ScrollView>
        {orderDetails?.delivery_status === "delivered" && !orderDetails?.review && isFrom !== "MyProducts" && renderButton()}
        {orderDetails?.is_offline_delivery === 1 && orderDetails?.mark_as_delivered__seller !== 1 && isFrom === "MyProducts" && renderDeliveredButton()}
        {orderDetails && orderDetails?.is_offline_delivery === 1 && orderDetails?.mark_as_delivered__seller === 1 && orderDetails?.mark_as_delivered_customer === 0 && isFrom !== "MyProducts" && renderRecievedButton()}
      </CustomScreen>
    );
  };
  
  export default OrderDetailsScreen;