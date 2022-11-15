import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="App">
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
