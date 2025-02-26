import { useEffect, useState } from "react";
import { StackPropsType, tabStackProps } from "../../navigation/NavigationProps";
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { CustomScreen } from "../../components/CustomScreen";
import CustomHeader from "../../components/CustomHeader";
import { goBack, navigate } from "../../navigation/RootNavigationFunctions";
import { Colors, fontSize } from "../../theme";
import { LABELS } from "../../locales/common";
import { CustomDottedButton } from "../../components/CustomDottedButton";
import styles from "./SavedAddressScreenStyle";
import { dummyAddressData } from "../../utils/dummyData";
import images from "../../theme/imageIndex";
import { CustomEmptyView } from "../../components/CustomEmptyView";
import screens from "../../navigation/NavigationScreens";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { deleteAddress, getSavedAddresses } from "../../redux/actions/profileActions";
import { addressSkeleton } from "../../utils/CommonSkeletons";
import { SkeletonData } from "../../utils/commonData";
import CustomButton from "../../components/CustomButton";
import { CustomRadio } from "../../components/CustomRadio";
import { UserAddressItem } from "../../redux/types/profileTypes";
import _ from "lodash";
import { combineAddress, showToast } from "../../utils/CommonFunctions";
import { setDialogData } from "../../redux/reducers/AlertReducer/alertSlice";
import { screenScale } from "../../utils/scaling";

const SavedAddressScreen = ({ navigation, route }: StackPropsType<"SavedAddress">) => {
  const { profileData } = useSelector(
    (state: RootState) => state.profileSlice
  );
  const { skeletonName } = useSelector(
    (state: RootState) => state.loaderSlice
  );
  const dispatch = useDispatch<AppDispatch>(); 
  const { isFrom, addressItem, onSelect } = route.params;
  const [selectedAddress, setSelectedAddress] = useState(0)
  const [addressList, setAddressList] = useState<UserAddressItem[] | any>()
  useEffect(() => {
    getAllAddress()
    },[route]);

    const getAllAddress = () => {
      dispatch(getSavedAddresses())
      .unwrap()
      .then((res: any) => {
        let resp = res?.data ? res.data : res;
        setAddressList(_.assign(resp))
        if (isFrom === "MyCart" && addressItem) {
          setSelectedAddress(addressItem.id)
        } else if (isFrom === "BecomeASeller" && addressItem) {
          setSelectedAddress(addressItem.id)
        } else {
          setSelectedAddress(resp[0]?.id)
        }
      });
    }

    const onDeleteAddress = (item: UserAddressItem, index: number) => {
      dispatch(
        setDialogData({
          isVisible: true,
          title: LABELS.SavedAddressScreen.deleteAddress,
          description: LABELS.SavedAddressScreen.sureDeleteAddress,
          doneButtonText: LABELS.COMMON_LABELS.yes,
          onDone: () => {
            dispatch(
              deleteAddress(item.id),
            )
              .unwrap()
              .then((res: any) => {
                let resp = res?.data ? res.data : res;
                if (resp) {
                  showToast(resp?.message, "success");
                  getAllAddress()
                }
              });
          },
          onCancel: () => {},
        }),
      );
    }

    const getButtonTitle = () => {
        if (isFrom === "MyCart") {
          return LABELS.SavedAddressScreen.deliverHere
        } else {
          return LABELS.SavedAddressScreen.pickFromHere
        }
    }

    const getHeaderName = () => {
      if (isFrom === "MyCart") {
        return LABELS.SavedAddressScreen.selectShippingAddress
      } else if (isFrom === "BecomeASeller") {
        return LABELS.SavedAddressScreen.selectPickupAddress
      } else {
        return LABELS.SavedAddressScreen.savedAddress
      }
  }

  const onCustomButtonPress = (item: UserAddressItem) => {
    goBack();
    onSelect && onSelect(item);
  }

    const rennderAddressItemSelectable = (item: UserAddressItem, index: number) => (
      <>
      {skeletonName.includes("addressList") ? addressSkeleton() : 
     <View style={styles.itemView}>
          <Text style={styles.addressName}>{item.address}</Text>
          <Text numberOfLines={2} style={styles.addressDetail}>{combineAddress(item)}</Text>
          <View style={styles.radio}>
              <CustomRadio
                  value={selectedAddress === item?.id}
                  onValueChange={(val) => val && setSelectedAddress(item.id)}
              />
          </View>
          <View style={styles.itemBottom}>
          {selectedAddress === item?.id ? <CustomButton 
              titleStyle={{ fontSize: fontSize.fontSize_small }}
              title={getButtonTitle()}
              onPress={() => onCustomButtonPress(item)}
              customStyle={styles.editAddress}
          /> : <View/>}
          <View style={styles.selectableButtons}>
          <TouchableOpacity onPress={() => navigate(screens.ADDNEWADDRESS, { isEdit: true, addressItem: item, onDone: () => getAllAddress() })}>
                    <Image style={styles.button} source={images.editIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDeleteAddress(item, index)}>
                <Image style={styles.button} source={images.deleteIcon} />
                </TouchableOpacity>
                </View>
          </View>
      </View>}
     </>
  )

    const rennderAddressItem = (item: UserAddressItem, index: number) => (
      <>
      {skeletonName.includes("addressList") ? addressSkeleton() : 
        <View style={styles.itemView}>
            <Text style={styles.addressName}>{item.address}</Text>
            <Text numberOfLines={2} style={styles.addressDetail}>{combineAddress(item)}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => navigate(screens.ADDNEWADDRESS, { isEdit: true, addressItem: item, onDone: () => getAllAddress() })}>
                    <Image style={styles.button} source={images.editIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDeleteAddress(item, index)}>
                <Image style={styles.button} source={images.deleteIcon} />
                </TouchableOpacity>
            </View>
        </View>}
        </>  
    )

    const renderEmpty = () => (
        <CustomEmptyView 
            text="You haven't added any address"
            image={images.addressImage}
            customStyle = {{ paddingTop: screenScale(50), paddingBottom: screenScale(50) }}
        />
    )

    const renderAddressList = () => (
        <FlatList
        showsVerticalScrollIndicator={false}
        data={skeletonName.includes("addressList") ? SkeletonData : addressList}
        contentContainerStyle={styles.flatContainer}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => isFrom && (isFrom === "MyCart" || isFrom === "BecomeASeller")? rennderAddressItemSelectable(item, index) : rennderAddressItem(item, index)}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={() => 
        <View style={{ marginTop: screenScale(24), marginBottom: screenScale(88) }}><CustomDottedButton 
          title={LABELS.SavedAddressScreen.addNewAddress}
          onPress={() => navigate(screens.ADDNEWADDRESS, {onDone: () => getAllAddress()})}
      /></View>}
      />
    )
        
  
    return (
      <CustomScreen isSafe customStyle={{alignItems: 'center'}}>
        <CustomHeader
          goBack={() => goBack()}
          container={{backgroundColor: Colors.white}}
          title={getHeaderName()}
          showBack
        />
        <View style={styles.mainView}>
            {renderAddressList()}
            {/* <CustomDottedButton 
                title={LABELS.SavedAddressScreen.addNewAddress}
                onPress={() => navigate(screens.ADDNEWADDRESS, {onDone: () => getAllAddress()})}
            /> */}
        </View>
      </CustomScreen>
    );
  };
  
  export default SavedAddressScreen;