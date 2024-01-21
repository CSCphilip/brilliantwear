import { create } from "zustand";

import { useFetch } from "_helpers/client/hooks";
import { useSearchParams } from "next/navigation";

const initialState = {
  products: undefined,
  product: undefined,
  pagination: undefined,
};

// This is a hook that returns a store object and a service object.
const productStore = create<IProductStore>(() => initialState);

export function useProductService(): IProductService {
  const fetch = useFetch();
  const { products, product, pagination } = productStore();
  const searchParams = useSearchParams();

  return {
    products,
    product,
    pagination,
    // Add product-related functions here, such as creating, updating, or deleting products.
    // For example:
    create: async (product) => {
      await fetch.post("/api/products", product);
    },
    getLatest: async (page?: number) => {
      const brandSearch = searchParams.get("brand");
      let JSONresponse;
      if (page || page === 0) {
        JSONresponse = await fetch.get(
          `/api/products/latest?page=${page}${
            brandSearch && `&brand=${brandSearch}`
          }`
        );
      } else {
        JSONresponse = await fetch.get(
          `/api/products/latest${brandSearch && `&brand=${brandSearch}`}`
        );
      }
      productStore.setState({
        products: JSONresponse.products,
        pagination: JSONresponse.pagination,
      });
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

interface IPagination {
  used: boolean;
  total_products: number;
  page: number | null;
  total_pages: number | null;
  per_page: number | null;
  products_skipped: number | null;
}

interface IProductStore {
  products?: IProduct[];
  product?: IProduct;
  pagination?: IPagination;
}

interface IProductService extends IProductStore {
  // Add product-related function signatures here.
  create: (product: IProduct) => Promise<void>;
  getLatest: (page?: number) => Promise<void>;

  // NOTE: For later use, you can add the following function signatures:
  //   updateProduct: (
  //     productId: string,
  //     productData: Partial<IProduct>
  //   ) => Promise<void>;
  //   deleteProduct: (productId: string) => Promise<void>;
}
