import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {

  // ✅ Hooks MUST be here
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  // ✅ Normal function (NO hooks inside)
  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div className="text-center my-20">
      <h1 className="text-4xl">Turn text to image in seconds</h1>

      <button
        onClick={onClickHandler}
        className="mt-6 px-6 py-2 bg-black text-white rounded-full"
      >
        Generate Images
      </button>
    </motion.div>
  );
};

export default Header;