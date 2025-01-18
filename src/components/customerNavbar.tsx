import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white">
      <div className="flex items-center justify-between px-6 py-4">
        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <img
            src="/profile-placeholder.png" // Replace with your profile image
            alt="User Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="text-sm font-semibold">User Name</h2>
            <p className="text-xs text-gray-400">user@example.com</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/customer/home" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/customer/favourite_driver"
                className="hover:text-gray-300"
              >
                Favourite Drivers
              </Link>
            </li>
            <li>
              <Link href="/customer/products" className="hover:text-gray-300">
                Products
              </Link>
            </li>
            <li>
              <Link href="/customer/track" className="hover:text-gray-300">
                Track
              </Link>
            </li>
            <li>
              <Link href="/customer/drivers" className="hover:text-gray-300">
                Drivers
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <button className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600">
          Logout
        </button>
      </div>
    </header>
  );
}
