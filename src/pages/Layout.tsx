import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import PlaylistModal from "../components/PlaylistModal";
import SideBar from "../components/SideBar";
import { RootState } from "../redux/store";
import "./Layout.css";

const Layout = () => {
  const { selectedTrack } = useSelector((state: RootState) => state.playlists);
  return (
    <div className="App">
      {Object.keys(selectedTrack).length !== 0 && <PlaylistModal />}
      <div className="side-bar">
        <SideBar />
      </div>
      <div className="content">
        <Header />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
