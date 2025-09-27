import React, { use, useRef, useState } from "react";
import { Button } from "@mui/material";
import validateSignData from "../utils/validation";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const Sign = () => {
  const firstName = useRef("");
  const lastName = useRef("");
  const email = useRef("");
  const password = useRef("");
  const confirmPassword = useRef("");
  const [error, setError] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...(isSignIn && { firstName: firstName.current.value }),
      ...(isSignIn && { lastName: lastName.current.value }),
      email: email.current.value,
      password: password.current.value,
      ...(isSignIn && { confirmPassword: confirmPassword.current.value }),
    };

    try {
      validateSignData(data, isSignIn);
      if (isSignIn) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        await updateProfile(userCredential.user, {
          displayName: `${data.firstName} ${data.lastName}`,
        });
        console.log(userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        const user = userCredential.user;
        console.log(user);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  return (
    <div>
      <div className="w-10/12 md:w-6/12 lg:w-/12 bg-blue-500 mx-auto rounded-2xl text-white m-4 p-4 mt-[20%] md:mt-[10%]">
        <h1 className="font-bold text-center text-2xl p-3">Sign Up</h1>
        <form
          action=""
          className="flex flex-col px-3 md:px-5"
          onSubmit={handleSubmit}
        >
          {isSignIn && (
            <input
              className="text-black bg-white rounded-sm p-1.5 my-2"
              type="text"
              placeholder="First name"
              name=""
              id="First"
              ref={firstName}
            />
          )}
          {isSignIn && (
            <input
              className="text-black bg-white rounded-sm p-1.5 my-2"
              type="text"
              name=""
              id="Last"
              placeholder="Last name"
              ref={lastName}
            />
          )}
          <input
            className="text-black bg-white rounded-sm p-1.5 my-2"
            type="email"
            placeholder="Email"
            name=""
            id="Email"
            ref={email}
          />
          <input
            className="text-black bg-white rounded-sm p-1.5 my-2"
            type="password"
            placeholder="Password"
            name=""
            id="Password"
            ref={password}
          />
          {isSignIn && (
            <input
              className="text-black bg-white rounded-sm p-1.5 my-2"
              type="passoword"
              placeholder="Confirm Password"
              name=""
              id="Confirm"
              ref={confirmPassword}
            />
          )}
          <p className="text-yellow-200 text-center font-bold mt-2 ">{error}</p>
          <input
            type="submit"
            className="bg-white rounded-md px-3 py-1 text-blue-400 font-bold w-40 mx-auto mt-5 mb-3 cursor-pointer"
            name=""
            id=""
          />
        </form>
        <p
          onClick={() => setIsSignIn(!isSignIn)}
          className="pt-3 cursor-pointer"
        >
          {isSignIn ? "Aready a user? SignIn" : "New to MOOKAmbika? SignUp now"}
        </p>
      </div>
      <h1 className="text-center">OR</h1>
      <div className="flex justify-center m-4">
        <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 cursor-pointer">
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span className="text-black">
            {isSignIn ? "SignUp" : "SignIn"} with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sign;
