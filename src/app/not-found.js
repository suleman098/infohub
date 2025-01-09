import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen  w-screenbg-gray-100 text-gray-800">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6 text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="flex items-center justify-center space-x-2 text-black btn btn-outline w-full mb-4"
      >
        <FaHome className="text-xl" />
        Go back to Home
      </a>
    </div>
  );
}
