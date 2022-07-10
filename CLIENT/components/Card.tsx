import { Grid, Typography } from "@mui/material";
import React from "react";

interface CardProps {
  title: string;
  body?: string;
}

const Ui: React.FC<CardProps> = ({ title, body }) => {
  return (
    <>
      <Grid sx={{ backgroundColor: "#ed1c24", color: "#ffffff", p: 2 }}>
        {title}
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        sx={{ backgroundColor: "#ffffff", minHeight: "250px" }}
      >
        <Grid sx={{p: 2}}>{body}</Grid>
        <Grid sx={{textAlign: "end", p: 1}}>
          <Typography>GO</Typography>
        </Grid>
      </Grid>
    </>
  );
};
const Card = React.memo(Ui);

export default Card;
