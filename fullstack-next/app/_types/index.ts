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
