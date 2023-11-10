import { create } from "zustand";

import { useFetch } from "_helpers/client";

const initialState = {
  products: undefined,
  product: undefined,
};

// This is a hook that returns a store object and a service object.
const productStore = create<IProductStore>(() => initialState);

export function useProductService(): IProductService {
  const fetch = useFetch();
  const { products, product } = productStore();

  return {
    products,
    product,
    // Add product-related functions here, such as creating, updating, or deleting products.
    // For example:
    create: async (product) => {
      await fetch.post("/api/products", product);
    },

    // NOTE: For later use, you can add the following function signatures:
    // updateProduct: async (productId, productData) => {
    //   // Your code for updating an existing product.
    // },
    // deleteProduct: async (productId) => {
    //   // Your code for deleting a product.
    // },
  };
}

// Import and define interfaces for product-related data and functions.
import { Product as IProduct } from "_types";

interface IProductStore {
  products?: IProduct[];
  product?: IProduct;
}

interface IProductService extends IProductStore {
  // Add product-related function signatures here.
  create: (product: IProduct) => Promise<void>;

  // NOTE: For later use, you can add the following function signatures:
  //   updateProduct: (
  //     productId: string,
  //     productData: Partial<IProduct>
  //   ) => Promise<void>;
  //   deleteProduct: (productId: string) => Promise<void>;
}
