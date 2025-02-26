import { Platform } from "react-native";
import { RegEx } from "./RegEx";
import DeviceInfo from 'react-native-device-info';
import Toast from "react-native-toast-message";
import moment from "moment";
import { ConstantVariables, GOOGLE_PLACE_API_KEY } from "./CommonConstants";

export const hasNotch = () => {
  return DeviceInfo.hasNotch();
};

export const isIOS = () => {
  return Platform.OS === "ios";
}

//ANCHOR - Function to validate Email
export const validateEmail = (email: string) => {
    return RegEx.CheckEmail.test(email);
  };

//ANCHOR - Function to validate Password
export const validatePassword = (email: string) => {
  return RegEx.CheckPassword.test(email);
};

//ANCHOR - Function to validate code
export const validateCode = (email: string) => {
  return RegEx.CheckCode.test(email);
};

//ANCHOR - Function to validate username
export const validateUserName = (email: string) => {
  return RegEx.CheckUserName.test(email);
};

//ANCHOR - Function to validate Mobile
export const validateMobile = (mobile: string) => {
    const newMobile = unMaskMobile(mobile);
    return RegEx.CheckMobile.test(newMobile);
  };

//ANCHOR - Function to get file name
export const getFileName = (path: string) => {
    let filename = path.split("/").pop();
    return filename ?? "";
  };  

export const showToast =  (
    toastString: string,
    type?: string,
    hide?: boolean,
    toastString2?: string,
    onPressToast?: () => void
  ) => {
    if (toastString != "" && toastString != null && toastString != undefined) {
      Toast.show({
        type: type ? type : "error",
        text1: toastString,
        autoHide: hide === false ? false : true,
        onPress() {
          if (onPressToast !== undefined) {
            Toast.hide();
            onPressToast();
          }
        },
        text2: toastString2,
      });
    }
  }

//ANCHOR - Function to format Mobile (000-000-0000)
export const maskMobile = (mobileTemp: string) => {
  const mobileNumberArr = mobileTemp?.split(" ")
  let mobileNumber = ""
  mobileNumberArr?.forEach((e) => mobileNumber = mobileNumber + e.toString())
  // const mobileNumber = mobileTemp?.replace(" ", "")?.trim()
  if (mobileNumber?.length > 3 && mobileNumber?.length < 7) {
    return mobileNumber?.slice(0,3) + ' ' + mobileNumber?.slice(3,mobileNumber?.length + 1)
  } else if (mobileNumber?.length > 6) {
    return mobileNumber?.slice(0,3) + ' ' + mobileNumber?.slice(3,6) + ' ' + mobileNumber?.slice(6,mobileNumber?.length + 1)
  } else {
    return mobileNumber
  }
}  

export const unMaskMobile = (mobileTemp: string) => {
  const mobileNumberArr = mobileTemp?.split(" ")
  let mobileNumber = ""
  mobileNumberArr?.forEach((e) => mobileNumber = mobileNumber + e.toString())
  // const mobileNumber = mobileTemp?.replace(" ", "")?.trim()
  return mobileNumber
}  

export function convertFormData(param: any) {
  const postData = {
    ...param,
  };
  let formData = new FormData();
  Object.entries(postData).map(function ([key, value]) {
    formData.append(key, value);
  });
  return formData;
}

export const getTimeEstimatedString = (tempDate: any) => {
  return moment(tempDate).calendar(null, { 
    lastDay : '[Yesterday]',
sameDay : '[Today]',
lastWeek : 'dddd',})
}

export const getOnlyTimeEstimatedString = (tempDate: any) => {
  return moment(tempDate).calendar(null, { 
    lastDay : '[Yesterday]',
sameDay : '[Today]',
lastWeek : 'dddd',
}) + " " + moment(tempDate).format('HH:mm A')
}

export const formattedDateTime = (tempDate: any) => {
  return moment(tempDate).format("DD MMMM YYYY, HH:mm A")
}

export const formattedDate = (tempDate: any) => {
  return moment(tempDate).format("MM/DD/YYYY")
}

export const combineAddress = (addressData: any) => {
  return addressData?.street + ", " + addressData?.city + ", " + addressData?.state + ", " + addressData?.country + "-" + addressData?.zip_code
}

export const createImagesArray = (images: any[], paramName: string) => {
  let newArr = {};
  images.forEach((item, index) => {
    newArr = {
      ...newArr,
      [paramName+"["+index+"]"]: item
    }
  })
  return newArr
}

export const convertToApiFormat = (array: any, name: string) => {
  const result: any = {};

  array.forEach((item: any, index: number) => {
    Object.keys(item).forEach((key) => {
      result[`${name}[${index}][${key}]`] = item[key];
    });
  });

  return result;
};

// const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text.replace(
//     /[^a-zA-Z0-9\s]/g,
//     ""
//   )}&location=${locationBias}&radius=${50000}&components=country:US&key=${
//     GOOGLE_PLACE_API_KEY
//   }`;

export const placesApi = (text: string, locationBias?: string) => {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&components=country:US&key=${
    GOOGLE_PLACE_API_KEY
  }`;

  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return response.predictions;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export const placeDetailsApi = (place_id: string) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GOOGLE_PLACE_API_KEY}`;

  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return [];
    });
}
    