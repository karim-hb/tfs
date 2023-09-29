import InputIcon from "@mui/icons-material/Input";
import { Box, Button, CircularProgress, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../../scripts/api";
import axiosInstance from "../../../scripts/axiosInspector";

function FrogetPassword() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const clickHandler = () => {
    setLoading(true);
    axiosInstance
      .post(API.auth.forgetPassWord, {
        ...data,
      })
      .then((res) => {
        if (res?.data?.isSuccess) {
          toast.success(res?.data?.message);
        } else {
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
    <div>
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
        className=" relative"
      >
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

            boxShadow:
              "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
            padding: "12px",
            minWidth: { md: "380px" },
            width: { md: "auto", xs: "95%" },
            mx: "10px",
          }}
        >
          <Box
            sx={{
              px: "15px",
              fontSize: "1.25rem",
              mt: "19.5px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            بازیابی رمز عبور
          </Box>
          <Box
            component={"form"}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: "12px",
              height: "100%",
              gap: 3,
              borderRadius: { md: "4px 0px 0px 4px", xs: "0px 0px 4px 4px" },
            }}
          >
            <TextField
              id="outlined-basic"
              label="نام کاربری/کد ملی"
              variant="outlined"
              fullWidth
              type="text"
              name="user_name"
              onChange={(e) => setData({ ...data, chUserName: e.target.value })}
              value={data?.chUserName || ""}
            />
            <TextField
              id="outlined-basic"
              label="تلفن همراه"
              variant="outlined"
              fullWidth
              type="tel"
              name="user_name"
              onChange={(e) => setData({ ...data, chMobile: e.target.value })}
              value={data?.chMobile || ""}
            />
          </Box>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: "12px",
            }}
          >
            <Button
              variant="contained"
              disabled={!data?.chUserName || !data?.chMobile || loading}
              sx={{ fontSize: "1rem", backgroundColor: "#0091ea" , width:"150px !important" }}
              onClick={clickHandler}
            >
              {loading ? (
                <>
                  {" "}
                  <CircularProgress size={27} />
                </>
              ) : (
                <> ارسال رمز عبور</>
              )}
            </Button>
            <Link to="/">
              <Button
                variant="contained"
                sx={{ fontSize: "1rem", backgroundColor: "#0091ea" , width:"150px !important" }}
              >
                <InputIcon sx={{ width: "18px", height: "18px", mr: "5px" }} />
                بازگشت
              </Button>
            </Link>
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
    </div>
  );
}

export default FrogetPassword;
