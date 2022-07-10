import React from "react";
import { userService } from "services";
import { useQueryClient } from "react-query";
import { useGlobalProvider } from "../context/state";
import { signOut } from "next-auth/react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
};

const Ui: React.FC = () => {
  const queryClient = useQueryClient();
  const globalState = useGlobalProvider();

  return (
    <div>
      <Modal
        open={globalState.status.open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Box sx={style}>
          <Typography variant="h5">{globalState.status.text}</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{m: 2}}
            onClick={() => {
              if (globalState.status.status === 401) {
                signOut();
                userService.logout();
              } else {
                queryClient.invalidateQueries(globalState.status.type);
              }
              globalState.setValues({ open: false });
            }}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const AlertModal = React.memo(Ui);

export default AlertModal;
