import { products } from "../constants";

const ProductsSection = () => {
  return (
    <section className="padding-x py-12 bg-gray-50">
      <div className="max-container">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary">Our Products</h2>
          <p className="text-slate-gray mt-2">Explore our wide range of products</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-secondary">
                  {product.name}
                </h3>
                <p className="text-slate-gray mt-2">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">
                    {product.price}
                  </span>
                  <button className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
