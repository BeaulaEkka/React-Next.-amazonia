import { data } from "./utils/data";
import ProductItem from "./components/ProductItem";
import ImageSlider from "./components/ImageSlider";

// async function getData() {
//   const res = await fetch("https://fakestoreapiserver.reactbd.com/tech");
//   const products = await res.json();
//   return products;
// }

export default async function Home() {
  const { products } = data;
  // const products = await getData();

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="w-full h-full mx-auto relative z-[-11]">
        <ImageSlider />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4 mt-[-8rem]">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-[-8rem] z-50">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div> */}
    </div>
  );
}
