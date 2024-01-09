import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";
const Categorya = ({ newzakladinf, iffreedelev }) => {
  iffreedelev = true;
  const currentURL = window.location.href;
  const categoryname = /\/Category\/([\w\d]+)/;
  const match = currentURL.match(categoryname);
  const [partners, setpartners] = useState([]);
  useEffect(() => {
    if (partners.length == 0) {
      getPartnersdate();
    }
  }, []);
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
    <div className="blockOne">
      <div id="page_category">
        <div id="section">
          <div id="section1">
            <h5>Популярні фільтри</h5>
            <a href="">Бургери</a>
            <a href="">Піца</a>
            <a href="">Фаст-фуд</a>
          </div>
          <div id="section2">
            <h5>Більше фільтрів</h5>
            <a href="">Азіатська</a>
            <a href="">Американська</a>
            <a href="">Близькосхідна</a>
            <a href="">Вегетеріанська</a>
            <a href="">Випічка</a>
            <a href="">Грузинська</a>
            <a href="">Десерти</a>
            <a href="">Європейська</a>
            <a href="">Італійська</a>
            <a href="">Морепродукти</a>
            <a href="">Суші</a>
            <a href="">Українська</a>
            <a href="">Шаурма</a>
          </div>
        </div>
        <div id="sect2">
          <h3 id="tagg">Ресторани: доставка у м. Івано-Франківськ</h3>
          <h3 id="actionText">Промакції(поки що не робочі)</h3>
          <div id="action">
            <Link
              className="actioncard"
              to="/Category/categoryName/nameProduct"
            >
              <div id="actionshow">
                <h3>-20%</h3>
              </div>
              <img
                src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_1.0,h_122,w_270,b_transparent/Stores/g3gixruodjtwr2brflvz"
                alt=""
              />
              <h2 id="name">Smaki Maki</h2>
              <h5 id="">
                <ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>
                91%
              </h5>
            </Link>
            <Link
              className="actioncard"
              to="/Category/categoryName/nameProduct"
            >
              <div id="actionshow">
                <h3>-10%</h3>
              </div>
              <img
                src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/ajushxoh17mmvubq9z4s"
                alt=""
              />
              <h2 id="name">SushiGoPizza</h2>
              <h5 id="">
                <ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>
                98%
              </h5>
            </Link>
            <Link
              className="actioncard"
              to="/Category/categoryName/nameProduct"
            >
              <div id="actionshow">
                <h3>-10%</h3>
              </div>
              <img
                src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/cj4zbu9yuezxspgkznzd"
                alt=""
              />
              <h2 id="name">Sandwich Bar</h2>
              <h5 id="">
                <ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>
                94%
              </h5>
            </Link>
          </div>
          <h3 id="actionText2">Всі заклади</h3>
          <div id="pageRestorants">
            {partners
              .filter((categoryy) => categoryy.establishmentType === match[1])
              .map((category) => (
                <Link className="actioncard" to={`${category._id}`}>
                  <div id="actionshow">
                <h3>-20%</h3>
              </div>
                  <img
                    src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/v1698997860/promoimport/vnae7sxb5lbifzjfrylr.jpg"
                    alt=""
                  />
                  <h2 id="name">
                    <p>{category.businessName}</p>
                  </h2>
                  <h5 id="">
                    <ion-icon
                      class="iconLike"
                      name="thumbs-up-outline"
                    ></ion-icon>
                    15%
                  </h5>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Categorya;
