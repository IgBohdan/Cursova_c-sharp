import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Link,
  useParams,
  NavLink,
  json,
} from "react-router-dom";
import axios from "axios";
import "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";

import ico_cat_cofee from "./resource/ico png/free-icon-coffee.png";
import ico_cat_cosmetic from "./resource/ico png/free-icon-cosmetics.png";
import ico_cat_drug from "./resource/ico png/free-icon-drug-container.png";
import ico_cat_foodanddrink from "./resource/ico png/free-icon-food-and-drink.png";
import ico_cat_foodanddrink2 from "./resource/ico png/free-icon-food-and-drink2.png";
import ico_cat_hamburger from "./resource/ico png/free-icon-hamburger.png";
import ico_cat_wine from "./resource/ico png/free-icon-wine.png";
import delleviry from "./resource/ico png/partners-image.png";
import curier from "./resource/ico png/rider-image.png";
import imagefood from "./resource/imagefood.jpg";

function MainPage({
  ismenuactive,
  setismenuactive,
  toggleseactlocationact,
  issearchlocationctive,
}) {
  const [location, setLocation] = useState("");
  const [partners, setpartners] = useState([]);

  useEffect(() => {
    const location = localStorage.getItem("location");
    setLocation(location);
  }, []);

  useEffect(() => {
    if (partners.length == 0) {
      getPartnersdate();
    }
  }, []);

  const handleLocationInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    localStorage.setItem("location", value);
  };
  const getPartnersdate = () => {
    axios
      .get("http://localhost:5288/getPartners")
      .then((response) => {
        setpartners(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="Page-home">
        <div id="menu">
          {issearchlocationctive ? (
            <div id="location">
              <div id="icon">
                <ion-icon class="icon-flag" name="flag-outline"></ion-icon>
              </div>
              <input
                id="input-location"
                type="text"
                placeholder="Вкажіть свою адресу"
                value={location}
                onChange={handleLocationInputChange}
              />
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="cattegy">
          <Link className="categ_item" to="/Category/Coffe">
            <img src={ico_cat_cofee} alt="cofee" srcset="" />
            <p>Cofee</p>
          </Link>

          <Link to="/Category/Roz_Shop" className="categ_item">
            <img src={ico_cat_cosmetic} alt="cosmetic" srcset="" />
            <p>Cosmetic</p>
          </Link>
          <Link to="/Category/Apteka" className="categ_item">
            <img src={ico_cat_drug} alt="drug" srcset="" />
            <p>Medicament</p>
          </Link>
          <Link to="/Category/restoruant" className="categ_item">
            <img src={ico_cat_foodanddrink} alt="food and drink" srcset="" />
            <p>Ресторани</p>
          </Link>
          <Link to="/Category/Product_shop" className="categ_item">
            <img
              src={ico_cat_foodanddrink2}
              alt="alt food and drink"
              srcset=""
            />
            <p>Food</p>
          </Link>
          <Link to="/Category/Burgers" className="categ_item">
            <img src={ico_cat_hamburger} alt="burger" srcset="" />
            <p>Burgers</p>
          </Link>
          <Link to="/Category/Alcohols" className="categ_item">
            <img src={ico_cat_wine} alt="wine" srcset="" />
            <p>Alcohol</p>
          </Link>
        </div>

        <>
          <h2 id="follow_zaklad">
            <ion-icon name="bag-check-outline"></ion-icon>Заклади, які можуть
            сподобатися
          </h2>

          <div className="recommendpartnerblock">
            {partners.map((category) => (
              <Link
                className="homePageCard"
                to={`Category/categoryName/${category._id}`}
                key={category._id}
              >
                <img
                  src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,h_250,w_450/v1698997860/promoimport/vnae7sxb5lbifzjfrylr.jpg"
                  alt=""
                />
                <h2 id="name">{category.businessName}</h2>
                <section>
                  <h5 id="">
                    <ion-icon
                      class="iconLike"
                      name="thumbs-up-outline"
                    ></ion-icon>
                    95%{" "}
                  </h5>
                  <h5>10 товарів</h5>
                </section>
              </Link>
            ))}

            <div id="joinPage">
              <h1>Приєднуйтеся до нас</h1>
              <div className="joinCard">
                <img src={curier} alt="" />
                <h3>Стати кур'єром</h3>
                <Link className="joinButton" to="/JointoCurer">
                  <h3>Зареєструватися</h3>
                </Link>
              </div>
              <div className="joinCard">
                <img src={delleviry} alt="" />
                <h3>Стати партнером</h3>
                <Link className="joinButton" to="/Jointopartner">
                  <h3>Зареєструватися</h3>
                </Link>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default MainPage;
