import ProductPageComponent from "_components/products/id/ProductPageComponent";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const product = await fetch(
    `https://www.brilliantwear.se/api/products/${id}`
  ).then((res) => res.json());

  return {
    title: `${product.brand} | Brilliantwear`,
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductPageComponent id={params.id} />;
}
