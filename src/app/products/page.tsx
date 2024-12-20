
import Image from "next/image";
import Link from "next/link";

type FoodItem = {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  restaurant: string;
};

const foodItems: FoodItem[] = [
  {
    id: 1,
    name: "Crostini",
    imageUrl: "/images/foods.png",
    rating: 3.5,
    restaurant: "Italy restaurant",
  },
  {
    id: 2,
    name: "Baguette Sandwich",
    imageUrl: "/images/foods.png",
    rating: 3.5,
    restaurant: "France restaurant",
  },
  {
    id: 3,
    name: "Grilled Salmon",
    imageUrl: "/images/foods.png",
    rating: 3.5,
    restaurant: "Seafood Place",
  },
  {
    id: 4,
    name: "Burger & Fries",
    imageUrl: "/images/foods.png",
    rating: 3.5,
    restaurant: "Fast Food Joint",
  },
  {
    id: 5,
    name: "Beef Stew",
    imageUrl: "/images/foods.png",
    rating: 3.5,
    restaurant: "Home Cooking",
  },
];

export default function FoodList() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Food List</h1>
      <div className="space-y-4">
        {foodItems.map((food) => (
          <div
            key={food.id}
            className="flex items-center p-4 bg-white rounded-lg shadow-md"
          ><Link href={`/products/${food.id}`}>
            <Image
              src={food.imageUrl}
              alt={food.name}
              width={100}
              height={100}
              className="rounded-md"
            /></Link>
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold">{food.name}</h2>
              <Link href="/restaurants" className="text-blue-500 text-sm">
                {food.restaurant}
              </Link>
              <p className="text-gray-500 text-sm mt-1">Rating: {food.rating} ⭐</p>
            </div>
            <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md">
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
