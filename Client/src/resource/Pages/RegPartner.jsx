import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
  useNavigation,
  NavLink,
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AddItemToStore from "./ui_component/addItemToStore";
const RegPartner = () => {
  const [isreg, setisreg] = useState(true);
  const [partner, setpartner] = useState();
  const [authStatus, setauthStatus] = useState(null);
const navigate = useNavigate();
  const togglereg = () => {
    setisreg(!isreg);
  };
  const [formData, setformData] = useState({
    City: [],
    BusinessName: [],
    PartnerName: [],
    PartnerEmail: [],
    Password: [],
    PhoneNumber: [],
    EstablishmentType: [],
    AcceptPolicy: null,
  });
  const datefromuser = formData;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setformlogindata((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setformData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const authdata=JSON.parse(localStorage.getItem("authStatus"))
    setauthStatus(authdata);

    if (authdata) {
      const { authenticated } = authdata.authenticated;
      const { id } = authdata.businessId;
      console.log(authdata);
      if (authdata.authenticated) {
        setpartner(authdata.authenticated);
      }
    }
  }, []);

  const [formlogindata, setformlogindata] = useState({
    PartnerEmail: [],
    Password: [],
  });

  const handlelogin = (e) => {
    e.preventDefault();
    const loginData = new FormData();
    loginData.append('login', formlogindata.PartnerEmail);
    loginData.append('password', formlogindata.Password);
  
    if (!formlogindata.PartnerEmail || !formlogindata.Password) {
      alert('Please provide both email and password.');
      return;
    }
    if (formlogindata.PartnerEmail || formlogindata.Password) {
      fetch('http://localhost:5288/login', {
        method: 'POST',
        body: loginData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('data', data);
          if (data.success === true) {
            setpartner(true);
            setformlogindata({
              PartnerEmail: '',
              Password: '',
            });
    
            console.log('Login successful:', data);
            localStorage.setItem(
              'authStatus',
              JSON.stringify({
                businessId: data.businessId,
                businessName: data.businessName,
                success: true,
                authenticated: data.success,
              })
            );
          }
        })
        .catch((error) => {
          console.error('Login failed:', error);
        });
    }
  
    
  };
  
  const handleLogout = () => {
    localStorage.removeItem("authStatus");
    setpartner(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const requiredFields = ['City', 'BusinessName', 'PartnerName', 'PartnerEmail', 'Password', 'PhoneNumber', 'EstablishmentType', 'AcceptPolicy'];
    const isFormValid = requiredFields.every((field) => formData[field]);
    if (!isFormValid) {
      alert('Please fill in all required fields.');
      return;
    }
    formData.append('AcceptPolicy', datefromuser.AcceptPolicy);
    formData.append('BusinessName', datefromuser.BusinessName);
    formData.append('City', datefromuser.City);
    formData.append('EstablishmentType', datefromuser.EstablishmentType);
    formData.append('PartnerName', datefromuser.PartnerName);
    formData.append('partnerEmail', datefromuser.PartnerEmail);
    formData.append('PhoneNumber', datefromuser.PhoneNumber);
    formData.append('Password', datefromuser.Password);
  
    fetch('http://localhost:5288/api/action', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          console.log(data);
          setformData({
            City: [],
            BusinessName: '',
            PartnerName: '',
            PartnerEmail: '',
            Password: '',
            PhoneNumber: '',
            EstablishmentType: '',
            AcceptPolicy: null,
          });
          togglereg();
        }
      })
      .catch((error) => console.error('Помилка: ' + error));
  };
  
  return (
    <>
      {partner ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <AddItemToStore authStatus={authStatus}/>
        </>
      ) : (
        <>
          <div>
            {isreg ? (
              <div id="regPage">
                <h4>Розпочніть продавати в Foody</h4>
                <input
                  className="RegPArtnerinput"
                  type="text"
                  name="City"
                  value={formData.City}
                  onChange={handleInputChange}
                  placeholder="Адреса"
                />
                <ion-icon class="regIconPartner" name="home-outline"></ion-icon>
                <input
                  className="RegPArtnerinput"
                  type="text"
                  name="BusinessName"
                  value={formData.BusinessName}
                  onChange={handleInputChange}
                  placeholder="Назва бізнесу"
                />
                <ion-icon class="regIconPartner" name="wallet-outline"></ion-icon>
                <input
                  className="RegPArtnerinput"
                  type="text"
                  name="PartnerName"
                  id="partner_name"
                  value={formData.PartnerName}
                  onChange={handleInputChange}
                  placeholder="Ім'я"
                />
                <ion-icon class="regIconPartner" name="bulb-outline"></ion-icon>
                <input
                  className="RegPArtnerinput"
                  type="text"
                  name="PartnerEmail"
                  id="partner_mail"
                  value={formData.PartnerEmail}
                  onChange={handleInputChange}
                  placeholder="Електронна пошта"
                />
                <ion-icon class="regIconPartner" name="mail-outline"></ion-icon>
                <input
                  className="RegPArtnerinput"
                  type="text"
                  name="Password"
                  id=""
                  value={formData.Password}
                  onChange={handleInputChange}
                  placeholder="password"
                />
                <ion-icon class="regIconPartner" name="lock-closed-outline"></ion-icon>
                <input
                  className="RegPArtnerinput"
                  type=""
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleInputChange}
                  placeholder="Номер телефону"
                />
                <ion-icon class="regIconPartner" name="call-outline"></ion-icon>

                <select
                  className="RegPArtnerinputRegPArtnerselector"
                  name="EstablishmentType"
                  value={formData.EstablishmentType}
                  onChange={handleInputChange}
                  placeholder="1u8878"
                >
                  <option value="">Тип закладу</option>
                  <option value="restoruant">Ресторан</option>
                  <option value="Apteka">Аптека</option>
                  <option value="Product_shop">Продуктовий магазин</option>
                  <option value="Roz_Shop">Роздрібний магазин</option>
                </select>

                <div className="RegPArtnerinput_checkbox">
                  <input
                    type="checkbox"
                    name="AcceptPolicy"
                    checked={formData.AcceptPolicy}
                    onChange={handleInputChange}
                  />
                  <p>Я приймаю політику</p>
                </div>
                <button
                  className="RegPArtnerinput_buttonsubmit"
                  onClick={handleSubmit}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            ) : (
              <div id="regPage">
                <h1  className="authlogo">Авторизація</h1>
                <p className="log">Foody</p>

                <div style={{marginBottom:'auto',display:'flex',flexDirection:"column",gap:'3vh'}}>
                <input
                  className="RegPArtnerinput"
                  type="text"
                  name="PartnerEmail"
                  id="partner_mail"
                  value={formlogindata.PartnerEmail}
                  onChange={handleInputChange}
                  placeholder="Електронна пошта"
                />

                <input
                  className="RegPArtnerinput"
                  type="password"
                  name="Password"
                  id="partner_name"
                  value={formlogindata.Password}
                  onChange={handleInputChange}
                  placeholder="password"
                />
                </div>
                <Link className="logbutton" to="">
                <button
                  className="RegPArtnerinput_buttonsubmit"
                  onClick={handlelogin}
                  type="handlelogin"
                >
                  Submit
                </button>
                </Link>
              </div>
            )}
              <button 
              className="Entering"
              onClick={togglereg}
              >toggle            
              </button>
          </div>
        </>
      )}

    </>
  );
};

export default RegPartner;
