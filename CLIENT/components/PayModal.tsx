import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useGlobalProvider } from "context/state";
import { useMutation } from "react-query";
import Axios from "axios";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import { Button, FormControl, Grid, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  // p: 4,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const Ui = ({ open, handleClose, withPassword }: any) => {
  const globalState = useGlobalProvider();
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const mutation = useMutation(
    async (values: any) => {
      const result = await Axios({
        method: "POST",
        url: "api/coe_requests",
        data: values,
      });
      return result;
    },
    {
      onSettled: () => {
        // queryClient.invalidateQueries('user_documents')
      },
      onSuccess: () => {
        setLoading(false);
        globalState.setValues({
          open: true,
          query: "coe_requests",
          text: "Request successfully sent.",
          status: 200,
        });
        handleClose();
      },
      onError: (err: any) => {
        setLoading(false);
        if (err.response.status === 401) {
          globalState.setValues({
            open: true,
            text: err.response.data,
            status: 403,
          });
        } else {
          globalState.setValues({
            open: true,
            text: err.response.data,
            status: err.response.status,
          });
        }
      },
    }
  );

  const setShowBtn = () => {
    setShowPassword(!showPassword);
  };

  const body = (
    <Grid sx={style}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ background: "rgb(237, 28,36)", position: "static", p: 1 }}
      >
        <p></p>
        <Grid sx={{ color: "#ffffff" }}>EPpay</Grid>
        <HighlightOffIcon
          sx={{ color: "#ffffff", marginRight: "5px" }}
          role="button"
          onClick={handleClose}
        />
      </Grid>
      <FormControl
        sx={{
          margin: "15px!important",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        component="fieldset"
      >
        <Alert severity="info">
          Information will include compensation and account password is needed.
        </Alert>
        <Formik
          initialValues={{
            purpose_id: withPassword?.purpose_id,
            withCompensation: withPassword?.withCompensation,
            answers: withPassword?.answers,
            emailToUse: withPassword?.emailToUse,
            password: "0000",
          }}
          validationSchema={Yup.object({
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values: any) => {
            setLoading(true);
            mutation.mutate(values);
          }}
        >
          {(props: any) => (
            <Form onSubmit={props.handleSubmit}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type={showPassword ? "input" : "password"}
                  name="password"
                  disabled={loading}
                  onChange={(e) => {
                    props.setFieldValue("password", e.target.value);
                  }}
                  placeholder="Enter password here"
                  style={{ margin: "10px 0px", padding: "7px", width: "90%" }}
                />
                <div
                  style={{ padding: "0px 10px", cursor: "pointer" }}
                  onClick={setShowBtn}
                >
                  {showPassword ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </div>
              </div>
              {props.errors.password && props.touched.password ? (
                <Typography variant="body1" color="primary">
                  {props.errors.password}
                </Typography>
              ) : null}
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{ width: "100%" }}
              >
                {loading ? "Submitting" : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </FormControl>
    </Grid>
  );

  return (
    <div style={{ paddingLeft: "5px" }}>
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

const PayModal = React.memo(Ui);

export default PayModal;
