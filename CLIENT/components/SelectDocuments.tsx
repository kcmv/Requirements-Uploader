import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React from "react";
import Box from "@mui/material/Box";
import PurposeSelection from "./PurposeSelection";
import PurposeForm from "./PurposeForm";
import { Typography } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

interface SelectDocumentsProps {
  data: any;
}

const SelectDocuments: React.FC<SelectDocumentsProps> = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedPurpose, setSelectedPurpose] = React.useState<any>();

  const setPurpose = (value: string) => {
    setSelectedPurpose(value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPurpose(null);
  };

  const body = (
    <Box sx={style}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ position: "static", background: "rgb(237, 28,36)" }}
      >
        <p></p>
        <Grid sx={{ color: "rgb(255, 255, 255)", p: 1 }}>
          <Typography variant="h5">
            {selectedPurpose ? selectedPurpose.name : "SELECT"}
          </Typography>
        </Grid>
        <HighlightOffIcon
          sx={{
            marginRight: "10px",
            cursor: "pointer",
            color: "rgb(255,255,255)",
          }}
          role="button"
          onClick={handleClose}
        />
      </Grid>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: " row!important",
          width: "100%",
          padding: "15px",
        }}
        component="fieldset"
      >
        <PurposeSelection data={data?.purposes} setPurpose={setPurpose} />
        {data ? <PurposeForm data={selectedPurpose} /> : "loading"}
      </FormControl>
    </Box>
  );

  return (
    <Grid>
      <Button variant="contained" onClick={handleOpen}>
        SELECT
      </Button>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ display: "flex", alignItems: "center" }}
      >
        {body}
      </Modal>
    </Grid>
  );
};

export default SelectDocuments;
