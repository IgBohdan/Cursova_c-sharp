import React,{useEffect, useState} from 'react'
import axios from 'axios';

const MyOrder = ({user}) => {
  const[orders,setOrders]=useState([]);
  useEffect(() => {
    if (user && user.uid) {
      axios
        .get(`http://localhost:5288/getOrders/${user.uid}`)
        .then((response) => {
          console.log("User orders:", response.data);
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user orders:", error);
        });
    }
  }, [user]);
  return (
    <div className='myorderpage'>
      {orders.map((order) => (
        <div className='order' key={order._id}>
             <span>
             {order.completed !==null&&<p className={order.completed==="true" ?"green":"red"}>{order.completed==="true" ?"виконано":"не виконано"}</p>}
          {order.isProcessing =="true" &&<p className={order.isProcessing==="true" &&"green"}>{order.isProcessing==="true"&&"в процессі"}</p>}
          {order.isActive !==null && <p className={order.isActive==="true" ?"green":"red"}>{order.isActive==="true"?"активне":"неактивне"}</p>}
          </span>
        <div style={{flex:"90%",display:"flex",flexDirection:"column",gap:"2vh"}}>
        {order.orderItems.map((orderiteam) => (
            <div className='orderlistiteam' key={orderiteam._id}>
              <p>Name: {orderiteam.name}</p>
              <p>Price: {orderiteam.price}</p>
              <p>Quantity: {orderiteam.quantity}</p>
            </div>
          ))}
        </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrder