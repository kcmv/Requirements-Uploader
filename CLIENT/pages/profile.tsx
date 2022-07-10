import React from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import ImageRender from "@/components/ImageRender";
import Layout from "@/components/Layout";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";

const StyledInput = styled(Input)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1),
  backgroundColor: "#ffffff",
  borderRadius: "7px",
}));

const FormControlStyle = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: "10px 0px",
}));

const GroupWrapper = styled(Grid)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "70%",
  },
}));

export type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
  auth: boolean;
};

interface UserProfile {
  photo: string;
  full_name: string;
  email: string;
  mobile: string;
  department: string;
  gender: string;
}

const profile: NextPageWithAuth = () => {
  const [data, setData] = React.useState<UserProfile>({
    photo: "",
    full_name: "",
    email: "",
    mobile: "",
    department: "",
    gender: "",
  });
  const { data: session }: any = useSession();

  const user = session.user["user"];

  React.useEffect(() => {
    if (user) {
      setData({
        photo: user.photo,
        full_name: user.full_name,
        email: user.email,
        mobile: user.mobile,
        department: user.department,
        gender: user.gender,
      });
    }
  }, []);


  return (
    <Layout title="Profile | Requirements Portal">
      <GroupWrapper sx={{ margin: "0 auto" }}>
        <Grid container direction="column" alignItems="center" sx={{ p: 5 }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              borderRadius: "300px",
              border: "1px solid #ed1c24",
              overflow: "hidden",
              height: "150px",
              width: "150px",
            }}
          >
            <ImageRender url={data.photo} gender={data.gender} />
          </Grid>

          <FormControlStyle variant="standard" fullWidth>
            <InputLabel htmlFor="component-simple" sx={{ color: "#ffffff" }}>
              Full Name
            </InputLabel>
            <StyledInput
              readOnly
              id="component-simple"
              value={data.full_name}
            />
          </FormControlStyle>

          <FormControlStyle variant="standard" fullWidth>
            <InputLabel htmlFor="component-simple" sx={{ color: "#ffffff" }}>
              Email
            </InputLabel>
            <StyledInput readOnly id="component-simple" value={data.email} />
          </FormControlStyle>

          <FormControlStyle variant="standard" fullWidth>
            <InputLabel htmlFor="component-simple" sx={{ color: "#ffffff" }}>
              Mobile
            </InputLabel>
            <StyledInput readOnly id="component-simple" value={data.mobile} />
          </FormControlStyle>

          <FormControlStyle variant="standard" fullWidth>
            <InputLabel htmlFor="component-simple" sx={{ color: "#ffffff" }}>
              Department
            </InputLabel>
            <StyledInput
              readOnly
              id="component-simple"
              value={data.department}
            />
          </FormControlStyle>
        </Grid>
      </GroupWrapper>
    </Layout>
  );
};

profile.auth = true;

export default profile;
