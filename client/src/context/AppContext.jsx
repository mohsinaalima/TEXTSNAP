import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'))

  const [credit, setCredit] = useState(false)

const backendUrl = import.meta.env.VITE_BACKEND_URL

const loadCreditData = async () => {
  try {
const {data}=await axios.get()
  }catch (error) {
    console.log(error)
    toast.erroe(error.massage)
  }
}

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
