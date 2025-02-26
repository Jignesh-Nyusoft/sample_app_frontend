import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native";
import { screenScale } from "./scaling";
import { CustomSkeleton } from "../components/CustomSkeleton";
import { Colors } from "../theme";
import CustomButton from "../components/CustomButton";

export const productSkeleton = () => (
    <CustomSkeleton extras={{ }}>
    <View style={styles.producetView} />
    </CustomSkeleton>
)

export const subCategorySkeleton = () => (
    <CustomSkeleton><View
    style={{
       ...styles.subCategoryView,
      height: screenScale(32), width: screenScale(75),
    }}/>
</CustomSkeleton>
)

export const addressSkeleton = () => (
    <CustomSkeleton><View
    style={{
       ...styles.addressView,
    }}/>
</CustomSkeleton>
)

export const bigImageSkeleton = () => (
    <CustomSkeleton><View
    style={{
       ...styles.bigImage,
    }}/>
</CustomSkeleton>
)

export const customCommonSeketon = (height: any, width: any, extra?: ViewStyle) => (
    <CustomSkeleton><View
    style={{
       height: height,
       width: width,
       marginBottom: screenScale(16),
       ...extra
    }}/>
</CustomSkeleton>
)

export const loadMoreView = (onPress: () => void, isLoading: boolean) => (
    <View style={styles.footerView}>{isLoading ? <ActivityIndicator style={styles.activity} color={Colors.primary} /> : <CustomButton customStyle={styles.loadMoreView} title='Load More' onPress={onPress} /> }</View>
    
)

const styles = StyleSheet.create({
    producetView: {
        borderRadius: 16,
        marginVertical: screenScale(4),
        height: screenScale(280),
        width: screenScale(171),
    },
    subCategoryView: {
        backgroundColor: Colors.placeHolderBorder,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: screenScale(16),
        paddingVertical: screenScale(10),
        marginRight: screenScale(12),
        height: screenScale(40),
      },
     loadMoreView: {
        width: '45%',
        alignSelf: 'center',
        paddingVertical: screenScale(12)
     },
     footerView: {
        marginVertical: screenScale(10),
     },
     activity: {
        height: screenScale(56)
     },
     addressView: {
        height: screenScale(107),
        width: screenScale(345),
        marginBottom: screenScale(12)
     },
     bigImage: {
        width: '100%',
        height: screenScale(393)
     }
});