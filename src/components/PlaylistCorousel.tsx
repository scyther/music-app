import Carousel from "better-react-carousel";
import React from "react";
import { TrackObject } from "../interfaces/search";
import TrackCard from "./TrackCard";

import { AiFillDelete } from "react-icons/ai";
import { deletePlaylist } from "../utils/playlists";

//redux
import { useSelector, useDispatch } from "react-redux";
import { toggleReload } from "../redux/playlists";
import { RootState } from "../redux/store";

const PlaylistCorousel: React.FC<{
  name: string;
  data: TrackObject[];
  icon?: React.ReactNode;
}> = ({ name, data, icon }) => {
  const dispatch = useDispatch();
  const { reload } = useSelector((state: RootState) => state.playlists);
  return (
    <div className="container p-4 ">
      <div className="d-flex justify-content-between">
        <h6 className="text-secondary text-sm-start">
          {icon && <span>{icon}</span>}
          {name}
        </h6>
        <button
          className="btn btn-danger rounded "
          onClick={() => {
            deletePlaylist(name, () => dispatch(toggleReload(reload)));
          }}
        >
          <AiFillDelete />
        </button>
      </div>
      <hr />
      {data.length === 0 ? (
        <div>Nothing to Display</div>
      ) : (
        <Carousel cols={5} rows={1} gap={10} loop>
          {data?.map((item: TrackObject) => (
            <Carousel.Item
              key={item.track.key}
              style={{ height: "100px", zIndex: -1 }}
            >
              <TrackCard item={item} inFavourites={name === "Favourites"} />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default PlaylistCorousel;
