import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

export function navigate(name: string, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function reset(params: any) {
  navigationRef.current?.reset(params);
}

export function replace(params: any) {
  navigationRef.current?.dispatch(params);
}