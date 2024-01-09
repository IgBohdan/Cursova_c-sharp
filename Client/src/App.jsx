
import { useState, useEffect } from "react";
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
  NavLink,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./MainPage";
import AccountPage from "./AccountPage";
import Sidebar from "./Sidebar";
import About from "./About";
import Categorya from './resource/Pages/CetegorieTemplate/Categorya';
import IteamShop from "./resource/Pages/CetegorieTemplate/IteamShop";
import RegPartner from "./resource/Pages/RegPartner";
import RegCuryer from "./resource/Pages/RegCuryer";
import СurerPage from "./resource/Pages/curerPage";
import AdminPage from "./resource/Pages/AdminPage";
import MyOrder from "./resource/Pages/myorder";
import Test from "./Test";
import Header from "./Header";
import "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "./resource/Style/CategoryCoffe.css";
import "./resource/Style/zaklad.css";
import "./resource/Style/Categorya.css";
import "./resource/Style/Coffeein.css";
import "./resource/Style/RegPartner.css";
import "./resource/Style/Storestyle.css";
import "./resource/Style/Restorantstyle.css";
import "./resource/Style/RegCuryer.css";
import "./resource/Style/curer.css";
import "./resource/Style/admin.css";

const firebaseConfig = {
};
firebase.initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState();
  const [ismenuactive, setismenuactive] = useState(false);
  const [issearchlocationctive, setissearchlocationctive] = useState(false);
  const toggleseactlocationact = () => {
    setissearchlocationctive(!issearchlocationctive);
  };
  const togglemenu = () => {
    setismenuactive(!ismenuactive);
  };

  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  };
  useEffect(() => {
    const userinlocalStorage = getUserFromLocalStorage();
    if (userinlocalStorage) {
      setUser(userinlocalStorage);
    }
  }, []);

  return (
    <Router className="MainObser">
      <Sidebar ismenuactive={ismenuactive} togglemenu={togglemenu} user={user}/>
      <div className="MainPage">
        <>
          <Header
            user={user}
            toggleseactlocationact={toggleseactlocationact}
            togglemenu={togglemenu}
            ismenuactive={ismenuactive}
          />
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  issearchlocationctive={issearchlocationctive}
                  toggleseactlocationact={toggleseactlocationact}
                />
              }
            />
            <Route path="/account" element={<AccountPage user={user} setUser={setUser} />}/>
            <Route path="/about" element={<About />} />
            <Route path="/Category/:category/:id" element={<IteamShop user={user}/>} />
            <Route path="/Category/:category" element={<Categorya />} />
            <Route path="/dostavka" element={<СurerPage />} />
            <Route path="/JointoCurer" element={<RegCuryer />} />
            <Route path="/Jointopartner" element={<RegPartner />} />
            <Route path="/Pages/RegCuryer" element={<RegCuryer/>} />
            <Route path="/Pages/AdminPage" element={<AdminPage/>} />
            <Route path="/myorders" element={<MyOrder user={user}/>} />

            <Route path="/Test" element={<Test />} />
          </Routes>
        </>
        <footer>
            <span style={{display:"flex",width:"100%",justifyContent:"center",fontSize:"24pt",textShadow:" 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue"}}>
            <p style={{color:"aqua"}}>x</p>
            <p style={{color:"blue"}}>(</p>
            <p style={{color:"blueviolet"}}>t</p>
            <p style={{color:"blue"}}>)</p>
            <p style={{color:"white"}}>=</p>
            <p style={{color:"aqua"}}>Asin</p>
            <p style={{color:"blue"}}>(</p>
            <p style={{color:"blueviolet"}}>2πft+ϕ</p>
            <p style={{color:"blue"}}>)</p>
            </span>
        </footer>
      </div>
    </Router>
  );
};

export default App;
