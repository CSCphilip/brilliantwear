export interface Product {
  id: string;
  brand: string;
  category: string;
  type: string;
  price: number;
  image_url: string;
}

export type CartItem = {
  product: Product;
  quantity: number;
  image: Blob | undefined;
};
