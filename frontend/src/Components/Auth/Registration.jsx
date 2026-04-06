import "./auth.css";
import logo from "../../Assets/chatnova.png"
import avatar from "./profileimg.png";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link, Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { authRegister, uploadPic } from "../Redux/Auth/action";
export const RegisterComp = () => {
  const { user, loading, error } = useSelector((store) => store.user);
  const [regData, setRegData] = useState({
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    isAdmin: false,
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData({ ...regData, [name]: value });
  };
  const handleInputFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(uploadPic(reader.result));
      // setPic(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = () => {
    const SERVER_POINT = import.meta.env.VITE_SERVER_POINT;
    const url = `${SERVER_POINT}/auth`;
    if (user?.pic) regData["pic"] = user.pic;
    dispatch(authRegister(url, regData));
  };
  if (user?. _id) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="auth-cont items-center justify-center flex flex-col">
 {/* LOGO */}
        <img src={logo} alt="logo" className=" max-h-[150px] max-w-[220px]" />
       <h2 className="text-xl sm:text-2xl font-semibold text-center mb-5 sm:mb-6">
      Create Account
    </h2>
      <div className=" flex flex-col justify-center items-center">
        <div className=" flex- justify-center items-center">
          <div className=" w-[100px] h-[100px]">
            <input onChange={handleInputFile} type="file" name="" id="file" />
            <label htmlFor="file" id="uploadBtn">
              <img className=" w-[100px] h-[100px] rounded-full" src={user?.pic ? user.pic : avatar} />
            </label>
          </div>
          <p className="profile-text">Choose Profile</p>
        </div>

        {/* FORM */}
<div className="flex items-center justify-center  px-1 sm:px-6">

  <div className="w-full max-w-md sm:max-w-lg md:max-w-md p-5 sm:p-1 md:p-8 ">
    {/* Name */}
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Name</label>
      <input
        onChange={handleChange}
        name="name"
        type="text"
        placeholder="Enter your name"
        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Email */}
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Email</label>
      <input
        onChange={handleChange}
        name="email"
        type="email"
        placeholder="Enter your email"
        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Password */}
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Password</label>
      <input
        onChange={handleChange}
        type="password"
        name="password"
        placeholder="Enter password"
        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Confirm Password */}
    <div className="mb-5 sm:mb-6">
      <label className="block text-sm font-medium mb-1">
        Confirm Password
      </label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Button */}
    {loading ? (
      <button
        disabled
        className="w-full bg-blue-500 text-white py-2.5 rounded-lg flex justify-center items-center"
      >
        <CircularProgress size={20} style={{ color: "white" }} />
      </button>
    ) : (
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition"
      >
        Continue
      </button>
    )}

    {/* Login Link */}
    <p className="text-center text-xs sm:text-sm mt-4">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-600 hover:underline">
        Login
      </Link>
    </p>

    {/* Terms */}
    <p className="text-[10px] sm:text-xs text-gray-500 text-center mt-3 sm:mt-4 leading-relaxed">
      By registering you agree to Messenger's{" "}
      <span className="text-blue-600 cursor-pointer">
        Terms of Service
      </span>{" "}
      and{" "}
      <span className="text-blue-600 cursor-pointer">
        Privacy Policy
      </span>.
    </p>

  </div>
</div>
      </div>
    </div>
  );
};
const ColorButton = styled(Button)(() => ({
  color: "white",
  fontSize: "20px",
  textTransform: "none",
  backgroundColor: "#5865f2",
  "&:hover": {
    backgroundColor: "#3a45c3",
  },
}));
