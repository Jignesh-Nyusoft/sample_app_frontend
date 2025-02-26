export interface MyProfileData {
        Stripe_connect_ac_id: any,
        bio: null,
        country_code: string,
        email: string,
        first_name: string,
        gender: null,
        id: number,
        is_online: number,
        last_name: string,
        mobile: string,
        profile_image: any,
        role: string,
        status: string,
        user_image: any,
        zip_code: number,
        is_seller: number,
        is_seller_details_pending: 0 | 1,
        pickpaddress?: any,
        deliveryaddress? :any,
        unread_count?: number,
        my_earning?: string,
        pickup_address_available?: 0 | 1,
        username?: string | any 
}

export interface UpdateProfileRequest {
        bio: string,
        country_code: string,
        email: string,
        first_name: string,
        gender: any,
        last_name: string,
        mobile: string,
        profile_image?: any,
        zip_code: string,
        is_seller?: number
}

export interface UserAddress {

}

export interface SaveAddressRequest {
  address_id?: number;
  zip_code: string;
  country: string;
  state: string;
  city: string;
  address: string;
  street: string;
  is_default: boolean;
  is_pickup: boolean;
  location_lat?: string;
  location_long?: string;
  status?: 'active';
}

export interface UserAddressItem {
  id: number;
  user_id: number;
  zip_code: string;
  country: string;
  state: string;
  city: string;
  address: string;
  street: string;
  status: string;
  mobile: string;
  country_code: string;
  location_lat?: string;
  location_long?: string;
  is_default_delivery: number | null;
  is_default_pickup: number | null;
  house_no?: string
}

export interface TransactionItem {
  id: number;
  user_id: number;
  order_id: number;
  payment_method: string;
  amount: number;
  net_amount: number | null;
  status: string;
  created_at: any;
  updated_at: any;
  order: {
    id: number;
    order_number: string;
    order_item: {
      id: number;
      order_id: number;
      product: {
        id: number;
        product_name: string;
        price: number;
      };
    };
  };
}

export interface NotificationItem {
  id: number;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: any;
  read_at: any;
  created_at: any;
  updated_at: any;
}

export interface CardItem {
  id: string;
  object: string;
  allow_redisplay: string;
  billing_details: {
    address: {
      city: any;
      country: string;
      line1: any;
      line2: any;
      postal_code: string;
      state: any;
    };
    email: any;
    name: any;
    phone: any;
  };
  card: {
    brand: string;
    checks: {
      address_line1_check: any;
      address_postal_code_check: string;
      cvc_check: string;
    };
    country: string;
    display_brand: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from: any;
    last4: string;
    networks: {
      available: any;
      preferred: any;
    };
    three_d_secure_usage: {
      supported: boolean;
    };
    wallet: any;
  };
  created: number;
  customer: string;
  livemode: boolean;
  metadata: any;
  type: string;
}