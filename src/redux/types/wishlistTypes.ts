export interface WishlistProduct {
  id: number;
  product_id: number;
  user_id: number;
  product: {
    id: number;
    user_id: number;
    size_id: number;
    product_name: string;
    description: string;
    image: any;
    is_fresh: true;
    product_image: any;
    price: number;
    seller: {
      id: number;
      first_name: string;
      last_name: string;
      user_image?: any;
    };
    size: {
      id: number;
      name: string;
    };
  };
}