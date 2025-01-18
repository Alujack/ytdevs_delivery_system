
interface Product {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  restaurant: string;
};

const ProductCard = ({ product }:{product:Product}) => {
  return (
    <div  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* <Image
        src={product.imageUrl}
        alt={product.name}
        width={300}
        height={200}
        className="rounded-t-lg object-cover"
      /> */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="text-gray-600 mt-1 text-sm">{product.restaurant}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 text-sm">{"\u2605".repeat(Math.floor(product.rating))}</span>
          {product.rating % 1 !== 0 && <span className="text-yellow-500">&#9733;</span>}
          <span className="text-gray-600 text-sm ml-2">({product.rating})</span>
        </div>
        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
