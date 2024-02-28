import path from "path";
import { SortOrder } from "mongoose";

import { db } from "./mongodb";
import log from "_utilities/log";

const Product = db.Product;

export const productsRepo = {
  create,
  get,
  getLatest,
  getById,
  getAllTypes,
  getWomanTypes,
  getManTypes,
  getUnisexTypes,
};

async function create(params: FormData) {
  // validate
  if (
    await Product.findOne({
      brand: params.get("brand"),
      category: params.get("category"),
      type: params.get("type"),
      price: params.get("price"),
      gender: params.get("gender"),
    })
  ) {
    throw "Product already exists in the database";
  }

  const product = new Product();

  product.brand = params.get("brand");
  product.category = params.get("category");
  product.type = params.get("type");
  product.price = params.get("price");
  product.gender = params.get("gender");

  const image = params.get("image") as File;
  const imageName = image.name;
  const id = imageName.split(".")[0]; // remove the extension

  product.image_url = path.join("/images", imageName);
  product.id = id;

  // Save product to MongoDB
  await product.save();

  log("Product saved successfully. Brand: " + params.get("brand"));
}

async function get(page?: number, sortOptions?: any, query?: {}) {
  return getProducts(page, sortOptions, query);
}

async function getLatest(page?: number, query?: {}) {
  // Sorting by _id in descending order
  const sortOptions: { [key: string]: SortOrder } = { _id: "descending" };
  return getProducts(page, sortOptions, query);
}

async function getProducts(page?: number, sortOptions?: any, query?: {}) {
  // Put all your queryParameters parameters in here
  const queryParameters = query ?? {};

  const totalProducts = await Product.countDocuments(queryParameters);

  const DEFAULT_PER_PAGE = 12;
  let productsPerPage: number | null = DEFAULT_PER_PAGE;

  let paginationUsed = false;
  let skip = null;
  let totalPages = null;
  let products;

  const queryBuilder = (q: any) => {
    const builder = Product.find(q, {
      _id: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    if (sortOptions) {
      builder.sort(sortOptions);
    }
    return builder;
  };

  if (page || page === 0) {
    if (page < 1) {
      throw new Error("Page must be greater than 0");
    }
    log("Getting a page of products from the MongoDB");

    paginationUsed = true;
    skip = (page - 1) * productsPerPage;
    totalPages = Math.ceil(totalProducts / productsPerPage);

    products = await queryBuilder(queryParameters)
      .limit(productsPerPage)
      .skip(skip)
      .lean();
  } else {
    log("Getting all products from the MongoDB");

    productsPerPage = null;
    products = await queryBuilder(queryParameters).lean();
  }

  return {
    pagination: {
      used: paginationUsed,
      total_products: totalProducts,
      page: page,
      total_pages: totalPages,
      per_page: productsPerPage,
      products_skipped: skip,
    },
    products: products,
  };
}

async function getById(id: string) {
  const product = await Product.findOne(
    { id: id },
    {
      _id: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    }
  );
  return product;
}

async function getAllTypes() {
  const types = await Product.distinct("type");
  return types;
}

async function getWomanTypes() {
  const womanTypes = await Product.distinct("type", { gender: "Woman" });
  return womanTypes;
}

async function getManTypes() {
  const manTypes = await Product.distinct("type", { gender: "Man" });
  return manTypes;
}

async function getUnisexTypes() {
  const unisexTypes = await Product.distinct("type", { gender: "Unisex" });
  return unisexTypes;
}
