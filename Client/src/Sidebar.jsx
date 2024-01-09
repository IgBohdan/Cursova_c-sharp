import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
const Sidebar = ({ ismenuactive, togglemenu,user }) => {
  return (
    <div className={`Sidebar ${ismenuactive ? "active" : "inactive"}`}>
      {ismenuactive ? (
        <button
          type="button"
          id="menu-button"
          onClick={togglemenu}
          className={ismenuactive ? "active" : ""}
          style={{ margin: "1.5vh 0" }}
        >
          <div id="lines">
            <span id="line"></span>
            <span id="line"></span>
            <span id="line"></span>
          </div>
        </button>
      ) : (
        ""
      )}
      <div id="personInfo">
        <Link to="/account"> 
        <div id="personImg"><img src={user?.photoURL} alt="" /></div>
        </Link>
        <h3>{user?.displayName}</h3>
        <h3>{user?.email}</h3>
     
      </div>
      <div id="sidebarButtons">
      <Link to="/">
        <button className="buttonSidebar"><ion-icon class="iconSidebar" name="fast-food-outline"></ion-icon><h4>Головна</h4></button>
      </Link>
      <Link to="/myorders">
        <button className="buttonSidebar"><ion-icon class="iconSidebar" name="cart-outline"></ion-icon><h4>Мої замовлення</h4></button>
      </Link>
      <Link to="/dostavka">
        <button className="buttonSidebar"><ion-icon class="iconSidebar" name="construct-outline"></ion-icon><h4>Доставка</h4></button>
      </Link>
      <Link to="/Pages/AdminPage">
        <button className="buttonSidebar"><ion-icon class="iconSidebar" name="construct-outline"></ion-icon><h4>Налаштування</h4></button>
      </Link>
      </div>
      <Link to="/">
        <button className="buttonSidebarLogin"><ion-icon class="iconSidebar" name="enter-outline"></ion-icon><h4>Ввійти</h4></button>
      </Link>
    </div>
  );
};

export default Sidebar;
