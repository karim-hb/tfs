import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo, "userInfouserInfo");
  return (
    <>
      <BrowserRouter>
        {!userInfo ? (
          <>
            <Routes>
              <Route element={<Login />} path="/" />
              <Route element={<Login />} path="/register" />
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
