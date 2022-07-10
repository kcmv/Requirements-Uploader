import React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

type Anchor = "top" | "left" | "bottom" | "right";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const router = useRouter();
  const isMatch = router.pathname;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const pages = ["home", "profile", "requirements", "vaccination", "documents"];

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      //   onKeyDown={toggleDrawer(anchor, false)}
    >
      <DrawerHeader>
        <Typography variant="h4">LOGO HERE</Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <List>
        <Divider />
        {pages.map((page) => {
          return (
            <ListItem
              key={page}
              disablePadding
              sx={{
                backgroundColor: `${
                  isMatch === `/${page}` ? "#808080" : "#ffffff"
                }`,
                color: `${isMatch === `/${page}` ? "#ffffff" : "#000000"}`,
              }}
              onClick={() => {
                handleDrawerClose();
                setTimeout(() => {
                  router.push(`/${page}`);
                }, 400);
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText primary={page.toUpperCase()} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <MenuIcon onClick={handleDrawerOpen} />
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
          onOpen={handleDrawerOpen}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default Drawer;
