import { useKeycloak } from '@react-keycloak/web'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favourites from "./pages/Favourites";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Playlists from "./pages/Playlists";
import Search from "./pages/Search";
import PrivateRoute from "./utils/PrivateRoute";

const AppRoutes = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<Search />} />
            <Route path="favourites" element={<Favourites />} />
            <Route
              path="playlists"
              element={
                <PrivateRoute>
                  <Playlists />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default AppRoutes;
