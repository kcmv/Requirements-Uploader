import React from "react";
import { useGetVaccines } from "services";
import { useGlobalProvider } from "context/state";
import Grid from "@mui/material/Grid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import VaccinationGroup from "./VaccinationGroup"
import BoosterGroup from "./BoosterGroup"
import UpdateVaccination from "./UpdateVaccination"

interface AddVaccinationProps {
  type: number;
  original?: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const AddVaccination: React.FC<AddVaccinationProps> = ({ type, original }) => {
  const globalState = useGlobalProvider();
  const [open, setOpen] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("Vaccination");
  const { data, error }: any = useGetVaccines();

  React.useEffect(() => {
    if (error) {
      globalState.setValues({
        open: true,
        text:
          error.response.status === 401
            ? error.response.data
            : error.response.data.message,
        status: error.response.status,
      });
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRadioChange = (event: any) => {
    setRadioValue(event.target.value);
  };

  const body = (
    <Box sx={style}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ background: "rgb(237, 28, 36)", postiion: "static" }}
      >
        <Grid></Grid>
        <Grid sx={{ marginLeft: "35px", p: 1, color: "#ffffff" }}>
          <Typography variant="h5">UPLOAD</Typography>
        </Grid>
        <HighlightOffIcon
          onClick={handleClose}
          sx={{
            marginRight: "10px",
            cursor: "pointer",
            color: "rgb(255, 255,255)",
          }}
        />
      </Grid>
      <FormControl sx={{m: 1}} component="fieldset">
        {!type ? (
          <>
            <FormLabel component="legend">Choose document to upload:</FormLabel>
            <RadioGroup
              aria-label="choose_vaccine"
              row
              name="vaccine_booster"
              value={radioValue}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="Vaccination"
                control={<Radio />}
                label="Vaccination"
              />
              <FormControlLabel
                value="Booster"
                control={<Radio />}
                label="Booster"
              />
            </RadioGroup>
            {radioValue === "Vaccination" ? (
              <VaccinationGroup data={data} />
            ) : (
              <BoosterGroup data={data} />
            )}
          </>
        ) : (
          <UpdateVaccination
            handleClose={handleClose}
            data={data}
            original={original}
          />
        )}
      </FormControl>
    </Box>
  );

  return (
    <div>
      <Button
        sx={{ m: 2 }}
        color="primary"
        variant="contained"
        onClick={handleOpen}
      >
        {`${!type ? "UPLOAD" : "UPDATE"}`}
      </Button>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ display: "flex", alignItems: "center" }}
      >
        {body}
      </Modal>
    </div>
  );
};

export default AddVaccination;
