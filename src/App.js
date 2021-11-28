import React,{ useState, useEffect } from 'react';
import SingInSignUp from './page/SingInSignUp';
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/contexts";
import { isUserLoggedApi } from "./api/auth"
import Routing from "./routes/Routing";

export default function App() {
  const[user, setUser]=useState(null);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  useEffect(() => {
    setUser(isUserLoggedApi());
    setRefreshCheckLogin(false);
  }, [refreshCheckLogin])

  return (
  <AuthContext.Provider value={user}>
    {user ? 
    (
      <Routing setRefreshCheckLogin={setRefreshCheckLogin}/>
    )
    :
    (
        <SingInSignUp setRefreshCheckLogin={setRefreshCheckLogin} />
    )
    }
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
    </AuthContext.Provider>
    
    );

}


