import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
  NavLink,
} from "react-router-dom";

const RegCuryer = () => {
  const [LoginOrRegister, setLoginOrRegister] = useState(true);
  const [curer, setcurer] = useState(null);
  const [curAuthStatus, setAuthStatus] = useState(JSON.parse(localStorage.getItem("curAuthStatus")) || {});

  const toggleReg = () => {
    setLoginOrRegister(!LoginOrRegister);
  };

  const [formData, setFormData] = useState({
    iduser: "",
    initial: "",
    email: "",
    phonenumber: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("curAuthStatus"));
  
    if (authData !== null && authData.success) {
      setAuthStatus(authData);
      setcurer(true);
      setFormData({
        iduser: "",
        initial: "",
        email: "",
        phonenumber: "",
        password: "",
      });
    }
  }, []);
  
  const handleLogin = () => {
    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    fetch("http://localhost:5288/logincurer", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {

          localStorage.setItem(
            "curAuthStatus",
            JSON.stringify({
              curerId: data.curerId,
              curerEmail: data.curerEmail,
              curerName: data.curerName,
              success: true,
              authenticated: data.success,
            })
          );
          setcurer(true);
          setFormData({
            iduser: "",
            initial: "",
            email: "",
            phonenumber: "",
            password: "",
          });
        } else {
          console.error("Login failed:", data);
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("curAuthStatus");
    setcurer(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const regData = new FormData();
    regData.append("iduser", formData.iduser);
    regData.append("initial", formData.initial);
    regData.append("email", formData.email);
    regData.append("phonenumber", formData.phonenumber);
    regData.append("password", formData.password);
    fetch("http://localhost:5288/regcurer", {
      method: "POST",
      body: regData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          console.log("Registration successful:", data);
          setFormData({
            initial: "",
            email: "",
            phonenumber: "",
            password: "",
          });
          toggleReg();
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
        {curer ? (
          <div>
            <p>Authenticated as {curAuthStatus.curerName}</p>
            <Link to="/dostavka">Список із замовленнями</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div id="regCuryerFrom">
          {LoginOrRegister ? (
            <>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="initial"
                  value={formData.initial}
                  onChange={handleInputChange}
                  placeholder="Ім'я"
                />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ел. пошта"
                />
                <input
                  type="text"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleInputChange}
                  placeholder="номер телефону"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="пароль"
                />
                <button type="submit">Реєстрація</button>
              <button onClick={toggleReg}>Authorize</button>
              </form>
            </>
          ) : (
            <>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="ел. пошта"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="пароль"
              />
              <button onClick={handleLogin}>Login</button>
              <button onClick={toggleReg}>Change</button>
            </>
          )}
        </div>
        )}
    </>
  );
};

export default RegCuryer;
