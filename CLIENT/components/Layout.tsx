import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Footer from "./Footer"
import Nav from "./Nav"
import Header from "./Header"

const LayoutContainer = styled(Grid)(({ theme }) => ({
  backgroundImage: `url("/home_bg.png")`,
  backgroundSize: "cover",
  backgroundColor: "#000000",
  height: "100vh",
  overflow: "auto",
  margin: "0px",
  backgroundPosition: "100%",
  [theme.breakpoints.down("md")]: {
    backgroundPosition: "60%",
  },
}));

const Ui = ({ children, title }: any) => {
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <>
      <Header title={title} />
      <LayoutContainer height={height}>
        <Nav />
        <Grid container sx={{ p: 2 }}>
          {children}
        </Grid>
        <Footer />
      </LayoutContainer>
    </>
  );
};

const Layout = React.memo(Ui);

export default Layout 
