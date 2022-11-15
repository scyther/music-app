import "./SideBar.css";
import {Link} from "react-router-dom"
const SideBar = () => {
  return (
    <div className="sidebar-container">
      <div className="link-div">
        <Link to='/' className="link-light link">
          Home
        </Link>
      </div>
      <div className="link-div">
        <Link to='/search'  className="link-light link">
          Search
        </Link>
      </div>
      <div className="link-div">
        <Link to='/favourites'  className="link-light link">
          Favourites
        </Link>
      </div>
      <div className="link-div">
        <Link to='/playlists'  className="link-light link">
          Playlists
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
