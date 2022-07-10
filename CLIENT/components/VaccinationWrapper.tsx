import { Grid } from "@mui/material";
import AddVaccination from "./AddVaccination"
import VaccinationTable from "./VaccinationTable"
import Layout from "./Layout";
import React from "react";
import VaccinationVerbiage from "./VaccinationVerbiage";

const Ui = () => {
  return (
    <Layout title="Vaccination | Requirements Portal">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: "#ffffff",
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          item
          xl={12}
          sx={{ m: 3 }}
        >
          <VaccinationVerbiage />
          <AddVaccination type={0} />
        </Grid>
        <Grid item xl={12}>
          <VaccinationTable />
        </Grid>
      </Grid>
    </Layout>
  );
};

const VaccinationWrapper = React.memo(Ui);

export default VaccinationWrapper;
