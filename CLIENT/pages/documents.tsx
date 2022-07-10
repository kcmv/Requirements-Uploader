import { NextPage } from "next";
import DocumentTable from "@/components/DocumentTable";
import SelectDocuments from "@/components/SelectDocuments";
import Layout from "@/components/Layout";
import Grid from "@mui/material/Grid";
import { useGetAllPurpose } from "services/coe.service";
import { Typography } from "@mui/material";
import { signOut } from "next-auth/react";

export type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
  auth: boolean;
};

const documents = () => {
  const { data, error }: any = useGetAllPurpose();

  if (error?.response.status === 403) {
    signOut();
  }
  return (
    <Layout title="Documents | Requirements Portal">
      <Grid style={{ backgroundColor: "#ffffff", width: "100%" }}>
        <Grid
          item
          xl={12}
          container
          flexDirection="row"
          alignItems="center"
          sx={{ borderBottom: "1px solid #ed1c24", p: 1 }}
        >
          <Typography variant="body1">Select purpose:</Typography>
          <SelectDocuments data={data} />
        </Grid>
        <Grid item>
          <DocumentTable />
        </Grid>
      </Grid>
    </Layout>
  );
};

documents.auth = true;

export default documents;
