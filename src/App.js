import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FrogetPassword from "./pages/auth/forgetPassWord";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <>
      <BrowserRouter>
        {!userInfo ? (
          <>
            <Routes>
              <Route element={<Login />} path="/" />
              <Route element={<Register />} path="/register" />
              <Route element={<FrogetPassword />} path="/ForgotPassword" />
            </Routes>
          </>
        ) : (
          <>
            <Routes> </Routes>
          </>
        )}
      </BrowserRouter>
      <CssBaseline />
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        closeOnClick={true}
        rtl={true}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
      />
    </>
  );
}

export default App;
