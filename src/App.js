import { ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="main-container">
        <Navbar />
        <Outlet />
        <ToastContainer autoClose={1500} />
      </div>
    </>
  );
}

export default App;
