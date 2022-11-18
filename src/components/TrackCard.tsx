import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import { addToFavourites, removeFromFavourites } from "../utils/favourites";
import "./TrackCard.css";

//redux
import { useDispatch, useSelector } from "react-redux";
import favourites, { setFavourites, toggleReload } from "../redux/favourites";
import { RootState } from "../redux/store";
import { setSelectedTrack } from "../redux/playlists";
import { Track } from "../interfaces/corousel";

const TrackCard: React.FC<{ item: Track; inFavourites?: boolean }> = ({
  item,
  inFavourites = false,
}) => {
  const dispatch = useDispatch();
  const { reload, favourites } = useSelector(
    (state: RootState) => state.favourites
  );
  const [addedToFavourites, setAddedToFavourites] =
    useState<boolean>(inFavourites);
  const toggleFavourite = (item: Track) => {
    if (!addedToFavourites) {
      return addToFavourites(item, () => {
        // setRedirect(true);
        setAddedToFavourites(true);

        dispatch(toggleReload(reload));
      });
    }
    removeFromFavourites(item.key, () => {
      setAddedToFavourites(false);
      dispatch(
        setFavourites(favourites.filter((track) => track.key !== item.key))
      );
      dispatch(toggleReload(reload));
    });
  };
  // if (redirect) {
  //   return <Navigate to="/favourites" replace={true} />;
  // }
  return (
    <div
      className="card d-flex flex-column d-flex justify-content-between border-0"
      style={{ maxHeight: "470px" }}
    >
      <img
        width="100%"
        src={item.images.coverart}
        alt={item.key}
        className="card-img-top"
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between">
          <button
            onClick={() => {
              toggleFavourite(item);
            }}
            style={{
              border: "none",
              backgroundColor: "transparent",
              outline: "none",
            }}
          >
            {(favourites.find((fav) => fav.key === item.key) ? true : false) ? (
              <>
                <AiFillHeart fill="#D82E2F" />
              </>
            ) : (
              <AiOutlineHeart />
            )}
          </button>
          <button
            onClick={() => {
              dispatch(setSelectedTrack(item));
            }}
            style={{
              border: "none",
              backgroundColor: "transparent",
              outline: "none",
            }}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <TbPlaylist />
          </button>
        </div>
        <div className="card-text ">
          <figure className="text-center ">
            <p className="fs-6 ">{item.title}</p>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
