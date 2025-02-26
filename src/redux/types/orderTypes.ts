export interface CouponItem {
  id: number;
  name: string;
  slug: string;
  coupon_code: string;
  min_amount: number;
  discount_amount: number;
  valid_from: any;
  valid_till: any;
  coupon_type: string;
  status: 'active' | 'inactive';
}

export interface OrderListItem {
  id: number;
  order_number: string;
  delivery_status: 'pending' | 'shipped' | 'delivered';
  orderitem: {
    id: number;
    order_id: number;
    product_id: number;
    user_id: number;
    seller_id: number;
    product_price: string;
    total_amount: string;
    quantity: number;
    status: string;
    // created_at: '2024-08-27T07:12:22.000000Z';
    // updated_at: '2024-08-27T07:12:22.000000Z';
    product: {
      id: number;
      product_name: string;
      price: number;
      image: any;
      is_approved: number;
      is_fresh: boolean;
      is_wishlist: boolean;
      product_image: any;
      is_sold: {
        is_sold: boolean;
        sold_date: any;
        rating: number;
      };
      size: {
        id: number;
        name: string;
      };
    };
  };
  orderstatus: {
    id: number;
    order_id: number;
    status: string;
    created_at: any;
    updated_at: any;
  }[];
  review: {
    id: number;
    order_id: number;
    user_id: number;
    seller_id: number;
    review: string;
    rating: number;
    created_at: any;
    updated_at: any;
    review_given_by_user: {
      id: number;
      first_name: string;
      last_name: string;
    };
    review_images: {
      id: number;
      review_id: number;
      image: any;
      review_image: any;
    };
  };
  order_shipment: {
    id: number;
    order_id: number;
    quote_id: string;
    delivery_id: any;
    customer_id: any;
    batch_id: any;
    amount: any;
    status: string;
    tracking_url: any;
    courier_partner_id: number;
    shipment_id?: number;
  };
}

export interface OrderDetails {
  id: number;
  order_number: string;
  delivery_status: string;
  net_amount: number;
  discount_price: number;
  delivery_charge: number;
  total_amount: number;
  service_fee: number;
  buyer_tax: number;
  seller_tax: number;
  stripe_platform_fee?: number;
  sales_tax_amount?: number;
  payment_method: string;
  is_offline_delivery?: number;
  mark_as_delivered__seller?: number;
  mark_as_delivered_customer?: number;
  order_item: {
    id: number;
    order_id: number;
    product_id: number;
    user_id: number;
    seller_id: number;
    product_price: string;
    total_amount: string;
    quantity: number;
    status: string;
    // created_at: '2024-08-27T07:12:22.000000Z';
    // updated_at: '2024-08-27T07:12:22.000000Z';
    product: {
      id: number;
      product_name: string;
      price: number;
      image: any;
      is_approved: number;
      is_fresh: boolean;
      is_wishlist: boolean;
      product_image: any;
      is_sold: {
        is_sold: boolean;
        sold_date: any;
        rating: number;
      };
      size: {
        id: number;
        name: string;
      };
    };
  };
  orderstatus: {
    id: number;
    order_id: number;
    status: string;
    created_at: any;
    updated_at: any;
  }[];
  deliveryaddress: {
    id?: number;
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
  };
  review: {
    id: number;
    order_id: number;
    user_id: number;
    seller_id: number;
    review: string;
    rating: number;
    created_at: any;
    updated_at: any;
    review_given_by_user: {
      id: number;
      first_name: string;
      last_name: string;
      user_image: any;
    };
    review_images: {
      id: number;
      review_id: number;
      image: any;
      review_image: any;
    };
  };
  order_shipment: {
    id: number;
    order_id: number;
    quote_id: string;
    delivery_id: any;
    customer_id: any;
    batch_id: any;
    amount: any;
    status: string;
    tracking_url: any;
    courier_partner_id: number,
    lable?: any,
    shipment_id?: number;
  };
}

export interface OrderSummaryData {
  discount_price: number;
  net_amount: number;
  shipping_charges: number;
  // tax?: number;
  total_amount: number;
  service_fee?: number;
  stripe_platform_fee?: number; 
  sales_tax_amount?: number;
  quote_id?: any;
}

export interface CreateOrderResponse {
  address_id: any;
  coupon_id: any;
  ephemeral_key_id: string;
  ephemeral_key_secret_id: string;
  id: number;
  net_amount: number;
  order_number: string;
  payment_intent_secret_id: string;
  seller_id: number;
  stripe_customer_id: string;
  stripe_intent_id: string;
  total_amount: number;
  user_id: number;
}

export interface DeliveryOption {
  id: number;
  name: String;
  status: string;
}