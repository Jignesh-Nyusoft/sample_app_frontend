export interface CountryCode {
    name: string,
    flag: string,
    code: string,
    dial_code: string,
}

export interface ImageProps {
    data?: string | null;
    path: string;
    size: number;
    width: number;
    height: number;
    mime: string;
    exif?: any;
    localIdentifier?: string;
    sourceURL?: string;
    filename?: string;
    creationDate?: string;
    modificationDate?: string;
  }

 export type ResponseCodeTypes = {
    IS_PERMISSION_POPUP_SHOW: boolean;
    LIMIT: number;
    IS_UNAUTHORISED: boolean;
    LOCAL: string;
  };  