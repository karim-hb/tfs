import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../../scripts/api";
import axiosInstance from "../../../scripts/axiosInspector";
import Cities from "./cities";
import Info from "./info";
import States from "./state";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [finalSelect, setFinalSelect] = useState({});
  const [selected, setSelected] = useState({});
  const [data, setData] = useState({});
  const [allProvince, setAllProvince] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [err,setErr] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(
        API.public.province +
          `?guidCountryRecNo=9d4ec04c-0b6a-40e6-b1b2-179b711b859e`
      )
      .then((res) => {
        setAllProvince(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("خطایی پیش آمده است مجدد تلاش کنید");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (finalSelect?.selectedArea) {
      setLoadingCities(true);
      var CS = allProvince?.find(
        (item) => item?.chEnName === finalSelect?.selectedArea
      );
      setData({
        ...data,
        ostan: CS,
        city: {},
      });
      axiosInstance
        .get(API.public.cities + `?guidOstanRecNo=${CS?.guidRecNo}`)
        .then((res) => {
          setCities(res?.data?.data);
          setLoadingCities(false);
        })
        .catch((err) => {
          toast.error("خطایی پیش آمده است مجدد تلاش کنید");
          setLoadingCities(false);
        });
      setCurrentStep(2);
    }
  }, [finalSelect]);
  const handleSumbit = () => {
    if (
      !data?.chNationalCode ||
      !data?.chMobile ||
      !data?.tintSexType ||
      !data?.chFirstName ||
      !data?.chLastName ||
      !data?.chJobTitle ||
      !data?.chAddress
    ) {
      setError({
        chNationalCode: !data?.chNationalCode,
        chMobile: !data?.chMobile,
        tintSexType: !data?.tintSexType,
        chFirstName: !data?.chFirstName,
        chLastName: !data?.chLastName,
        chJobTitle: !data?.chJobTitle,
        chAddress: !data?.chAddress,
      });
      toast.error("لطفا تمامی موارد را کامل نمایید");
    } else {
      setLoadingSubmit(true);
      axiosInstance
        .post(API.auth.register, {
          chNationalCode: data?.chNationalCode,
          chMobile: data?.chMobile,
          tintSexType: data?.tintSexType,
          chFirstName: data?.chFirstName,
          chLastName: data?.chLastName,
          chJobTitle: data?.chJobTitle,
          chAddress: data?.chAddress,
          guidOstanRecNo: data?.ostan?.guidRecNo,
          guidCityRecNo: data?.city?.guidRecNo,
        })
        .then((res) => {
          if (res?.data?.isSuccess) {
            toast.success(res?.data?.message);
            navigate("/");
          } else {
            toast.error(res?.data?.message);
          }
          setLoadingSubmit(false);
        })
        .catch((err) => {
          toast.error("خطایی رخ داده است مجدد تلاش کنید");
          setLoadingSubmit(false);
        });
    }
  };
  return (
    <>
      <div className="flex w-full justify-center items-center text-white h-[4rem] bg-[#337ab7] text-lg ">
        ثبت نام
      </div>
      <Paper elevation={4} className="mt-5 md:mx-10 mx-1 py-6  rounded-md ">
        <Stepper
          activeStep={currentStep - 1}
          alternativeLabel
          sx={{
            direction: "ltr",

            width: "100%",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#fff"
                : theme.palette.background.paper,
          }}
        >
          {[
            `استان : ${data?.ostan?.chName || ""} `,
            `شهر : ${data?.city?.chName || ""}`,
            `ثبت نام`,
          ].map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  ".MuiStepLabel-label": {
                    fontSize: {
                      md: "0.9rem !important",
                      xs: "1rem !important",
                    },
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Container maxWidth="xl">
          {currentStep === 1 ? (
            <States
              selected={selected}
              setSelected={setSelected}
              finalSelect={finalSelect}
              allProvince={allProvince}
              loading={loading}
              setFinalSelect={setFinalSelect}
            />
          ) : currentStep === 2 ? (
            <>
              <Cities
                cities={cities}
                setSelected={(e) => {
                  setData({ ...data, city: e });
                  setCurrentStep(3);
                }}
                selected={data?.cities}
                loading={loadingCities}
              />
              <div className="flex w-full my-7 items-center justify-between">
                <Button onClick={() => navigate("/")} variant="contained">
                  بازگشت به صفحه ورود
                </Button>{" "}
                <Button onClick={() => setCurrentStep(1)} variant="outlined">
                  بازگشت و انتخاب استان
                </Button>
              </div>
            </>
          ) : (
            <>
              <Info
                err={error}
                data={data}
                setData={setData}
                setError={setError}
              />
              <div className="flex w-full my-7 items-center justify-between">
                <Button onClick={() => setCurrentStep(2)} variant="outlined">
                  بازگشت و انتخاب شهر
                </Button>
                <Button
                  onClick={handleSumbit}
                  sx={{ width: "150px !important" }}
                  disabled={loadingSubmit}
                  variant="contained"
                >
                  {loadingSubmit ? (
                    <>
                      {" "}
                      <CircularProgress size={20} />
                    </>
                  ) : (
                    <> ثبت نام</>
                  )}
                </Button>
              </div>
            </>
          )}
        </Container>
      </Paper>
    </>
  );
};

export default Register;
