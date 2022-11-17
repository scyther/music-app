import React, { useState } from "react";
import { TrackObject } from "../interfaces/search";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import { addToFavourites, removeFromFavourites } from "../utils/favourites";
// import { Navigate } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { toggleReload } from "../redux/favourites";
import { RootState } from "../redux/store";
import { setSelectedTrack } from "../redux/playlists";

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
    <div
      className="card d-flex flex-column d-flex justify-content-between"
      style={{ height: "470px" }}
    >
      
      <img
        width="100%"
        src={item.track.images.coverart}
        alt={item.track.key}
        className="card-img-top"
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="card-text ">
          <figure className="text-center">
            <blockquote className="blockquote">
              <p className="fs-6 ">{item.track.title}</p>
            </blockquote>
            <figcaption className="blockquote-footer">
              <p>{item.track.subtitle}</p>
            </figcaption>
          </figure>
        </div>
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
            {addedToFavourites ? (
              <>
                <AiFillHeart fill="#D82E2F" /> Liked
              </>
            ) : (
              <AiOutlineHeart />
            )}
          </button>
          <button
            onClick={() => {
              dispatch(setSelectedTrack(item))
              // toggleFavourite(item);
            }}
            style={{
              border: "none",
              backgroundColor: "transparent",
              outline: "none",
            }}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            {addedToFavourites ? (
              <>
                <TbPlaylist /> Add to Playlist
              </>
            ) : (
              <AiOutlineHeart />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
