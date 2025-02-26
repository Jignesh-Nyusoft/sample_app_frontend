import { createRef, useEffect, useState } from "react";
import { StackPropsType, tabStackProps } from "../../navigation/NavigationProps";
import { FlatList, Image, ImageBackground, Keyboard, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CustomScreen } from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { goBack } from "../../navigation/RootNavigationFunctions";
import { Colors } from "../../theme";
import { LABELS } from "../../locales/common";
import { CommonStyleSheets } from "../../utils/CommonStyle";
import { CustomScrollView } from "../../components/CustomScrollView";
import { createImagesArray, getFileName, hasNotch, isIOS, showToast } from "../../utils/CommonFunctions";
import { CustomOrderCard } from "../../components/CustomOrderCard";
import { dummyOrderList } from "../../utils/dummyData";
import styles from "./AddReviewScreenStyle";
import { Rating } from 'react-native-ratings';
import images from "../../theme/imageIndex";
import CustomInput from "../../components/CustomInput";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { CustomDottedButton } from "../../components/CustomDottedButton";
import { screenScale } from "../../utils/scaling";
import CustomButton from "../../components/CustomButton";
import useSelectImage from "../../hooks/useSelectImage";
import { ImageOrVideo } from "react-native-image-crop-picker";
import { addReview } from "../../redux/actions/orderActions";
import { STATUS_CODES } from "../../utils/CommonConstants";

const AddReviewScreen = ({ navigation, route }: StackPropsType<"AddReview">) => {
    const [ratingValue, setRatingValue] = useState(0)
    const [description, setDescription] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [reviewImages, setReviewImages] = useState<any[]>([]);
    const descriptionRef = createRef<TextInput | null>();
    const { orderItem } = route?.params;
    let {onImageSelect} = useSelectImage();
    const { isSkeleton, skeletonName } = useSelector(
      (state: RootState) => state.loaderSlice
    );
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      console.log(" order item in review", orderItem)
    },[]);

    const onUploadPhotoPress = () => {
      if (reviewImages.length < 10) {
      onImageSelect(undefined,undefined,true).then(img => {
        let res = img as ImageOrVideo[];
        console.log("image res", res);
        if (res) {
          let newImageArray: ImageOrVideo[] = [];
          if (res?.length > 0) {
            
            res?.forEach(image => {
            if (image?.size > 3145728) {
              showToast("Maximum allowed image size is 3 MB", "error")
            } else {
              let tempImg: any = {
                type: image?.mime,
                name: getFileName(image?.path),
                uri: Platform.OS == 'ios' ? 'file://' + image?.path : image?.path,
              };
                newImageArray.push(tempImg);
            }
            })
          }
          console.log("image array", newImageArray);
          setReviewImages([...reviewImages ,...newImageArray])
        }
      });
    }
    }

    const enableButton = () => {
      if (ratingValue === 0) return false
      if (description?.length === 0) return false
      return true;
    }

    const removeImage = (imageIndex: number) => { 
      let newArr = reviewImages;
      newArr.splice(imageIndex,1)
      setReviewImages(JSON.parse(JSON.stringify(newArr)));
    }

    const onAddReview = () => {
      let body = {
        order_id: orderItem?.id,
        review: description,
        rating: ratingValue,
      };
      if (reviewImages?.length > 0) {
        let newImages = reviewImages?.filter(image => image?.name)
        body = {
          ...body,
          ...createImagesArray(newImages, "images")
        }
      }
      dispatch(
        addReview({ body })
      )
        .unwrap()
        .then((res: any) => {
          let resp = res?.status ? res : res?.data;
          console.log(resp);
          if (resp && resp?.status === STATUS_CODES.SUCCESS) {
            showToast(resp?.message, "success")
            goBack()
          } else {
            // clear();
          }
        });
    }

    const renderRatingView = () => (
      <View style={styles.ratingView}>
        <Text style={styles.overallText} >{LABELS.AddReviewScreen.overallRating}</Text>
        <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={[1,2,3,4,5]}
        // contentContainerStyle={styles.flatItemContainer}
        keyExtractor={item => item.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity activeOpacity={1} onPress={() => setRatingValue(item)} >
              <Image tintColor={item > ratingValue ? Colors.placeHolderBorder : Colors.yellow } style={styles.singleStar} source={images.starRating} />
          </TouchableOpacity>
        )
        }
        ItemSeparatorComponent={() => <View style={styles.itemSeparator}/>}
      />
        {/* <Rating
          ratingCount={5}
          imageSize={50}
          // showRating
          type="custom"
          ratingImage={images.starRating}
          // ratingColor={Colors.yellow}
          ratingBackgroundColor={Colors.white}
          tintColor={Colors.grayBackground}
          onFinishRating={(data: any) => console.log(data)}
          starContainerStyle={ }
        /> */}
      </View>
    )

    const renderDetailedReview = () => (
      <View>
        <Text style={styles.detaildViewTitle} >{LABELS.AddReviewScreen.detailedReview}</Text>
        <CustomInput
          title={""}
          error={descriptionError}
          customContainerStyle={[styles.commonInput]}
          customStyle={CommonStyleSheets.multiLineStyle}
          textInputStyle={styles.inputStyle}
          value={description}
          multiline
          placeholder={LABELS.AddReviewScreen.detailedDescription}
          inputExtra={{
            maxLength: 500,
          }}
          refVal={descriptionRef}
          onChangeText={res => {
            setDescription(res);
          }}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />
      </View>
    )

    const renderButton = () => (
      <View
        style={[
          CommonStyleSheets.commonBottomView,
          {paddingBottom: hasNotch() ? screenScale(24) : screenScale(12)},
        ]}>
        <CustomButton
          // customStyle={styles.buttonStyle}
          disable={!enableButton()}
          title={LABELS.AddReviewScreen.submitReview}
          onPress={() => onAddReview()}
        />
      </View>
    );

    const renderImages = () => (
      <View style={{ flexDirection: 'row', marginBottom: screenScale(12) }}>
      {reviewImages?.map((item, index) => (
              <View style={{ width: '20%', justifyContent:'center', alignItems: 'center' }} key={item.uri}>
                <Image style={styles.reviewImage} source={{ uri: item.uri || item.image }} />
                <TouchableOpacity style={styles.crossView} onPress={() => removeImage(index)} >
                  <Image style={styles.cross} source={images.closeCircle} />
                </TouchableOpacity>
              </View>
            ))}
      </View>
    )
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
        <CustomHeader
        goBack={() => goBack()}
        container={{backgroundColor: Colors.white}}
        title={LABELS.AddReviewScreen.header}
        showBack
      />
      <CustomScrollView 
      extras={{ extraScrollHeight: isIOS() ? 56 : 56, enableOnAndroid: true }}
      customStyle={CommonStyleSheets.commonMainView}>
        <CustomOrderCard 
            item={orderItem?.orderitem?.product}
            isOrder
            orderData={orderItem}
            inDetails={true}
        />
        <View style={{ alignItems: 'center' }} >
          <Text style={styles.bigText} >{LABELS.AddReviewScreen.howsOrder}</Text>
        </View>
        {renderRatingView()}
        {renderDetailedReview()}
        {renderImages()}
        <CustomDottedButton 
          title={LABELS.AddReviewScreen.addImage}
          customImage={images.plusIcon}
          onPress={() => onUploadPhotoPress()}
        />
         <View style={{ marginBottom: screenScale(100) }} />
      </CustomScrollView>
      {renderButton()}
      </CustomScreen>
    );
  };
  
  export default AddReviewScreen;