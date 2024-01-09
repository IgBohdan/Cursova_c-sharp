import { useState, useEffect } from "react";
import "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import AddItemToStore from "./resource/Pages/ui_component/addItemToStore";
const AccountPage = ({ user, setUser }) => {
  const [LoginOrRegister, setLoginOrRegister] = useState(false);

  const handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const user = result.user;
      console.log("Login successful!");
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
      localStorage.removeItem("authenticated");
      localStorage.removeItem('user');
      console.log("Sign out successful");
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRegisterAccount = async () => {
    console.log("Register successful!");
  };

  const toogleRegisterOrLogin = () => {
    setLoginOrRegister(!LoginOrRegister);
  };
  return (
    <>
      {!user ? (
        <>
          <div id="sign-up-in">
            {LoginOrRegister ? (
              <>
                <h1>Sign Up</h1>
                <input id="login" type="text" placeholder="login" />
                <ion-icon class="icon-login" name="person-outline"></ion-icon>
                <input id="email" type="text" placeholder="email" />
                <ion-icon class="icon-email" name="mail-outline"></ion-icon>
                <input id="password" type="text" placeholder="password" />
                <ion-icon
                  class="icon-password"
                  name="lock-closed-outline"
                ></ion-icon>
                <input id="check-box" type="checkbox" /><h5>I agree with the rules</h5>
                <button
                  onClick={handleRegisterAccount}
                  id="reg-in"
                >
                  Реєстрація
                </button>
              </>
            ) : (
              <>
                <h1>Sign In</h1>
                <input id="login" type="text" placeholder="login or email" />
                <ion-icon class="icon-login" name="person-outline"></ion-icon>

                <input id="password" type="text" placeholder="password" />
                <ion-icon
                  class="icon-password"
                  name="lock-closed-outline"
                ></ion-icon>

            <button
              
              onClick={handleGoogleLogin}
              id="reg-in-account0"
            >
              {LoginOrRegister
                ? "Already have account?"
                : "Sign in"}
            </button>

                <button
                  onClick={handleGoogleLogin}
                  className="buttonS"
                  id="reg-in"
                >
                  <ion-icon name="logo-google"> </ion-icon> Login with Goolge
                </button>
              </>
            )}
            <button
              
              onClick={toogleRegisterOrLogin}
              id="reg-in-account"
            >
              {LoginOrRegister
                ? "Already have account?"
                : "Dont have account? "}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="on-all-width">
            <p style={{display:'flex',justifyContent:'center',alignItems:'center',maxHeight:'auto'}}>Ви увійшли як:  {"  "} <img style={{borderRadius:'50%',maxHeight:'55px',maxWidth:'55px',margin:' 0 10px 0 4px'}} src={user.photoURL} alt="Зображення профілю" /> {" "}{user.displayName}</p>
            
            <button onClick={handleSignOut} className="buttonS">
              logout
            </button>
          </div>

        </>
      )}
    </>
  );
};

export default AccountPage;
