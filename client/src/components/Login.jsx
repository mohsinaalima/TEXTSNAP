import React, { useState, useContext, useEffect } from "react";

import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form className='relative bg-white p-10 rounded-xl text-neutral-700'>
        <h1 className='text-center text-2xl font-medium'>{state}</h1>

        <p className='text-sm text-center'>
          Welcome back! Please sign in to continue
        </p>

        {/* Full Name only in Sign up */}
        {state !== "Login" && (
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
            <img src={assets.user_icon} alt='' />
            <input
              type='text'
              className='outline-none text-sm'
              placeholder='Full Name'
              required
            />
          </div>
        )}

        {/* Email */}
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.email_icon} alt='' />
          <input
            type='email'
            className='outline-none text-sm'
            placeholder='Email id'
            required
          />
        </div>

        {/* Password */}
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.lock_icon} alt='' />
          <input
            type='password'
            className='outline-none text-sm'
            placeholder='Password'
            required
          />
        </div>

        {/* Forget password */}
        {state === "Login" && (
          <p className='text-sm text-blue-600 my-4 cursor-pointer'>
            Forget Password
          </p>
        )}

        {/* Button */}
        <button className='bg-blue-600 w-full text-white py-2 rounded-full'>
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {/* Toggle Login / Signup */}
        {state === "Login" ? (
          <p className='mt-5 text-center'>
            Don't have an account?{" "}
            <span
              className='text-blue-600 cursor-pointer'
              onClick={() => setState("Sign up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className='mt-5 text-center'>
            Already have an account?{" "}
            <span
              className='text-blue-600 cursor-pointer'
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt=''
          className='absolute top-5 right-5 cursor-pointer'
        />
      </form>
    </div>
  );
};

export default Login;
