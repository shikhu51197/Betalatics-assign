import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaTrash, FaRegEdit } from "react-icons/fa";
import Welcome from "./HomePage";
import EditModal from "./ModalEdit";
import ModalView from "./ModalView";


interface Favorite {
  id: string;
  packageName: string;
  favoriteReason: string;
}

interface FavoritesTableProps {
  favorites: Favorite[];
  setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>>;
}

const FavoritesTablePage: React.FC<FavoritesTableProps> = ({
  favorites,
  setFavorites,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedFavorite, setSelectedFavorite] = useState<Favorite | null>(
    null
  );
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [viewedFavorite, setViewedFavorite] = useState<Favorite | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editedFavorite, setEditedFavorite] = useState<Favorite | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as Favorite[];
    setFavorites(storedFavorites);
  }, [setFavorites]);

  const handleDeleteClick = (favorite: Favorite) => {
    setSelectedFavorite(favorite);
    setShowDeleteModal(true);
  };

  const handleViewClick = (favorite: Favorite) => {
    setViewedFavorite(favorite);
    setShowViewModal(true);
  };

  const handleEditClick = (favorite: Favorite) => {
    setEditedFavorite(favorite);
    setShowEditModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedFavorite) {
      const updatedFavorites = favorites.filter(
        (fav) => fav.id !== selectedFavorite.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      setFavorites(updatedFavorites);
      setShowDeleteModal(false);
    }
  };

  const handleViewModalClose = () => {
    setShowViewModal(false);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleSaveEdit = (
    editedPackage: string,
    editedDescription: string
  ) => {
    if (editedFavorite) {
      const updatedFavorites = favorites.map((fav) =>
        fav.id === editedFavorite.id
          ? {
              ...fav,
              favoriteReason: editedDescription,
              packageName: editedPackage,
            }
          : fav
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      setFavorites(updatedFavorites);
      setShowEditModal(false);
    }
  };

  const handleAddNewPackage = () => {
    navigate("/add");
  };

  return (
    <div className=" p-20 rounded-lg  w-4/5 mx-auto mt-10 h-auto border border-solid border-black bg-slate-300 ">
      {favorites.length > 0 ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-zinc-900  "> Welcome to Favorite NPM Packages</h2>
            <div className='flex'>
            <button
              className="bg-lime-500 hover:bg-lime-700 text-black    touch-pan-up hover:text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              onClick={handleAddNewPackage}
            >
              Add New Favorite Package ⭐
              
            </button></div>
          </div>
          <table className="table-fixed w-4/5 mx-auto mt-24 bg-gray-100 rounded-md overflow-hidden border border-gray-300">
  <thead>
    <tr className="bg-pink-500 text-white">
      <th className="border px-4 py-2">Package Name</th>
      <th className="border px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {favorites.map((favorite) => (
      <tr key={favorite.id}>
        <td className="border px-4 py-2 text-center">{favorite.packageName}</td>
        <td className="border px-4 py-2 space-x-10 text-center ">
          <button
            className="text-yellow-500 hover:underline transition duration-300 ease-in-out transform hover:scale-110"
            onClick={() => handleViewClick(favorite)}
          >
            <FaEye size={20} />
          </button>
          <button
            className="text-blue-500 hover:underline transition duration-300 ease-in-out transform hover:scale-110 ml-2"
            onClick={() => handleEditClick(favorite)}
          >
            <FaRegEdit size={20} />
          </button>
          <button
            className="text-red-500 hover:underline transition duration-300 ease-in-out transform hover:scale-110 ml-2"
            onClick={() => handleDeleteClick(favorite)}
          >
            <FaTrash size={20} />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      ) : (
        <Welcome onClickAdd={handleAddNewPackage} />
      )}

      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-70">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <p className="text-xl font-bold mb-4 text-red-500">
              Are you sure you want to delete?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out mr-2"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showViewModal && (
        <ModalView
          onClose={handleViewModalClose}
          viewedFavorite={viewedFavorite as Favorite}
        />
      )}

      {showEditModal && (
        <EditModal
          onClose={handleEditModalClose}
          editedFavorite={editedFavorite as Favorite}
          onSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default FavoritesTablePage;
