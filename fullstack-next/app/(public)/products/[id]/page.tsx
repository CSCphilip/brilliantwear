import { Product } from "_types";
import { formatCurrency } from "_utilities";
import AddToCartButton from "_components/products/id/AddToCartButton";

// Does so that the page only renders when a user visits a dynamic route that
// corresponds to an actual product. Otherwise, a 404 page will be rendered.
export const dynamicParams = false;

export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/api/products");
  const allProducts: Product[] = await res.json();

  const params = allProducts.map((product) => ({
    id: product.id,
  }));

  return params;
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    product && (
      <main className="flex-grow">
        <div className="p-4 m-5 border border-black flex flew-row">
          <img
            src={
              "http://localhost:3000/api/products/image/" +
              encodeURIComponent(product.image_url)
            }
            alt="The image of the product."
            className="h-56 lg:h-[500px]"
          />
          <div className="flex flex-col">
            <span className="ms-5">
              <p>
                <b>Brand:</b> {product.brand}
              </p>
              <p>
                <b>Category:</b> {product.category}
              </p>
              <p>
                <b>Type:</b> {product.type}
              </p>
              <p>
                <b>Price:</b> {formatCurrency(product.price)}
              </p>
            </span>
            <div className="ms-5 mt-5">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </main>
    )
  );
}

async function getProduct(id: string) {
  const res = await fetch(
    "http://localhost:3000/api/products/" + encodeURIComponent(id)
  );
  const product: Product = await res.json();
  return product;
}
