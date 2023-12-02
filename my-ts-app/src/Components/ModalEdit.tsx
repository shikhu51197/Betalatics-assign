import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

interface EditModalProps {
  onClose: () => void;
  editedFavorite: { packageName: string; favoriteReason: string };
  onSaveEdit: (editedPackage: string, editedDescription: string) => void;
}

interface Package {
  package: {
    name: string;
  };
}

const ModalEdit: React.FC<EditModalProps> = ({
  onClose,
  editedFavorite,
  onSaveEdit,
}) => {
  const [editedDescription, setEditedDescription] = useState(
    editedFavorite.favoriteReason || ""
  );
  const [packages, setPackages] = useState<Package[]>([]);
  const [editedPackage, setEditedPackage] = useState(
    editedFavorite.packageName || ""
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSaveEdit = () => {
    onSaveEdit(editedPackage, editedDescription);
  };

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`https://api.npms.io/v2/search?q=${searchQuery}`)
        .then((response) => {
          setPackages(response.data.results);
        });
    }
  }, [searchQuery]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <p className="text-lg font-bold mb-4 text-yellow-600">
          Edit Package: {editedFavorite.packageName}
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Search NPM Package</label>
          <input
            type="text"
            placeholder="Search NPM Package"
            className="border w-full p-2 rounded focus:outline-none focus:border-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {packages.length > 0 && (
          <div className="mb-4 max-h-40 overflow-y-auto">
            <h1 className="text-lg font-bold mb-2 text-yellow-400">Results</h1>
            <div className="grid grid-cols-1 gap-2">
              {packages.map((pkg) => (
                <div key={pkg.package.name} className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id={pkg.package.name}
                      name="selectedPackage"
                      value={pkg.package.name}
                      checked={editedPackage === pkg.package.name}
                      onChange={() => setEditedPackage(pkg.package.name)}
                      className="mr-3"
                    />
                    <span className="ml-3 text-sm">{pkg.package.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Edit Description</label>
          <textarea
            placeholder="Edit Description"
            className="border w-full p-2 rounded focus:outline-none focus:border-indigo-500"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-yellow-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mr-2"
            onClick={handleSaveEdit}
          >
            Save
          </button>
          <button
            className="text-yellow-600 hover:underline"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
