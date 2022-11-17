import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistCorousel from "../components/PlaylistCorousel";
import { setPNames } from "../redux/playlists";
import { RootState } from "../redux/store";
import {
  loadPlaylist,
  loadPlaylistNames,
  updatePlaylistName,
} from "../utils/playlists";
const Playlists = () => {
  const dispatch = useDispatch()
  const [pName, setPName] = useState<string>("");
  // const [pNames, setPNames] = useState<string[]>([]);
  const {pNames, reload } = useSelector((state: RootState) => state.playlists);
  // const [playlists, setPlaylists] = useState({});
  const createPlaylist = () => {
    updatePlaylistName(pName, () => setPName(""));
    dispatch(setPNames([...pNames, pName])) ;
  };

  useEffect(() => {
    dispatch(setPNames(loadPlaylistNames()));
  }, [ reload , dispatch]);

  // useEffect(() => {
  //   let tempPlaylists = playlists;
  //   pNames.forEach((playlistName) => {
  //     tempPlaylists = {
  //       ...playlists,
  //       playlistName: loadPlaylist(playlistName),
  //     };
  //   });
  //   setPlaylists(tempPlaylists)
  // }, [pNames, playlists]);

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
      <div>
        {pNames.map((playlistName) => (
          <PlaylistCorousel
            name={playlistName}
            data={loadPlaylist(playlistName) || []}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlists;
