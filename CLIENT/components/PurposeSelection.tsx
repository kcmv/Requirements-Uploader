import Grid from "@mui/material/Grid";
import React from "react";

const PurposeSelection = ({ data, setPurpose }: any) => {
  const [select, setSelect] = React.useState(0);

  const changeSelect = (id: number) => {
    setSelect(id);
  };

  return (
    <Grid sx={{ border: "1px solid black", width: "100%" }}>
      {data
        .sort((a: any, b: any) =>
          a.name.toUpperCase().localeCompare(b.name.toUpperCase())
        )
        .map((item: any) => {
          return (
            <Grid
              sx={{
                cursor: "pointer",
                padding: "6px",
                backgroundColor: `${
                  item.id === select ? "rgb(237, 28,36)" : "#ffffff"
                }`,
                color: `${item.id === select ? "#ffffff" : "#000000"}`,
              }}
              onClick={() => {
                changeSelect(item.id);
                setPurpose(item);
              }}
              key={item.id}
            >
              {item.name}
            </Grid>
          );
        })}
    </Grid>
  );
};

export default PurposeSelection;
