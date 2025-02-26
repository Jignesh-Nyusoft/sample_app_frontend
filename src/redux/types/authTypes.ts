export interface RegisterAPIRequest {
    first_name: string;
    last_name: string;
    mobile: string;
    email: string;
    zip_code: string;
    country_code: string;
}

export interface SendOTPAPIRequest {
    mobile: string;
    country_code: string;
}

export interface LoginWithOTPAPIRequest {
    mobile: string;
    country_code: string;
    otp: number;
    device_token: string;
}