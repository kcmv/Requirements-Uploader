import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Grid
      sx={{
        // position: "fixed",
        bottom: 0,
        color: "#ffffff",
        backgroundColor: "#000000",
        p: 2,
        width: "100%",
        "& > p": {
          color: "#ffffff",
        },
      }}
    >
      <Typography variant="body2" color="textSecondary" align="center">
        {`Copyright © Requirements Uploader ${new Date().getFullYear()}`}
      </Typography>
    </Grid>
  );
};

export default Footer;
