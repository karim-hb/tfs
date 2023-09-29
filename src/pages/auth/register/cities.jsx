import { Box, Skeleton } from "@mui/material";
import React, { Fragment } from "react";

const Cities = ({ cities, loading, selected, setSelected }) => {
  return (
    <div>
      {" "}
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
            {cities?.map((item, index) => (
              <Box
                component={"li"}
                sx={{
                  background:
                    selected?.chName === item.chName ? "#337ab7" : "#242939",
                }}
                onClick={() => setSelected(item)}
                className=" text-white text-xs py-2 px-1 cursor-pointer hover:bg-[#337ab7]"
                key={item?.chName}
              >
                {item?.chName}
              </Box>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default Cities;
