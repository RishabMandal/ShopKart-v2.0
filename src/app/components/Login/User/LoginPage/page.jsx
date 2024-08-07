"use client";

import { GlobalContext } from "@/context";
import { TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import { provider, auth } from "../../../../../../firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";

const page = () => {
  const { isAuthUser, setIsAuthUser } = useContext(GlobalContext);
  const { email, setEmail } = useContext(GlobalContext);
  // const [Name, setName] = useState();
  // const [Password, setPassword] = useState();

  const name = useRef();
  const password = useRef();

  // axios.defaults.withCredentials = true;
  function handleSubmit() {
    // setName(name.current.value);
    // setPassword(password.current.value);
    // console.log(Name, Password);
    if (name.current.value && password.current.value) {
      axios
        .post(
          "/api/LoginPage",
          {
            email: name.current.value?.trim(),
            password: password.current.value,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          // console.log(response.data);
          if (response.data && response.data.length == 1) {
            setIsAuthUser(true);
            setEmail(name.current.value?.trim());
            handleSession(name.current.value);
          } else {
            alert("No login credentials found");
          }
        })
        .catch((error) => console.error(error));
      // handleSession(name.current.value);
    } else alert("Please enter valid email address and password");
  }

  async function handleSession(userEmail) {
    try {
      if (userEmail) {
        const response = await axios
          .post("https://my-ecommerce-api-2.vercel.app/signup", {
            // .post("http://localhost:5001/signup", {
            name: "Rishab Mandal",
            email: userEmail?.trim(),
            admin: true,
          })
          .catch((error) => console.error(error));
        // const { username, email, isAdmin, loggedIn } = response.data;
        // console.log(username, email, isAdmin, loggedIn);
        window.location.reload();
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration error:", error);
    }
  }

  // Firebase Google Login
  const googleLogin = () => {
    signInWithPopup(auth, provider).then((data) => {
      // console.log(
      //   data.user.email,
      //   data.user.displayName,
      //   data.user.photoURL,
      //   data.user.phoneNumber
      // );
      // Add condition here to check whether user is present in db
      setIsAuthUser(true);
      setEmail(data.user.email?.trim());
      handleSession(data.user.email?.trim());
    });
  };

  return (
    <div>
      <div>
        <section className="bg-gray-100 body-font">
          <div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
            {/* <div>{process.env.MONGO_URL}</div> */}
            <div className="bg-white md:w-[30rem] w-full p-5 rounded-2xl border shadow-xl">
              <div className="text-3xl text-center font-bold py-5">Log In</div>
              <div className="flex flex-col gap-3 mt-5">
                {/* <input
                  type="email"
                  ref={name}
                  className="border-4 p-3 rounded-lg text-lg"
                  placeholder="Enter Email Address"
                /> */}
                <TextField
                  id="outlined-basic"
                  inputRef={name}
                  type="text"
                  label="Email Address"
                  variant="outlined"
                  // sx={{ border: "2px solid", color: "red" }}
                  // sx={{ fontSize: "2rem", fontWeight: "semi-bold" }}
                />
                <TextField
                  id="outlined-basic"
                  inputRef={password}
                  type="password"
                  label="Password"
                  variant="outlined"
                  // sx={{ border: "2px solid", color: "red" }}
                  // sx={{ fontSize: "2rem", fontWeight: "semi-bold" }}
                />
                {/* <input
                  ref={password}
                  type="password"
                  className="border-4 p-3 rounded-lg text-lg"
                  placeholder="Enter Password"
                /> */}
              </div>
              <div
                onClick={() => {
                  handleSubmit();
                }}
                className="cursor-pointer text-xl font-bold text-center bg-red-600 hover:bg-red-700 duration-200 text-white rounded-lg p-2 mt-8"
              >
                Log In
              </div>
              <div className="my-4 text-sm">
                Not registered?
                <Link
                  href="/components/Login/User/SignUpPage"
                  className="text-red-600 font-semibold hover:text-red-700 hover:underline cursor-pointer ml-2"
                >
                  Sign Up
                </Link>
              </div>
              <div className="border-t text-sm py-2 border-b text-center">
                Or login via social links
              </div>
              <div
                onClick={googleLogin}
                className="flex flex-row text-base cursor-pointer w-fit mx-auto bg-red-600 hover:bg-red-700 duration-200 p-2 rounded-lg text-white mt-5"
              >
                <div className="font-bold pr-2">G</div>
                <div>Google</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;
