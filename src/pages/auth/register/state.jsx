import { Button, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import InteractiveIranMap from "./map";

const States = ({
  selected,
  setSelected,
  finalSelect,
  setFinalSelect,
  loading,
  allProvince,
}) => {
  const navigate = useNavigate();
  return (
    <div className="md:grid md:grid-cols-5 mt-6 flex flex-col-reverse gap-5  ">
      <div className="col-span-2">
        <div className="bg-black flex justify-center items-center py-2">
          <span className="text-white">استانها</span>
        </div>
        <ul className="grid md:grid-cols-4 grid-cols-2 gap-2 mt-3">
          {loading ? (
            <>
              {Array.from(Array(30).keys()).map((item, i) => (
                <Fragment key={i + "Skeleton"}>
                  <Skeleton animation="wave" variant="rounded" height={32} />
                </Fragment>
              ))}
            </>
          ) : (
            <>
              {allProvince?.map((item, index) => (
                <Box
                  component={"li"}
                  sx={{
                    background:
                      selected?.selectedArea === item.chEnName
                        ? "#337ab7"
                        : "#242939",
                  }}
                  onMouseOver={() =>
                    setSelected({ selectedArea: item.chEnName })
                  }
                  onClick={() =>
                    setFinalSelect({ selectedArea: item.chEnName })
                  }
                  className=" text-white text-xs py-2 px-1 cursor-pointer"
                  key={item?.chName}
                >
                  {item?.chName}
                </Box>
              ))}
            </>
          )}
        </ul>
      </div>
      <div className="col-span-3 flex justify-end">
        <InteractiveIranMap
          setFinalSelect={setFinalSelect}
          finalSelect={finalSelect}
          setSelected={setSelected}
          selected={selected}
        />
      </div>
      <div className="col-span-5 w-full flex justify-between mt-10 mb-20">
        <Button onClick={() => navigate("/")} variant="contained">
          بازگشت به صفحه ورود
        </Button>
        <Button
          disabled={!selected?.selectedArea}
          variant="contained"
          color="primary"
          onClick={() => setFinalSelect(selected)}
        >
          مرحله بعد
        </Button>
      </div>
    </div>
  );
};

export default States;
