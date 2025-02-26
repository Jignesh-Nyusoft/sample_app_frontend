
import { PERMISSIONS, RESULTS } from "react-native-permissions";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { useRef } from "react";
import { ActionsProp, useActionSheet } from "../components/CustomActionSheet";
import checkPermission from "../utils/PermissionFunctions";
import { ImageProps } from "../utils/CommonTypes";
import { LABELS } from "../locales/common";

const useSelectImage = () => {
  const { showActionSheet } = useActionSheet();

  const isMultiple = useRef(false);
  const mediaTypeRef = useRef("photo");

  const onImageSelect = async (
    imageHeight: number = 512,
    imageWidth: number = 512,
    multiple = false,
    mediaType = "photo"
  ): Promise<ImageProps | ImageProps[] | null | undefined> => {
    isMultiple.current = multiple;
    mediaTypeRef.current = mediaType;
    return new Promise((resolve) => {
      const options: ActionsProp[] = [
        {
          id: 2,
          title: LABELS.COMMON_LABELS.CapturePhoto,
        },
        {
          id: 1,
          title: LABELS.COMMON_LABELS.chooseFromGallery,
        },
      ];
      showActionSheet(
        {
          actions: options,
        },
        async (id: number) => {
          setTimeout(async () => {
            if (id === 1) {
              const result = await chooseFromGallery(imageHeight, imageWidth);
              resolve(result);
            } else if (id === 2) {
              const result = await chooseFromCamera(imageHeight, imageWidth);
              resolve(result);
            }
          }, 600);
        }
      );
    });
  };

  const checkDocPermission = async () => {
    var permission;
    const level = await DeviceInfo.getApiLevel();
    if (level >= 33) {
      permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    } else {
      permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    }
    let result = await checkPermission(permission);
    console.log("result: ", result);

    if (
      result === RESULTS.BLOCKED ||
      result === RESULTS.UNAVAILABLE ||
      result === RESULTS.DENIED
    ) {
      return false;
    }
    return true;
  };

  const checkMediaPermission = async () => {
    var permission;
    if (Platform.OS === "android") {
      const level = await DeviceInfo.getApiLevel();
      if (level >= 33) {
        permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
      } else {
        permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      }
    } else {
      permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    }
    let result = await checkPermission(permission);
    console.log("result: ", result);

    if (
      result === RESULTS.BLOCKED ||
      result === RESULTS.UNAVAILABLE ||
      result === RESULTS.DENIED
    ) {
      return false;
    }
    return true;
  };

  const checkCameraPermission = async () => {
    let result = await checkPermission(
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA
    );
    if (
      result === RESULTS.BLOCKED ||
      result === RESULTS.UNAVAILABLE ||
      result === RESULTS.DENIED
    ) {
      return false;
    }
    return true;
  };

  const chooseFromGallery = async (imageHeight: number, imageWidth: number) => {
    let isMediaPermissionAvailable = await checkMediaPermission();
    if (!isMediaPermissionAvailable) {
      return;
    }
    if (mediaTypeRef.current == "video") {
      const video = await ImagePicker.openPicker({
        mediaType: "video",
        compressVideoPreset: "MediumQuality",
      });
      if (video) {
        return video;
      } else {
        console.log("Error: ", video);
        return null;
      }
    } else {      
      const image = await ImagePicker.openPicker({
        mediaType: "photo",
        width: imageWidth ? imageWidth : 512,
        height: imageHeight ? imageHeight : 512,
        cropping: true,
        freeStyleCropEnabled: true,
        enableRotationGesture: false,
        multiple: isMultiple.current,
        maxFiles: 10,
        forceJpg: true,
        smartAlbums: [
          "Favorites",
          "UserLibrary",
          "RecentlyAdded",
          "PhotoStream",
          "Generic",
          "Timelapses",
          "AllHidden",
          "Bursts",
          "SlomoVideos",
          "SelfPortraits",
          "Screenshots",
          "DepthEffect",
          "LivePhotos",
          "Animated",
          "LongExposure",
        ],
      });

      if (image) {
        if (isMultiple.current) {
          return image;
        } else {
          return { uri: image.path, ...image };
        }
      } else {
        console.log("Error: ", image);
        return null;
      }
    }
  };

  const chooseFromCamera = async (imageHeight: number, imageWidth: number) => {
    let isCameraPermissionAvailable = await checkCameraPermission();
    if (!isCameraPermissionAvailable) {
      return;
    }
    if (mediaTypeRef.current == "video") {
      const video = await ImagePicker.openCamera({
        mediaType: "video",
        compressVideoPreset: "MediumQuality",
      });
      if (video) {
        return video;
      } else {
        console.log("Error: ", video);
        return null;
      }
    } else {
      const result = await ImagePicker.openCamera({
        width: imageWidth ? imageWidth : 512,
        height: imageHeight ? imageHeight : 512,
        cropping: true,
        freeStyleCropEnabled: true,
        enableRotationGesture: false,
      });
      if (result) {
        if (isMultiple.current) {
          return [result];
        } else {
          return { uri: result.path, ...result };
        }
      } else {
        console.log("Error: ", result);
        return null;
      }
    }
  };

  return { onImageSelect };
};

export default useSelectImage;
