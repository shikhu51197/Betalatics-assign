import React from "react";
import { Link } from "react-router-dom";

interface WelcomeProps {
  onClickAdd: () => void;
}

const HomePage: React.FC<WelcomeProps> = ({ onClickAdd }) => {
  return (
    <div className="flex items-center justify-center h-80 bg-gradient-to-r from-yellow-100 to-green-200 text-gray-800  rounded-md">
      <div className="text-center">
        <h1 className="text-4xl font-bold  text-pink-600">
          Welcome to Favorite NPM Packages Dashboard
        </h1>
        <div className="border border-pink-500 p-8 rounded-lg shadow-lg max-w-md mx-auto mt-10 bg-white">
          <p className="mb-4 text-lg">
            You haven't added any favorites yet. Let's add some fun favorites!
          </p>
          <Link to="/add">
            <button
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={onClickAdd}
            >
              Add Favorite ❤️
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
