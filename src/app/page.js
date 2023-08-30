import { data } from "./utils/data";
import ProductItem from "./components/ProductItem";
import ImageSlider from "./components/ImageSlider";

export default async function Home() {
  const { products } = data;

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
    </div>
  );
}
