import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    useParams,
    NavLink,
  } from "react-router-dom";
const Restorants = () => {
  return (
    <>
        <section>
        <div className="blockOne">
          <div id="page">
            <h3 id="tagg">Ресторани: доставка у м. Івано-Франківськ</h3>
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
            <h3 id="actionText">Промакції</h3>
            <div id="action">
              <Link className="actioncard" to="/Category/Medicament/Podoroznyk">
                <div id="actionshow">
                  <h3>-20%</h3>
                </div>
                <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_1.0,h_122,w_270,b_transparent/Stores/g3gixruodjtwr2brflvz" alt="" />
                <h2 id="name">Smaki Maki</h2>
                <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>91%</h5>
              </Link>
              <Link className="actioncard" to="/Category/Medicament/Podoroznyk">
                <div id="actionshow">
                  <h3>-10%</h3>
                </div>
                <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/ajushxoh17mmvubq9z4s" alt="" />
                <h2 id="name">SushiGoPizza</h2>
                <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>98%</h5>
              </Link>
              <Link className="actioncard" to="/Category/Medicament/Podoroznyk">
                <div id="actionshow">
                  <h3>-10%</h3>
                </div>
                <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/cj4zbu9yuezxspgkznzd" alt="" />
                <h2 id="name">Sandwich Bar</h2>
                <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>94%</h5>
              </Link>
            </div>
            <h3 id="actionText2">Всі заклади</h3>
            <div id="pageRestorants">
                <Link className="restorants" to="/Category/Medicament/Podoroznyk">
                  <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/v1698997860/promoimport/vnae7sxb5lbifzjfrylr.jpg" alt="" />
                  <h2 id="name">KFC</h2>
                  <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>95%</h5>
                </Link>
                <Link className="restorants" to="/Category/Medicament/Podoroznyk">
                  <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/t54sobgbjgzwiihnalzi" alt="" />
                  <h2 id="name">Sushi Story</h2>
                  <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>87%</h5>
                </Link>
                <Link className="restorants" to="/Category/Medicament/Podoroznyk">
                  <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/mny87abj1ipduje3gkqz" alt="" />
                  <h2 id="name">McDonald`s</h2>
                  <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>85%</h5>
                </Link>
                <Link className="restorants" to="/Category/Medicament/Podoroznyk">
                  <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/tsqygvawra7c5ghds6nk" alt="" />
                  <h2 id="name">Royal Burger</h2>
                  <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>90%</h5>
                </Link>
                <Link className="restorants" to="/Category/Medicament/Podoroznyk">
                  <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/kvco85a47epzlwnrdrbq" alt="" />
                  <h2 id="name">Feniks</h2>
                  <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>89%</h5>
                </Link>
                <Link className="restorants" to="/Category/Medicament/Podoroznyk">
                  <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/nnhlbkbn9ibuchewiqnu" alt="" />
                  <h2 id="name">Burgerna №1</h2>
                  <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>83%</h5>
                </Link>
                <Link className="restorants" to="/Category/Medicament/Podoroznyk">
                  <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/haoi8755buxrykjpnuuc" alt="" />
                  <h2 id="name">Kvevri</h2>
                  <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>94%</h5>
                </Link>
                <Link className="restorants" to="/Category/Medicament/Podoroznyk">
                  <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/bm8pshtnplujhqvxgpkv" alt="" />
                  <h2 id="name">Smak Hruzii</h2>
                  <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>98%</h5>
                </Link>
                <Link className="restorants" to="/Category/Medicament/Podoroznyk">
                  <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/gjxkdfcxvagzwep5jkkg" alt="" />
                  <h2 id="name">Bybble Tea Space</h2>
                  <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>87%</h5>
                </Link>
                <Link className="restorants" to="/Category/Medicament/Podoroznyk">
                  <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/ydallpfbeti5pb7nieiz" alt="" />
                  <h2 id="name">Hastrobar Balkon</h2>
                  <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>85%</h5>
                </Link>
                <Link className="restorants" to="/Category/Medicament/Podoroznyk">
                  <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/jrcs141lpewa6kudesju" alt="" />
                  <h2 id="name">Restoran Nadiya</h2>
                  <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>91%</h5>
                </Link>
                <Link className="restorants" to="/Category/Medicament/Podoroznyk">
                  <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/kzf8bw5jdhghurwpdih6" alt="" />
                  <h2 id="name">TREBA PIZZA</h2>
                  <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>96%</h5>
                </Link>
                <Link className="restorants" to="/Category/Medicament/Podoroznyk">
                  <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/zxjx8ngqstcsfnylxqkd" alt="" />
                  <h2 id="name">Zenyk Varenyk</h2>
                  <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>87%</h5>
                </Link>
                <Link className="restorants" to="/Category/Medicament/Podoroznyk">
                  <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_1.0,h_156,w_351,b_transparent/Stores/bqlqhdyneyu38plggbbb" alt="" />
                  <h2 id="name">Home 5niza</h2>
                  <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>97%</h5>
                </Link>
                <Link className="restorants" to="/Category/Medicament/Podoroznyk">
                  <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/wed5zyi2yd24z8v1tajs" alt="" />
                  <h2 id="name">Greek rest</h2>
                  <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>92%</h5>
                </Link>
                <Link className="restorants" to="/Category/Shops/Coffeein">
                <img src="https://res.cloudinary.com/glovoapp/q_30,f_auto,c_fill,dpr_3.0,h_156,w_351,b_transparent/Stores/xetrnfrcdtxgjz2h9tsu" alt="" />
                <h2 id="name">Coffee</h2>
                <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>92%</h5>
              </Link>
              <Link className="restorants" to="/Category/Shops/Coffeein">
                <img src="https://imgtest.mir24.tv/uploaded/images/crops/2019/September/870x489_0x101_detail_crop_7c84060946be2b97f2587b71bfd13d43d645829d97b2f52eb81c71831b32f353.jpg" alt="" />
                <h2 id="name">Narkota</h2>
                <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>92%</h5>
              </Link>
              <Link className="restorants" to="/Category/Shops/Coffeein">
                <img src="https://imgtest.mir24.tv/uploaded/images/crops/2019/September/870x489_0x101_detail_crop_7c84060946be2b97f2587b71bfd13d43d645829d97b2f52eb81c71831b32f353.jpg" alt="" />
                <h2 id="name">Narkota</h2>
                <h5 id=""><ion-icon class="iconLike" name="thumbs-up-outline"></ion-icon>40%</h5>
              </Link> 
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Restorants;