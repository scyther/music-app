import Carousel from "better-react-carousel";
import React, { useEffect, useState } from "react";
import TrackCard from "./TrackCard";

import { AiFillDelete } from "react-icons/ai";
import { deletePlaylist, loadPlaylist } from "../utils/playlists";

//redux
import { useSelector, useDispatch } from "react-redux";
import { toggleReload } from "../redux/playlists";
import { RootState } from "../redux/store";
import { Track } from "../interfaces/corousel";

const PlaylistCorousel: React.FC<{
  name: string;
  icon?: React.ReactNode;
  isHome?: boolean;
}> = ({ name, icon, isHome = false }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const {  reloader} = useSelector(
    (state: RootState) => state.playlists
  );
  const { favourites, reload } = useSelector(
    (state: RootState) => state.favourites
  );
  useEffect(() => {
    setData(loadPlaylist(name) || []);
  }, [reload,name,reloader,favourites]);
  return (
    <div className="container p-3 ">
      <div className="d-flex justify-content-between">
        <h6 className="text-secondary text-sm-start">
          {icon && <span>{icon}</span>}
          {name}
        </h6>
        {!isHome && (
          <button
            className="btn btn-danger rounded "
            onClick={() => {
              deletePlaylist(name, () => dispatch(toggleReload(reloader)));
            }}
          >
            <AiFillDelete />
          </button>
        )}
      </div>
      <hr />
      {data.length === 0 ? (
        <div>Nothing to Display</div>
      ) : (
        <Carousel cols={7} rows={1} gap={10} loop>
          {data?.map((item: Track) => (
            <Carousel.Item
              key={item.key}
              style={{ height: "100px", zIndex: -1 }}
            >
              <TrackCard
                item={item}
                inFavourites={
                  favourites.find((fav) => fav.key === item.key) ? true : false
                }
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default PlaylistCorousel;
