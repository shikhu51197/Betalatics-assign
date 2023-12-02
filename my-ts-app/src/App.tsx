import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AddFavoritePage from "./Components/AddFavoritePage";
import FavoritesTablePage from "./Components/FavoriteTablePage";

interface Favorite {
  id: string;
  packageName: string;
  favoriteReason: string;
}

const App: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const handleAddFavorite = (favorite: Favorite) => {
    setFavorites([...favorites, favorite]);
  };

  return (
    <Routes>
      <Route
        path="/add"
        element={<AddFavoritePage onSubmit={handleAddFavorite} />}
      />

      <Route
        path="/"
        element={
      
          <FavoritesTablePage
            favorites={favorites}
            setFavorites={setFavorites}
          /> as React.ReactElement<{ favorites: Favorite[], setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>> }>
        }
      />
    </Routes>
  );
};

export default App;
