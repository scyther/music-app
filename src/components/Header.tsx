import sunny from "../assets/sunny.png";
import moon from "../assets/moon.png";
import Lottie from "lottie-react";
import MusicLottie from "../singing-and-playing-music-with-guitar.json";
import "./Header.css";
import { useKeycloak } from "@react-keycloak/web";
const Header = () => {
  const { keycloak } = useKeycloak();
  return (
    <div className="App-header ">
      <Lottie animationData={MusicLottie} loop={true} className="LottieImage" />
      <div className="text">
        <h1>Your Favourite Tunes</h1>
        <p>
          All{" "}
          <span>
            <img src={sunny} alt="sun" className="icon-Image" />
          </span>{" "}
          and all{" "}
          <span>
            <img src={moon} alt="moon" className="icon-Image" />
          </span>{" "}
        </p>
        {!keycloak.authenticated && (
          <button
            type="button"
            className="btn btn-info"
            onClick={() => keycloak.login()}
          >
            Login
          </button>
        )}
        {!!keycloak.authenticated && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => keycloak.logout()}
          >
            Logout ({keycloak.tokenParsed!.preferred_username})
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
