import React, { memo } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import FormikTextField from "./FormikTextField"
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import PasswordTxt from "./PasswordTxt";

const FormContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(5),
  },
  padding: theme.spacing(10),
}));

const LoginBtn = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  width: "100%",
}));

const FormWrapper = styled(Form)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: "15px 0px",
}));

const Ui: React.FC = () => {
  const router = useRouter();
  const [errors, setError] = React.useState<any>(null);

  return (
    <FormContainer container>
      <Stack sx={{ width: "100%" }} spacing={2}>
        {errors && <Alert severity="error">{errors}</Alert>}
      </Stack>
      <Formik
        initialValues={{ employee_id: "", password: "" }}
        validationSchema={Yup.object({
          employee_id: Yup.string()
            .max(30, "Must be 30 characters or less")
            .required("Please enter your email"),
          password: Yup.string().required("Please enter your password"),
        })}
        onSubmit={async (values) => {
          const res = await signIn("credentials", {
            redirect: false,
            email: values.employee_id,
            password: values.password,
            callbackUrl: `${window.location.origin}/home`,
          });
          if (res?.error) {
            setError(res.error);
          } else {
            if (res?.url) router.push(res.url);
            setError(null);
          }
        }}
      >
        {(formik) => (
          <FormWrapper onSubmit={formik.handleSubmit}>
            <FormikTextField
              label="Employee ID"
              name="employee_id"
              placeholder="Employee ID"
              variant="outlined"
              type="text"
              disabled={formik.isSubmitting}
            />
            <PasswordTxt
              label="Password"
              name="password"
              placeholder="Password"
              variant="outlined"
              type="password"
              disabled={formik.isSubmitting}
            />
            <LoginBtn
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Please wait..." : "Sign In"}
            </LoginBtn>
          </FormWrapper>
        )}
      </Formik>
    </FormContainer>
  );
};

const LoginForm = memo(Ui);

export default LoginForm 
