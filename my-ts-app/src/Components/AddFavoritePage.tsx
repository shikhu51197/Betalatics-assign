import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface Package {
  package: {
    name: string;
  };
}

interface AddFavoriteProps {
  onSubmit: (newFavorite: {
    id: string;
    packageName: string;
    favoriteReason: string;
  }) => void;
}

const AddFavoritePage: React.FC<AddFavoriteProps> = ({ onSubmit }) => {
  // State for managing input values
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [favoriteReason, setFavoriteReason] = useState<string>("");
  const navigate = useNavigate();

  // Fetch packages from API based on the search query
  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`https://api.npms.io/v2/search?q=${searchQuery}`)
        .then((response) => {
          setPackages(response.data.results);
        });
    }
  }, [searchQuery]);

  // Handle submission of the form
  const handleAddFavorite = () => {
    if (selectedPackage && favoriteReason) {
      // Generate a unique ID for the new favorite
      const id = uuidv4();

      // Create a new favorite object
      const newFavorite = {
        id,
        packageName: selectedPackage.package.name,
        favoriteReason,
      };

      // Retrieve existing favorites from local storage
      const existingFavorites =
        JSON.parse(localStorage.getItem("favorites") || "[]");

      // Save the new favorite to local storage
      localStorage.setItem(
        "favorites",
        JSON.stringify([...existingFavorites, newFavorite])
      );

      // Trigger the onSubmit function with the new favorite
      onSubmit(newFavorite);

      // Navigate to the home page
      navigate("/");
    } else {
      alert("Please select a package and enter a reason for your favorite.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center "style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1542785853-cf202360bca0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      backgroundSize: "cover",
    }}>
      <div
        className="max-w-xl w-full p-6 rounded-lg shadow-md bg-cyan-50"
        
      >
        {/* Header */}
        <h2 className="text-3xl font-bold mb-4 text-center text-pink-500">
          Search for Your Favorite NPM Package
        </h2>

        {/* Search Input */}
        <div className="flex justify-center items-center mb-4 ">
          <input
            type="text"
            placeholder="Search NPM Package"
            className="border p-3 w-full text-center bg-white rounded-md focus:outline-none transition-all duration-300 focus:border-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Results Section */}
        {packages.length > 0 && (
          <div className="mb-4 max-h-40 overflow-y-auto bg-white">
            <h1 className="text-2xl font-bold mb-4 ml-4 text-purple-700">
              Results
            </h1>
            <div className="grid grid-cols-1 gap-2 ml-4">
              {packages.map((pkg) => (
                <div key={pkg.package.name} className="mb-2">
                  <input
                    type="radio"
                    id={pkg.package.name}
                    name="selectedPackage"
                    value={pkg.package.name}
                    checked={selectedPackage === pkg}
                    onChange={() => setSelectedPackage(pkg)}
                  />
                  <label
                    htmlFor={pkg.package.name}
                    className="ml-2 text-purple-700"
                  >
                    {pkg.package.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favorite Reason Input */}
        <div className="flex justify-center items-center mb-4">
          <textarea
            placeholder="Why is this your favorite?"
            className="border p-3 w-full h-20 text-center bg-white rounded-md focus:outline-none transition-all duration-300 focus:border-purple-500"
            value={favoriteReason}
            onChange={(e) => setFavoriteReason(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded transition-all duration-300 ease-in-out"
            onClick={handleAddFavorite}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFavoritePage;
