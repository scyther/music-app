import Playlists from "./Playlists";
import Favourites from "./Favourites";

const HomePage = () => {
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
      <Favourites />
      <Playlists isHome={true} />
    </div>
  );
};

export default HomePage;
