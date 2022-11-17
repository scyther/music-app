import { useEffect } from "react";
import SearchCarousel from "../components/SearchCarousel";
import type { RootState } from "../redux/store";

import { loadFavourites } from "../utils/favourites";
import { AiFillHeart } from "react-icons/ai";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setFavourites } from "../redux/favourites";

const Favourites = () => {
  const dispatch = useDispatch();
  const { favourites, reload } = useSelector(
    (state: RootState) => state.favourites
  );
  useEffect(() => {
    let favourites = loadFavourites();
    dispatch(setFavourites(favourites));
  }, [dispatch, reload]);

  return (
    <div
      className="container"
      style={{
        overflow: "auto",
        minHeight: "-webkit-fill-available",
        maxHeight: "100%",
        paddingTop: "30px",
        paddingRight: "auto",
      }}
    >
      <SearchCarousel
        name="Favourites"
        data={favourites}
        icon={<AiFillHeart fill="#D82E2F" />}
      />
    </div>
  );
};

export default Favourites;
