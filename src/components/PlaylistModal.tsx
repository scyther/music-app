import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTrack } from "../redux/playlists";
import { RootState } from "../redux/store";
import { addToPlaylist } from "../utils/playlists";

const PlaylistModal: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedTrack, pNames } = useSelector(
    (state: RootState) => state.playlists
  );
  const [saveToPlaylist, setSaveToPlaylist] = useState("Default PlayList");
  const handleAddToPlaylist = () => {
    addToPlaylist(saveToPlaylist, selectedTrack, () =>
      dispatch(setSelectedTrack({}))
    );
  };
  return (
    <Modal
      show={Object.keys(selectedTrack).length !== 0}
      onHide={() => dispatch(setSelectedTrack({}))}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Select Playlist
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <select
          className="form-select"
          value={saveToPlaylist}
          onChange={(e) => setSaveToPlaylist(e.target.value)}
        >
          <option selected>Default PlayList</option>
          {pNames.map((playlistName) => (
            <option value={playlistName}>{playlistName}</option>
          ))}
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddToPlaylist}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlaylistModal;
