import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { signOut } from "next-auth/react";
import { styled } from "@mui/material/styles";
import { Link as MUILink, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Drawer from "./Drawer"
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomBtn = styled(Button)(() => ({
  color: "#ffffff",
  pointer: "cursor",
  textDecoration: "none",
}));

const LinkWrapper = styled(Grid)(() => ({}));

const LinkStyle = styled(MUILink)(() => ({
  color: "#ffffff",
  pointer: "cursor",
  textDecoration: "none",
}));

const Nav = () => {
  const router = useRouter();
  const isUrlExists = ["/", "/home"].indexOf(router.pathname) > -1;
  const matches = useMediaQuery("(max-width:900px)");

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: "#000000",
        color: "#ffffff",
        textAlign: "end",
        padding: "15px 15px 0px",
      }}
    >
      {matches ? (
        <Drawer />
      ) : (
        <>
          {!isUrlExists ? (
            <LinkWrapper>
              <NextLink href="/home" passHref>
                <LinkStyle>Back to Homepage</LinkStyle>
              </NextLink>
            </LinkWrapper>
          ) : null}
          <Grid sx={{ p: 1 }}>
            <Typography variant="h4">LOGO HERE</Typography>
          </Grid>
        </>
      )}

      <CustomBtn
        onClick={() => {
          signOut();
        }}
      >
        LOGOUT
      </CustomBtn>
    </Grid>
  );
};

export default Nav;
