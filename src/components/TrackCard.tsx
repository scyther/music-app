import React, { useState } from "react";
import { TrackObject } from "../interfaces/search";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { addToFavourites, removeFromFavourites } from "../utils/favourites";
// import { Navigate } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { toggleReload } from "../redux/favourites";
import { RootState } from "../redux/store";

const TrackCard: React.FC<{ item: TrackObject; inFavourites?: boolean }> = ({
  item,
  inFavourites = false,
}) => {
  const dispatch = useDispatch();
  const { reload } = useSelector((state: RootState) => state.favourites);
  const [addedToFavourites, setAddedToFavourites] =
    useState<boolean>(inFavourites);
  // const [redirect, setRedirect] = useState<boolean>(false);

  const toggleFavourite = (item: TrackObject) => {
    if (!addedToFavourites) {
      return addToFavourites(item, () => {
        // setRedirect(true);
        setAddedToFavourites(true);
        dispatch(toggleReload(reload));
      });
    }
    removeFromFavourites(item.track.key, () => {
      setAddedToFavourites(false);
      dispatch(toggleReload(reload));
    });
  };
  // if (redirect) {
  //   return <Navigate to="/favourites" replace={true} />;
  // }
  return (
    <div className="card">
      <img
        width="100%"
        src={item.track.images.coverart}
        alt={item.track.key}
        className="card-img-top"
      />
      <div className="card-body">
        <p className="card-text">{item.track.title}</p>
      </div>
      <div className="card-footer">
        <button
          onClick={() => {
            toggleFavourite(item);
          }}
          style={{ border: "none" }}
        >
          {addedToFavourites ? (
            <AiFillHeart fill="#D82E2F" />
          ) : (
            <AiOutlineHeart />
          )}
        </button>
      </div>
    </div>
  );
};

export default TrackCard;
