import { BaseToast, ErrorToast } from "react-native-toast-message";
import { Colors, Font } from "../theme";

export const toastConfig = {
    /*
        Overwrite 'success' type,
        by modifying the existing `BaseToast` component
      */
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          marginTop: 20,
          backgroundColor: Colors.white,
          borderLeftColor: Colors.primary,
        }}
        text1NumberOfLines={2}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 14,
          fontFamily: Font.FontBold,
          color: Colors.primary,
        }}
        text2Style={{
          fontSize: 14,
          fontFamily: Font.FontMedium,
          color: Colors.primary,
          textDecorationLine: "underline",
        }}
      />
    ),
    /*
        Overwrite 'error' type,
        by modifying the existing `ErrorToast` component
      */
    error: (props: any) => (
      <ErrorToast
        style={{
          marginTop: 20,
          backgroundColor: Colors.white,
          borderLeftColor: Colors.red,
        }}
        text1NumberOfLines={8}
        text2NumberOfLines={4}
        {...props}
        text1Style={{
          fontSize: 14,
          fontFamily: Font.FontMedium,
          color: Colors.red,
        }}
        text2Style={{
          fontSize: 12,
          fontFamily: Font.FontRegular,
          color: Colors.red,
          marginTop: 5,
        }}
      />
    ),
  };