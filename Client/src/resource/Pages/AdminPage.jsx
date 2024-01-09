import React, { useState, useEffect } from "react";

const AdminPage = () => {
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [partnerItems, setPartnerItems] = useState([]);
  const [businessInfo, setBusinessInfo] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pg, setpg] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5288/getPartners")
      .then((response) => response.json())
      .then((data) => {
        setPartners(data);
      });

    fetch("http://localhost:5288/checkAdmin")
      .then((response) => response.json())
      .then((data) => {
        setIsAdmin(data?.isAdmin || false);
      })
      .catch((error) => {
        console.error("Error fetching admin status:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5288/getItems`)
      .then((response) => response.json())
      .then((data) => {
        setPartnerItems(data);
      })
      .catch((error) => {
        console.error("Error fetching items for business:", error);
      });
    if (selectedPartner) {
      fetch(`http://localhost:5288/getBusiness/${selectedPartner._id}`)
        .then((response) => response.json())
        .then((data) => {
          setBusinessInfo(data);
        })
        .catch((error) => {
          console.error("Error fetching business information:", error);
        });
      fetch("http://localhost:5288/getOrders")
        .then((response) => response.json())
        .then((data) => {
          setOrders(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
    fetch("http://localhost:5288/getOrders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error("Помилка при отриманні замовлень:", error);
      });
  }, [selectedPartner]);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };
  const cancelOrder = (orderId) => {
    if (!orderId) {
      console.error("Invalid order ID");
      return;
    }
    fetch(`http://localhost:5288/cancelOrder/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json() )
      .then((data) => {
        console.log("Server response:", data);
        if (data.success ===true) {
          alert("Order cancelled successfully");
          setOrders(orders.filter((order) => order._id !== orderId));
        } else {
          alert("Failed to cancel orderrrr");
        }
      })
      .catch((error) => {
        console.error("Error cancelling order:", error);
      });
  };

  const handlePartnerSelect = (partner) => {
    setSelectedPartner(partner);
  };

  const handleItemEdit = (item) => {
    setSelectedItemId(item);
    console.log(item);
    setShowEditItemModal(true);
    fetch(`http://localhost:5288/getItem/${item._id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          category: data.category || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
      });
  };
  const grantAdminRights = () => {
    fetch("http://localhost:5288/grantAdminRights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ partnerId: selectedPartner?._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Admin rights granted successfully");
        } else {
          alert("Failed to grant admin rights");
        }
      })
      .catch((error) => {
        console.error("Error granting admin rights:", error);
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedItemId) {
      console.error("Invalid item ID");
      return;
    }
    fetch(`http://localhost:5288/editItem/${selectedItemId._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          alert("Item updated successfully");
          // closeEditItemModal();
        } else {
          alert("Failed to update item");
        }
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
    console.log(formData);
  };
  const handleupdateinfoiteam = (e) => {};
  return (
    <div className="adminpage">
      <h1 style={{ flex: "100%" }}>Admin Page</h1>
      {isAdmin ? (
        <>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: "2vw",
            }}
          >
            <button
              onClick={(e) => {
                setpg(1);
              }}
            >
              show partners
            </button>
            <button
              onClick={(e) => {
                setpg(2);
              }}
            >
              show orders
            </button>
          </div>
          {pg == 1 && (
            <div className="partnerblock">
              <p>Select a partner to grant admin rights:</p>
              {partners && (
                <ul>
                  {partners.map((partner) => (
                    <li
                      key={partner._id}
                      onClick={() => handlePartnerSelect(partner)}
                    >
                      <div>
                        <p>Name: {partner.businessName}</p>
                        <p>City: {partner.city}</p>
                        <p>Type business: {partner.establishmentType}</p>
                        <p>Email: {partner.partnerEmail}</p>
                        <p>Phone: {partner.phoneNumber}</p>
                      </div>
                      <br />
                      <div className="partnerblockitems">
                        {partnerItems
                          .filter((item) => item.businesId == partner._id)
                          .map((item) => (
                            <div className="iteam" key={item.Id}>
                              <p>Name: {item.name}</p>
                              <p>Description: {item.description}</p>
                              <p>Price: {item.price}</p>
                              <p>Category: {item.category}</p>
                              <button onClick={() => handleItemEdit(item)}>
                                Edit Item
                              </button>
                            </div>
                          ))}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {selectedPartner && (
                <>
                  <button onClick={() => handleItemEdit(selectedItemId)}>
                    Edit Selected Item
                  </button>
                  <button onClick={grantAdminRights}>Grant Admin Rights</button>
                </>
              )}
            </div>
          )}
          {pg == 2 && (
            <div className="orders">
              <h2>Orders</h2>
              {orders.length > 0 ? (
                <ul>
                  {orders.map((order) => (
                    <li key={order.id}>
                      <div className="aodersinfo">
                        <p id="orederid">Order ID: </p>
                        <p id="orederid">{order._id}</p>
                        <ul id="ordersd">
                          {order.orderItems.map((item) => (
                            <li key={item.itemId}>
                              <p>Name: {item.name}</p>
                              <p>Description: {item.description}</p>
                              <p>Price: {item.price}</p>
                              <p>Quantity: {item.quantity}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button onClick={() => handleOrderSelect(order)}>
                        View Order
                      </button>
                      <button onClick={() => cancelOrder(order._id)}>
                        Cancel Order
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders available.</p>
              )}
            </div>
          )}
        </>
      ) : (
        <p>You do not have permission to access this page.</p>
      )}
      {showEditItemModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setShowEditItemModal(false);
              }}
            >
              &times;
            </span>
            <form onSubmit={handleFormSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  placeholder={selectedItemId.name}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Description:
                <input
                  name="description"
                  placeholder={selectedItemId.description}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Price:
                <input
                  type="text"
                  name="price"
                  placeholder={selectedItemId.price}
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  name="category"
                  placeholder={selectedItemId.category}
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </label>
              <button onClick={handleupdateinfoiteam} type="submit">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;