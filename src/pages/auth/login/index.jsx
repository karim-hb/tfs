import CachedIcon from "@mui/icons-material/Cached";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import InputIcon from "@mui/icons-material/Input";
import LaptopIcon from "@mui/icons-material/Laptop";
import SecurityIcon from "@mui/icons-material/Security";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../../scripts/api";
import axiosInstance from "../../../scripts/axiosInspector";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});
  const [captcha, setCaptch] = useState({});
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [loading, setLoading] = useState(false);
  const [reRender, setRerender] = useState(1);
  const [err,setErr] = useState("")
  useEffect(() => {
    axiosInstance.get(API.auth.captch).then((res) => {
      setCaptch(res.data.data?.chCaptchaBase64);
      setData({
        ...data,
        chEncryptedCaptchaKey: res.data.data?.chEncryptedCaptchaKey,
      });
    });
  }, [reRender]);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axiosInstance
      .post(API.auth.login, {
        ...data,
      })
      .then((res) => {
        if (res?.data?.data?.btIsValid) {
        
          toast.success(res?.data?.message);
        
        } else {
          setErr(res?.data?.message)
          toast.error(res?.data?.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error("خطایی رخ داده است مجدد تلاش کنید");
        setLoading(false);
      });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          background: `url(/assets/images/login/Background.3e8d46d9.png) no-repeat`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          overflowX: "hidden",
        }}
        className="loginForm relative"
      >
        <Paper
          elevation={0}
          sx={{
            display: { md: "grid", xs: "flex" },
            gridTemplateColumns: { md: "1fr 1fr 1fr" },
            boxShadow:
              "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
            borderRadius: "4px",
            width: { md: "700px", xs: "95%" },
            flexDirection: "column-reverse",
          }}
        >
          {/* Form */}

          <Box
            component={"form"}
            onSubmit={handleLogin}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#333333",
              padding: "12px",
              height: "100%",
              gap: 3,
              borderRadius: { md: "4px 0px 0px 4px", xs: "0px 0px 4px 4px" },
            }}
            className="col-span-2"
          >
            <Typography
              component={"h1"}
              sx={{
                color: "#fff",
                fontSize: "1.3125rem !important",
                fontWeight: 500,
              }}
            >
              {"<"} خوش آمدید {">"}
            </Typography>
            <TextField
              id="outlined-basic"
              label="نام کاربری/کد ملی"
              variant="outlined"
              fullWidth
              type="text"
              value={data?.chUserName}
              onChange={(e) => setData({ ...data, chUserName: e.target.value })}
              name="chUserName"
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                رمز عبور
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                value={data?.chPassword}
                onChange={(e) =>
                  setData({ ...data, chPassword: e.target.value })
                }
                name="chPassword"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="right">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="right"
                    >
                      {showPassword ? (
                        <VisibilityOff className="pI" />
                      ) : (
                        <Visibility className="pI" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <TextField
              id="outlined-basic"
              label="تصویر امنیتی"
              variant="outlined"
              fullWidth
              value={data?.chCaptchaKey}
              onChange={(e) =>
                setData({ ...data, chCaptchaKey: e.target.value })
              }
              name="chCaptchaKey"
            />
            <Box
              sx={{
                display: "flex",
                height: "60px",
                border: "1px solid #b9b9b9",
                borderRadius: "4px",
                width: "100%",
              }}
            >
              {captcha ? (
                <img src={captcha} alt="" className="w-full" />
              ) : (
                <Skeleton
                  variant="rounded"
                  width={200}
                  height={53}
                  animation="wave"
                />
              )}

              <IconButton
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "15px 20px",
                  cursor: "pointer",
                }}
                onClick={() => setRerender((r) => r + 1)}
              >
                <CachedIcon sx={{ color: "#03a9f4" }} />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                my: "0.25rem",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Link to="/ForgotPassword">
                <Box
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    ":hover": {
                      background: "#2196f31c",
                    },
                    alignItems: "center",
                    color: "#2196f3",
                    gap: "2px",
                  }}
                >
                  {" "}
                  <SecurityIcon
                    sx={{
                      padding: "3px !important",
                      fontSize: { md: "1.2rem" },
                    }}
                  />
                  <Typography sx={{ fontSize: { md: "0.8rem" } }}>
                    {" "}
                    ارسال/فراموشی رمز عبور{" "}
                  </Typography>
                </Box>
              </Link>

              <Link to="/register">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "#2196f3",
                    gap: "2px",
                    borderRadius: "4px",
                    ":hover": {
                      background: "#2196f31c",
                    },
                  }}
                >
                  <CardMembershipIcon
                    sx={{
                      padding: "3px !important",
                      fontSize: { md: "1.2rem" },
                    }}
                  />
                  <Typography sx={{ fontSize: { md: "0.8rem" } }}>
                    ثبت نام مودی
                  </Typography>
                </Box>
              </Link>
            </Box>
            <Box sx={{ px: "15px", my: "3.25px", width: "100%" }}>
             
              <Button
                variant="contained"
                sx={{
                  height: "3.1rem",
                  fontSize: "11px",
                  width: "100%",
                  background: "#2196f3",
                }}
                type="submit"
                disabled={
                  !data?.chUserName ||
                  !data?.chPassword ||
                  loading ||
                  !data?.chCaptchaKey
                }
              >
                {loading ? (
                  <>
                    <CircularProgress />
                  </>
                ) : (
                  <>
                    {" "}
                    <LaptopIcon />
                    <Typography sx={{ mx: "0.7rem" }}>ورود</Typography>
                    <InputIcon />
                  </>
                )}
              </Button>
              {err && <div className="text-red-400 mt-2">{err}</div>}
            </Box>
            {/*  <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: "15px",
                  my: "3.25px",
                  width: "100%",
                }}
              >
                <Typography sx={{ fontSize: "11px", px: "7px" }}>
                  Remember
                </Typography>
                <input type="checkbox" name="" id="" className="chekbox" />
              </Box> */}
          </Box>
          {/* liste sefid */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "300px",
              gap: { md: 3, xs: 1 },
              pt: 1,
            }}
          >
            <img
              src="/assets/images/login/mana.png"
              alt=""
              className="md:w-[130px] w-[50px]"
            />
            <Typography sx={{ fontSize: "1rem ", fontWeight: "bold" }}>
              سامانه مودیان مــانــا
            </Typography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                {" "}
                پشتیبانی :
              </Typography>
              <img
                src="/assets/images/login/anydesk.png"
                alt=""
                width={30}
                className="aks-any"
              />
              <img
                src="/assets/images/login/telegram.png"
                alt=""
                width={30}
                className="aks2"
              />
            </Box>
            <Typography
              component={"a"}
              href="tel:09108101067"
              sx={{ fontSize: "1rem", color: "#20a8d8", fontWeight: "bold" }}
            >
              09108101067
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <img
                src="/assets/images/login/logo.png"
                alt=""
                className="w-[2rem]"
              />
            </Box>
          </Box>
        </Paper>
        <Link className="absolute top-2 left-2" to="/">
          <img
            src="/assets/images/login/mana.png"
            alt=""
            className="md:w-[130px] w-[50px]"
          />
        </Link>
      </Box>
    </>
  );
}

export default Login;
