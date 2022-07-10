import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

const VaccinationVerbiage = () => {
  return (
    <Alert severity="info">
      <Typography variant="body1">
        Please click on Upload to provide your vaccination details and a soft
        copy of your vaccination card.
      </Typography>
      <Typography variant="body1">
        Note that if your vaccine brand requires 2 doses, you will need to
        upload details for each dose separately.
      </Typography>
      <Typography variant="body1">
        Uploading your vaccine certification will not impact your ability to
        work from home.
      </Typography>
    </Alert>
  );
};

export default VaccinationVerbiage;
