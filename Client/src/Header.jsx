import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
  NavLink,
} from "react-router-dom";
const Header = ({
  togglemenu,
  setismenuactive,
  ismenuactive,
  toggleseactlocationact,
  user,
}) => {
  return (
    <>
      <header>
        <button
          type="button"
          id="menu-button"
          onClick={togglemenu}
          className={ismenuactive ? "active" : ""}
        >
          <div id="lines">
            <span id="line"></span>
            <span id="line"></span>
            <span id="line"></span>
          </div>
        </button>
        <h1>Foody</h1>

        {user ? (
          <>
            <input
              style={{
                margin: "auto",
              }}
              id="searchInHeader"
              className="searchinput"
              type="text"
              placeholder="Search"
            />
            <Link to="/account">
              <button
                className="buttonS"
                id="acount-button"
                style={{ maxWidth: "max-content" }}
              >
                AcountPage
              </button>
            </Link>

            <Link to="/about">
              <button
                className="buttonS"
                id="acount-button"
                style={{ maxWidth: "max-content", margin: "auto" }}
              >
                <ion-icon name="information-circle-outline"></ion-icon>
              </button>
            </Link>
            <button
              style={{ maxWidth: "max-content", margin: "0" }}
              className="buttonS"
              onClick={toggleseactlocationact}
            >
              <ion-icon name="location-outline"></ion-icon>
            </button>
          </>
        ) : (

            <>
              <h4 id="text-header-nologin">Вперше тут? Зареєструйтеся.</h4>
              <Link className="buttonS"
                  id="registration"
                  style={{ maxWidth: "max-content" }} to="/account">

                  Розпочати
              </Link>
            </>
  
        )}
      </header>
    </>
  );
};

export default Header;
