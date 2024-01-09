import React, { useState, useEffect } from "react";
import axios from "axios";
const AddItemToStore = ({ authStatus }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoInput, setPhotoInput] = useState("");
  const[amount,setAmountChange]= useState("");
  const [dateAdded, setDateAdded] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  useEffect(() => {
    if (categories.length == 0) {
      fetchCategories();
    }
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5288/getCategories");
      const jsonArray = response.data;
      const parsedArray = jsonArray.map((jsonString) =>
        JSON.parse(jsonString.replace(/ObjectId\("(.*?)"\)/g, '"$1"'))
      );
      parsedArray.forEach((item) => {
        console.log(item.BusinesId);
      });
      console.log(parsedArray);
      setCategories(parsedArray);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      if (formData.name.trim() === "" || formData.description.trim() === "") {
        console.error("Name and description are required.");
        return;
      }
      if (isEditing) {
        await axios.put(
          `http://localhost:5288/editCategory/${editingCategory._id}`,
          formData
        );
      } else {
        createcategory();
      }
      fetchCategories();
      setFormData({ name: "", description: "" });
      setIsEditing(false);
      setEditingCategory(null);
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };

  const createcategory = () => {
    const category = new FormData();
    category.append("Name", formData.name);
    category.append("Description", formData.description);
    category.append("BusinesId", authStatus.businessId);
    fetch("http://localhost:5288/createCategory", {
      method: "POST",
      body: category,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };
  const [iteams, setIteams] = useState([]);
  useEffect(() => {
    fetchIteams();
  }, []);
  const fetchIteams = async () => {
    try {
      const response = await axios.get("http://localhost:5288/getIteams");
      setIteams(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const createItem = (newsProduct) => {
    const newProduct = new FormData();
    newProduct.append("name", newsProduct.name);
    newProduct.append("description", newsProduct.description);
    newProduct.append("price", newsProduct.price);
    newProduct.append("category", newsProduct.category);
    newProduct.append("dateAdded", newsProduct.dateAdded);
    newProduct.append("photos", newsProduct.photos);
    newProduct.append("BusinesId", newsProduct.bysid);
    newProduct.append("BusinesName", newsProduct.bysname);
    newProduct.append("Amount", newsProduct.Amount);
    fetch("http://localhost:5288/createItem", {
      method: "POST",
      body: newProduct,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const handleEditCategory = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
    });
    setIsEditing(true);
    setEditingCategory(category);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5288/deleteCategory/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  const handleAmountChange= (e) => {
    setAmountChange(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handlePhotoInputChange = (e) => {
    setPhotoInput(e.target.value);
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setPhotos([...photos, ...fileURLs]);
  };
  const handleAddPhoto = () => {
    if (photoInput) {
      setPhotos([...photos, photoInput]);
      setPhotoInput("");
    }
  };
  const handleSubmit = (e) => {
    const bysid = authStatus.businessId;
    const bysname = authStatus.businessName;
    e.preventDefault();
    const newProduct = {
      name,
      price: parseFloat(price),
      description,
      category,
      photos,
      Amount: parseFloat(amount),
      dateAdded,
      bysid,
      bysname,
    };
    console.log(newProduct);
    setDateAdded(new Date().toISOString().slice(0, 10));
    createItem(newProduct);
  };
  return (
    <>
{authStatus ? (
            <>
              <p>{authStatus.businessId} {"  "} {authStatus.businessName}</p>
            </>
          ) : null}
      <div className="Store_category_menu">
        <div className="shop_categorycreate">
        <h2>Category Manager</h2>
        <form onSubmit={handleSubmitCategory}>
          <label>
            Name:
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </label>
          <div className="addcatbutton">
          <button onClick={createcategory}>adddd</button>
          <button type="submi">{isEditing ? "Edit" : "Create"} Category</button>
        </div>
        </form>
        </div>
        <ul className="categorylist">
        <h3>Categories</h3>
          {categories
            .filter((categoryy) => categoryy.BusinesId == authStatus.businessId)
            .map((category) => (
              <li className="categorylistiteam" key={category._id}>
                <div className="categoryinfo">
                  <p>{category.BusinesId}</p>
                  <p>{category.Name}</p>
                </div>
                <button onClick={() => handleEditCategory(category)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteCategory(category._id)}>
                  Delete
                </button>
              </li>
            ))}
        </ul>   
      </div>
      <form className="formtoadditemtostore" onSubmit={handleSubmit}>
      <h3>Додати новий продукт</h3>
        <div>
          <div id="label">
            <label htmlFor="name">Назва продукту</label>
          </div>
          <input
            className="input-nameitem"
            id="input-nameitem"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <div id="label">
            <label htmlFor="price">Ціна</label>
          </div>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <div>
          <div id="label">
          <label htmlFor="amount">Кількість</label>
          </div>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div>
          <div id="label">
            <label htmlFor="description">Опис</label>
          </div>
          <input
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <div id="label">
            <label htmlFor="photos">Фото</label>
          </div>
          <input
            type="file"
            id="photos"
            accept="image/*"
            multiple={0}
            onChange={handleFileChange}
          />
        </div>
        <div>
          <div id="label">
            <label htmlFor="dateAdded">Дата додавання</label>
          </div>
          <input
            type="date"
            id="dateAdded"
            value={dateAdded}
            onChange={(e) => setDateAdded(e.target.value)}
          />
        </div>
        <div>
          <div id="label">
            <label htmlFor="category">Категорія</label>
          </div>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            {categories ? (
              <>
                {categories
                  .filter(
                    (caategory) => caategory.BusinesId == authStatus.businessId
                  )
                  .map((category) => (
                    <option key={category._id} value={category.Name}>
                      {category.Name}
                    </option>
                  ))}
              </>
            ) : null}
          </select>
        </div>
        <button id="add" type="submit">
          <h5>Додати</h5>
        </button>
      </form>
      <div style={{ display: "flex" }}>
        {iteams ? (
          <>
            {iteams
              .filter((iteam) => iteam.BusinesId === authStatus.businessId)
              .map((item) => (
                <div key={item._id}>
                  <p>{item.Name}</p>
                  <p>{item.Description}</p>
                  <p>{item.Price}</p>
                  <p>{item.Amount}</p>
                  <p>{item.Category}</p>
                  <p>{item.DateAdded}</p>
                  <p>{item.BusinesId}</p>
                  <p>{item.BusinesName}</p>
                </div>
              ))}
          </>
        ) : null}
      </div>
    </>
  );
};
export default AddItemToStore;
