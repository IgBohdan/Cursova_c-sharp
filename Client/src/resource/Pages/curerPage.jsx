import React, { useState, useEffect } from "react";
import axios from "axios";

const СurerPage = () => {
  const [orderslist, setOrdersList] = useState([]);
  const [myorderslist, setmyOrdersList] = useState([]);
  const [curAuthStatus, setAuthStatus] = useState(null);
  let authData = JSON.parse(localStorage.getItem("curAuthStatus"));
  useEffect(() => {
    authData = JSON.parse(localStorage.getItem("curAuthStatus"));
    setAuthStatus(authData);
  }, []);

  useEffect(() => {
    if (orderslist.length === 0) {
      getOrders();
    }
  }, []);

  const getOrders = () => {
    axios
      .get("http://localhost:5288/getOrders")
      .then((response) => {
        setOrdersList(response.data);
        setmyOrdersList(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const acceptOrder = (order) => {
    const requestData = {
      OrderId: order._id,
      CourierId: curAuthStatus.curerId,
      IsAccepted: true,
    };
    console.log(requestData);
    axios
      .post("http://localhost:5288/courierRequestOrder", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data && response.data.success) {
          setOrdersList((prevOrders) => [order, ...prevOrders]);
          console.log(orderslist)
            setmyOrdersList((prevOrders) =>
            prevOrders.filter((o) => o._id !== order._id)
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
      console.log(orderslist)
  };
  
  const completeOrder = (order) => {
    const requestData = {
      OrderId: order._id,
      CourierId: curAuthStatus.curerId,
      IsCompleted: true,
    };
  
    axios
      .post("http://localhost:5288/courierCompleteOrder", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data && response.data.success) {
          setOrdersList((prevOrders) =>
            prevOrders.filter((o) => o._id !== order._id)
          );
            setmyOrdersList((prevMyOrdersList) =>
            prevMyOrdersList.filter((o) => o._id !== order._id)
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <div className="curerPage">
      {authData ? (
        <div id="pageDostavka">
          <div id="myCourierOrders">
            {orderslist
              .filter(
                (item) =>
                  item.courierId === curAuthStatus.curerId &&
                  item.completed === "false"
              )
              .map((order, orderIndex) => (
                <div key={orderIndex} id="zakladinfo">
                  <h3>Замовлення №{orderIndex + 1}</h3>
                  <div>
                    {order.orderItems.map((item, itemIndex) => (
                      <div key={itemIndex} className="iteaminorder">
                        <h5>{item.name}</h5>
                        <p>{item.description}</p>
                        <p>Кількість: {item.quantity}</p>
                        <p>Ціна: ₴{item.price}</p>
                      </div>
                    ))}
                    <p>Order ID: {order._id}</p>
                    <p>
                      order address:{" "}
                      {order.orderItems.length > 0
                        ? order.orderItems[0].storeAddress
                        : ""}
                    </p>
                    <div id="actions">
                      <button onClick={() => acceptOrder(order)}>
                        <h4>Прийняти</h4>
                      </button>
                      <button onClick={() => completeOrder(order)}>
                        <h4>Завершити</h4>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <>
            <p style={{flex:"100%"}}> orderslist</p>
            {myorderslist
              .filter(
                (item) =>
                  (item.isActive === "true") & (item.completed === "false")& (item.isProcessing === "false")
              )
              .map((order, orderIndex) => (
                <div key={orderIndex} id="zakladinfo">
                  <h3>Замовлення №{orderIndex + 1}</h3>
                  <div>
                    {order.orderItems.map((item, itemIndex) => (
                      <div key={itemIndex} className="iteaminorder">
                        <h5>{item.name}</h5>
                        <p>{item.description}</p>
                        <p>Кількість: {item.quantity}</p>
                        <p>Ціна: ₴{item.price}</p>
                      </div>
                    ))}
                    <p>Order ID: {order._id}</p>
                    <p>
                      order address:{" "}
                      {order.orderItems.length > 0
                        ? order.orderItems[0].storeAddress
                        : ""}
                    </p>
                    <div id="actions">
                      <button onClick={() => acceptOrder(order)}>
                        <h4>Прийняти</h4>
                      </button>
                      <button onClick={() => completeOrder(order)}>
                        <h4>Завершити</h4>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </>
        </div>
      ) : (
        <div>Please authorize</div>
      )}
    </div>
  );
};

export default СurerPage;
