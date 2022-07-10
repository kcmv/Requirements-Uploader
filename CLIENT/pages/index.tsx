import * as React from "react";
import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import Header from "@/components/Header"
import LoginForm from "@/components/LoginForm"
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

const LoginContainer = styled(Grid)(({ theme, height }) => ({
  backgroundImage: `url("/home_bg.png")`,
  backgroundSize: "cover",
  backgroundColor: "#000000",
  height: `${height}px`,
  [theme.breakpoints.down("md")]: {
    backgroundPosition: "center center",
  },
}));

const AssetWRapper = styled(Grid)(() => ({
  backgroundColor: "#a6a6a6",
}));

const AssetImage = styled(Grid)(() => ({
  backgroundImage: `url("/login_asset.svg")`,
  height: "100%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "50% 50%",
}));

const LoginBox = styled(Grid)(({ theme }) => ({
  backgroundColor: "#ffffff",
  margin: theme.spacing(5),
  height: "90%",
  boxShadow: "0px 0px 3px 7px rgba(69, 69, 69, 0.75)",
}));

const TitleStyled = styled(Typography)(({ theme }) => ({
  color: "#ed1c24",
  padding: theme.spacing(2),
}));

const Home: NextPage = () => {
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <>
      <Header title="Login | Requirements Uploader" />
      <LoginContainer
        height={height}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <LoginBox container direction="row">
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            item
            sm={12}
            md={12}
            lg={5}
            xl={5}
          >
            <TitleStyled variant="h4">Requirements Uploader</TitleStyled>
            <LoginForm />
          </Grid>
          <AssetWRapper item lg={7} xl={7}>
            <AssetImage />
          </AssetWRapper>
        </LoginBox>
      </LoginContainer>
    </>
  );
};

export default Home;
