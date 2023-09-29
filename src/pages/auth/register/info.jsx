import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";

const Info = ({ data, setData, err, setError }) => {
  return (
    <div className="flex flex-col gap-4 mt-10">
      <fieldset className="border-2 border-[#337ab7] px-4 py-4 md:py-9 rounded-md">
        <legend className="px-3 md:px-9 text-center font-bold text-lg">
          مشخصات نماینده
        </legend>
        <div className="sm:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 flex flex-col gap-5">
          <TextField
            fullWidth
            variant="outlined"
            label="کد ملی"
            value={data?.chNationalCode || ""}
            onChange={(e) => {
              setData({ ...data, chNationalCode: e.target.value });
              if (err?.chNationalCode !== undefined) {
                if (e.target.value) {
                  setError({ ...err, chNationalCode: false });
                } else {
                  setError({ ...err, chNationalCode: true });
                }
              }
            }}
            error={err?.chNationalCode}
            helperText={err?.chNationalCode ? "این فیلد ضروری است" : ""}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="تلفن همراه"
            value={data?.chMobile || ""}
            onChange={(e) => {
              setData({ ...data, chMobile: e.target.value });
              if (err?.chMobile !== undefined) {
                if (e.target.value) {
                  setError({ ...err, chMobile: false });
                } else {
                  setError({ ...err, chMobile: true });
                }
              }
            }}
            error={err?.chMobile}
            helperText={err?.chMobile ? "این فیلد ضروری است" : ""}
          />
          <fieldset
            style={{ borderColor: err?.tintSexType ? "red" : "#0000003b" }}
            className="border h-[62px] -mt-[6px] px-3 rounded-[4px] w-full "
          >
            <legend className="px-4 text-right text-xs text-[#524f4f]">
              {" "}
              جنسیت
            </legend>
            <FormControl>
              <RadioGroup aria-labelledby="tintSexType" name="tintSexType" row>
                <FormControlLabel
                  onChange={(e) => {
                    setData({ ...data, tintSexType: 1 });
                    setError({ ...err, tintSexType: false });
                  }}
                  control={<Radio checked={data?.tintSexType === 1} />}
                  label=" مرد"
                />
                <FormControlLabel
                  onChange={(e) => {
                    setData({ ...data, tintSexType: 2 });
                    setError({ ...err, tintSexType: false });
                  }}
                  control={<Radio checked={data?.tintSexType === 2} />}
                  label=" زن"
                />
              </RadioGroup>
            </FormControl>
          </fieldset>
          <TextField
            fullWidth
            variant="outlined"
            label="نام"
            value={data?.chFirstName || ""}
            onChange={(e) => {
              setData({ ...data, chFirstName: e.target.value });
              if (err?.chFirstName !== undefined) {
                if (e.target.value) {
                  setError({ ...err, chFirstName: false });
                } else {
                  setError({ ...err, chFirstName: true });
                }
              }
            }}
            error={err?.chFirstName}
            helperText={err?.chFirstName ? "این فیلد ضروری است" : ""}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="نام خانوادگی"
            value={data?.chLastName || ""}
            onChange={(e) => {
              setData({ ...data, chLastName: e.target.value });
              if (err?.chLastName !== undefined) {
                if (e.target.value) {
                  setError({ ...err, chLastName: false });
                } else {
                  setError({ ...err, chLastName: true });
                }
              }
            }}
            error={err?.chLastName}
            helperText={err?.chLastName ? "این فیلد ضروری است" : ""}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="سمت شغلی"
            value={data?.chJobTitle || ""}
            onChange={(e) => {
              setData({ ...data, chJobTitle: e.target.value });
              if (err?.chJobTitle !== undefined) {
                if (e.target.value) {
                  setError({ ...err, chJobTitle: false });
                } else {
                  setError({ ...err, chJobTitle: true });
                }
              }
            }}
            error={err?.chJobTitle}
            helperText={err?.chJobTitle ? "این فیلد ضروری است" : ""}
          />
          <div className="col-span-4">
            <TextField
              fullWidth
              variant="outlined"
              label="آدرس مرکزی"
              value={data?.chAddress || ""}
              onChange={(e) => {
                setData({ ...data, chAddress: e.target.value });
                if (err?.chAddress !== undefined) {
                  if (e.target.value) {
                    setError({ ...err, chAddress: false });
                  } else {
                    setError({ ...err, chAddress: true });
                  }
                }
              }}
              error={err?.chAddress}
              helperText={err?.chAddress ? "این فیلد ضروری است" : ""}
            />{" "}
          </div>
        </div>
      </fieldset>
      {/*    <fieldset className="border-2 border-[#337ab7] px-4 py-4 md:py-9 rounded-md">
        <legend className="px-3 md:px-9 text-center font-bold text-lg">
          مشخصات مودی
        </legend>
        <div className="sm:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 flex flex-col gap-5">
          <TextField
            fullWidth
            variant="outlined"
            label="عنوان شرکت"
            value={data?.companyName}
            onChange={(e) => setData({ ...data, companyName: e.target.value })}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="شناسه ملی"
            value={data?.na || ""}
            onChange={(e) => setData({ ...data, na: e.target.value })}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="شماره اقتصادی"
            value={data?.req || ""}
            onChange={(e) => setData({ ...data, req: e.target.value })}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="تلفن مرکزی"
            value={data?.ma || ""}
            onChange={(e) => setData({ ...data, ma: e.target.value })}
          />
          <div className="lg:col-span-4 md:col-span-3 sm:col-span-2">
        
          </div>{" "}
          <div className="lg:col-span-4 md:col-span-3 sm:col-span-2">
            <TextField
              fullWidth
              variant="outlined"
              label="توضیحات"
              multiline
              rows={2}
              value={data?.desc || ""}
              onChange={(e) => setData({ ...data, desc: e.target.value })}
            />
          </div>
        </div>
      </fieldset> */}
    </div>
  );
};

export default Info;
