import React, { useState, useEffect } from "react";
import axios from "axios";
const IteamShop = ({user}) => {
  const [iteams, setIteams] = useState([[]]);
  const [groupedItems, setGroupedItems] = useState({});
  const [currentCategory, setCurrentCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    getIteams();
  }, []);
  const getBusinessIdSomehow = () => {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/');
    const businessIndex = pathSegments.indexOf('business');
    console.log(pathSegments[3]);
    return pathSegments[3];
  };
  const getIteams = () => {
    axios
      .get("http://localhost:5288/getItems")
      .then((response) => {
        const allItems = response.data;
        const businessId = getBusinessIdSomehow();
  console.log(allItems)
        const filteredItems = allItems.filter(item => item.businesId === businessId);
        setIteams(filteredItems);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const groupedItems = {};
    iteams.forEach((item) => {
      const category = item.category;
      if (!groupedItems[category]) {
        groupedItems[category] = [];
      }
      groupedItems[category].push(item);
    });
    setGroupedItems(groupedItems);
  }, [iteams]);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      console.log("Item already in cart. Updating quantity.");
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      console.log("Item not in cart. Adding new item.");
      const newItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  };
  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };
  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };
  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cart]);
  const submitOrder = () => {
    const userId = user.uid;
    const location = localStorage.getItem("location");
      const orderData = {
      userId: userId,
      location:location,
      orderItems: cart.map((item) => ({
        itemId: item.id,
        quantity: item.quantity,
      })),
    };
    console.log(orderData);
    axios
      .post("http://localhost:5288/submitOrder", orderData)
      .then((response) => {
        console.log("Order submitted successfully:", response.data);
        setCart([]);
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
      });
  };

  return (
    <>
      <section id="sect_shop">
        <div id="sections">
          <h5 onClick={() => handleCategoryClick("all")}>ALL</h5>
          {[...new Set(Object.keys(groupedItems))].map((category) => (
            <h5 key={category} onClick={() => handleCategoryClick(category)}>
              {category}
            </h5>
          ))}
        </div>
        <div className="listiteamshop">
          {Object.keys(groupedItems).map((category) => (
            <div
              key={category}
              className="categorysshops"
              style={{
                display:
                  currentCategory === "all" || currentCategory === category
                    ? "flex"
                    : "none",
              }}
            >
              <h3>{category}</h3>
              {groupedItems[category].map((item) => (
                <div id="drinkBlock" key={item._id}>
                  <h5>
                    {item.name} {item.amount}
                  </h5>
                  <div
                    style={{
                      display: "flex",
                      flex: "100%",
                      height: "max-content",
                      marginTop: "auto",
                      marginRight: "5px",
                      width: "max-content",
                      alignItems: "center",
                    }}
                  >
                    <h5 id="textMoney">{item.price}₴</h5>
                    <button className="addtocardbutton" onClick={() => addToCart(item)}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
<div>
{Object.keys(groupedItems).map((category) => (
  <div key={category}>
    {groupedItems[category].length > 0 ? (
        <div id="order">
        <section>
          <h1>Your Order</h1>
          {cart.length > 0 ? (
            <div>
              <h4>Items in Cart:</h4>
              {cart.map((cartItem) => (
                <div key={cartItem._id}>
                  <p>
                    {cartItem.name} - {cartItem.price}₴ x{" "}
                    {cartItem.quantity}
                  </p>
                  <button
                  className="addtocardbutton"
                    onClick={() =>
                      updateQuantity(cartItem.id, cartItem.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{cartItem.quantity}</span>{" "}
                  <button
                  className="addtocardbutton"
                    onClick={() =>
                      updateQuantity(cartItem.id, cartItem.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button className="addtocardbutton" onClick={() => removeFromCart(cartItem.id)}>
                    Remove from Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <img
              src="https://glovoapp.com/images/svg/astronaut-grey-scale.svg"
              alt=""
            />
          )}
          <div id="bottom">
            {totalPrice > 350 ? (
              <>
                <h5>Total: {totalPrice} ₴</h5>
              </>
            ) : (
              <>
                <h5>
                  If the order amount reaches 350.00 ₴, you will save 30.00 ₴
                  on fees!
                </h5>
              </>
            )}
            <button id="orderBuy" onClick={submitOrder}>Buy Order</button>
          </div>
        </section>
      </div>
    ) : null}
  </div>
))}
</div>
      </section>{" "}
    </>
  );
};

export default IteamShop;
