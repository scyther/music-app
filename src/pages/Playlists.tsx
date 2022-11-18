import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistCorousel from "../components/PlaylistCorousel";
import { setPNames, setPlaylistsData } from "../redux/playlists";
import { RootState } from "../redux/store";
import {
  loadPlaylistNames,
  updatePlaylistName,
} from "../utils/playlists";
const Playlists = ({ isHome = false }) => {
  const dispatch = useDispatch();
  const [pName, setPName] = useState<string>("");
  const { pNames, reloader } = useSelector((state: RootState) => state.playlists);
  const createPlaylist = () => {
    updatePlaylistName(pName, () => setPName(""));
    dispatch(setPNames([...pNames, pName]));
  };

  useEffect(() => {
    updatePlaylistName("Default", () =>
      dispatch(setPNames(loadPlaylistNames()))
    );
  }, [reloader, dispatch]);

  return (
    <div
      className="container"
      style={{
        overflow: "auto",
        minHeight: "-webkit-fill-available",
        maxHeight: "100%",
        paddingTop: "30px",
        paddingRight: "auto",
        paddingBottom: "30px",
      }}
    >
      {!isHome && (
        <div className="input-group mb-3 container " style={{ width: "400px" }}>
          <input
            type="text"
            className="form-control unfocus-input"
            placeholder="Playlist Name"
            aria-label="Playlist Name"
            aria-describedby="basic-addon2"
            value={pName}
            onChange={(e) => {
              setPName(e.target.value);
            }}
          />
          <button
            className="input-group-text btn btn-dark btn-focus-width"
            id="basic-addon2"
            onClick={createPlaylist}
          >
            Create PlayList
          </button>
        </div>
      )}
      <div>
        {pNames?.map((playlistName) => (
          <PlaylistCorousel
            key={playlistName}
            name={playlistName}
            isHome={isHome}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlists;
