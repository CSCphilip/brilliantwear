"use client";

import { useRouter } from "next/navigation";
import { useAlertService, useProductService } from "_services";
import { useForm } from "react-hook-form";

export default function AddProduct() {
  const router = useRouter();
  const alertService = useAlertService();
  const productService = useProductService();

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const fields = {
    brand: register("brand", { required: "A brand name is required" }),
    category: register("category", { required: "A category is required" }),
    type: register("type", { required: "A type is required" }),
    price: register("price", {
      required: "A price is required",
      valueAsNumber: true,
      min: 0,
    }),
    image: register("image", { required: "An image is required" }),
    gender: register("gender", { required: "A gender is required" }),
  };

  async function onSubmit(data: any) {
    alertService.clear();
    try {
      await productService.create(data);

      router.push("/dashboard");
      alertService.success("Product added", true);
    } catch (error: any) {
      alertService.error(error);
    }
  }

  return (
    <main className="flex-grow p-4 mb-10">
      <h1>Add product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div>
          <div className="mb-3">
            <label
              htmlFor="brand"
              className="block text-gray-700 font-bold mb-2"
            >
              Brand
            </label>
            <input
              {...fields.brand}
              type="text"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Brand"
            />
            <p className="text-red-500 mt-1">
              {errors.brand?.message?.toString()}
            </p>
          </div>
          <div className="mb-3">
            <label
              htmlFor="category"
              className="block text-gray-700 font-bold mb-2"
            >
              Category
            </label>
            <input
              {...fields.category}
              type="text"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Category"
            />
            <p className="text-red-500 mt-1">
              {errors.category?.message?.toString()}
            </p>
          </div>
          <div className="mb-3">
            <label
              htmlFor="type"
              className="block text-gray-700 font-bold mb-2"
            >
              Type
            </label>
            <select {...fields.type} className="" defaultValue={"Shoe"}>
              <option value="Shoe">Shoes</option>
              <option value="Jacket">Jacket</option>
              <option value="Pants">Pants</option>
              <option value="Dress">Dress</option>
              <option value="T-shirt">T-shirt</option>
              <option value="Shorts">Shorts</option>
            </select>
            <p className="text-red-500 mt-1">
              {errors.type?.message?.toString()}
            </p>
          </div>
          <div className="mb-3">
            <label
              htmlFor="gender"
              className="block text-gray-700 font-bold mb-2"
            >
              Gender
            </label>
            <select {...fields.gender} className="" defaultValue={"Woman"}>
              <option value="Woman">Woman</option>
              <option value="Man">Man</option>
              <option value="Unisex">Unisex</option>
            </select>
            <p className="text-red-500 mt-1">
              {errors.gender?.message?.toString()}
            </p>
          </div>
          <div className="mb-3">
            <label
              htmlFor="price"
              className="block text-gray-700 font-bold mb-2"
            >
              Price
            </label>
            <input
              {...fields.price}
              type="number"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Price"
            />
            <p className="text-red-500 mt-1">
              {errors.price?.message?.toString()}
            </p>
          </div>
          <div className="mb-3">
            <label
              htmlFor="image"
              className="block text-gray-700 font-bold mb-2"
            >
              Image of product
            </label>
            <input
              {...fields.image}
              type="file"
              className=""
              id="image"
              name="image"
              accept="image/*"
            />
            <p className="text-red-500 mt-1">
              {errors.image?.message?.toString()}
            </p>
          </div>
        </div>
        <div className="mt-6 mb-10 flex">
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="py-2 px-5 bg-blue-600 hover:bg-blue-500 rounded text-white"
          >
            {formState.isSubmitting && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
            Add
          </button>
          <button
            onClick={() => reset()}
            type="button"
            disabled={formState.isSubmitting}
            className="py-2 px-5 ms-2 bg-green-600 hover:bg-green-500 rounded text-white"
          >
            Reset
          </button>
        </div>
      </form>
    </main>
  );
}
