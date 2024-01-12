export interface Product {
  id: string;
  brand: string;
  category: string;
  type: string;
  price: number;
  image_url: string;
  gender: "Woman" | "Man" | "Unisex";
}

export type CartItem = {
  product: Product;
  quantity: number;
};

export type PostNordServicePoint = {
  name: string;
  servicePointId: string;
  routeDistance: number;
  visitingAddress: {
    streetName: string;
    streetNumber: string;
    postalCode: string;
    city: string;
    countryCode: string;
  };
};

export type CheckoutUser = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type ShippingAddress = {
  street: string;
  streetNumber: string;
  city: string;
  postalCode: string;
  country: string;
};

export type Order = {
  id: string; // This will be the same as the PayPal order ID
  status: string; // This will be the same as the PayPal order status
  isPaid: boolean;
  user: CheckoutUser;
  shippingAddress: ShippingAddress;
  servicePoint: PostNordServicePoint;
  cart: CartItem[];
  totalPrice: { value: number; currency: string };
  paypalOrder: any;
  paypalCapture: any;
  createdAt?: Date;
};
