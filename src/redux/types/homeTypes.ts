export interface SuitableItem {
    id: number;
    name: string;
    short_desc: any;
    status: any;
    category?: {
      id: number;
      name: string;
      category_image: any;
    }[];
}

export interface BannerItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: any;
  banner_image: any;
}

export interface Category {
    id: number;
    name: string;
    category_image: any;
}

export interface SubCategory {
    id: number;
    name: string;
    category_image: any;
}

export interface ProductItem {
  id: number;
  product_name: string;
  slug: string;
  user_id: number;
  category_id: number;
  size_id: number;
  price: number;
  image: any;
  is_fresh: boolean;
  product_image: any;
  seller: {
    id: number;
    first_name: string;
    last_name: string;
    user_image: any;
  };
  size: {
    id: number;
    name: string;
  };
  is_wishlist?: boolean;
}

export interface FilterRequest {
  brand?: number[];
  category?: number[];
  size?: number[];
  color?: number[];
  condition?: number[];
  material?: number[];
  suitable?: number[];
  start_price?: number;
  end_price?: number;
  sortby?: string;
  search?: string;
}

export interface FilterBody {
  brand?: number[];
  category?: number[];
  size?: number[];
  color?: number[];
  condition?: number[];
  material?: number[];
  suitable?: number[];
  start_price?: number;
  end_price?: number;
  sortby?: string;
  search?: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  image: any;
  brand_image: any;
  isSelected?: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: any;
  category_image: any;
  sub_category?: {
    id: number;
    name: string;
    parent_id: number;
    isSelected?: boolean; 
  };
  isSelected?: boolean; 
}

export interface Size {
  id: number;
  name: string;
  slug: string;
  isSelected?: boolean; 
}

export interface Color {
  id: number;
  name: string;
  slug: string;
  color_code: string;
  isSelected: boolean; 
}

export interface Condition {
  id: number;
    name: string;
    isSelected?: boolean;
}

export interface Material {
  id: number;
  name: string;
  slug: string;
  isSelected?: boolean; 
}

export interface Suitable {
  id: number;
  name: string;
  short_desc: string;
  isSelected?: boolean;
}

export interface AttributeList {
  brand?: {
    title? : string;
    data?: Brand[];
  };
  category?: {
    title? : string;
    data?: Category[];
  };
  size?: {
    title? : string;
    data?: Size[];
  };
  color?: {
    title? : string;
    data?: Color[];
  };
  condition?: {
    title? : string;
    data?: Condition[];
  };
  material?: {
    title? : string;
    data?: Material[];
  };
  suitable?: {
    title? : string;
    data?: Suitable[];
  };
}

export interface ProductItemDetail {
  id: number;
  product_name: string;
  slug: string;
  user_id: number;
  category_id: number;
  size_id: number;
  price: number;
  image: any;
  is_fresh: boolean;
  product_image: any;
  product_images: any[];
  description: string;
  cloth_type: string;
  related_products: ProductItem[];
  seller: {
    id: number;
    first_name: string;
    last_name: string;
    user_image: any;
    total_rating?: {
      rating: any;
      review_count: number;
    };
    pickup_address_available?: 0 | 1;
    is_seller_details_pending?: 0 | 1;
    pickpaddress?: {
      city: string;
      state: string;
    }
  };
  size: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
    parent_id: any;
    image: any;
    category_image: any;
  };
  suitable?: {
    id: number;
    name: string;
  };
  color: Color;
  material: Material;
  condition: Condition;
  brand: Brand;
  is_wishlist?: boolean;
  created_at: any;
  product_courier?: {
    id: number;
    courier_name: string;
    courier_partner_id: number;
    product_id: number;
    size: any;
  }[];
}

export interface SellerDetails {
  id: number;
  first_name: string;
  last_name: string;
  bio: string;
  total_rating: {
    rating: any;
    review_count: number;
  };
  user_image: any;
  pickpaddress: {
    city: string;
    state: string;
  }
}

export interface ReviewItem {
  review: string;
  rating: any;
  created_at: any;
  review_images: any[];
  review_given_by_user?: {
    first_name: string;
    last_name: string;
    user_image?: any;
  };
}