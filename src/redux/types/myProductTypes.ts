export interface MyProductItem {
  id: number;
  product_name: string;
  slug: string;
  user_id: number;
  category_id: number;
  brand_id: number;
  size_id: number;
  material_id: number;
  color_id: number;
  condition_id: number;
  suitable_id: number;
  description: string;
  cloth_type: string;
  stock: number;
  price: number;
  image: any;
  status: string;
  is_approved: number;
  created_at: any;
  is_fresh: boolean;
  is_wishlist: boolean;
  product_image: any;
  is_sold: {
    is_sold: boolean;
    sold_date: any;
    rating: number;
    order_id: number;
  };
}

export interface AddNewProductRequest {
  product_id?: number;
  product_name: string;
  category_id: number;
  default_pickup_id?: number;
  brand_id: number;
  size_id: number;
  material_id: number;
  condition_id?: number | null;
  color_id: number;
  suitable_id: number;
  description: string;
  cloth_type: string;
  stock: number;
  price: number;
  status: string;
  image?: any;
  product_images?: any[];
  courier_partner?: any[]
}  