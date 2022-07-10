import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import styled from "@mui/system/styled";
import Dropzone from "./Dropzone";
import LinearProgress from "@mui/material/LinearProgress";
import { useMutation } from "react-query";
import Axios from "axios";
import { useGlobalProvider } from "../context/state";

interface UploaderProps {
  data: {
    active: boolean;
    comments: string;
    date_submitted?: string;
    document_link?: string;
    document_type: any;
    id: string;
    status: number;
    view_status?: string;
  };
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  //   p: 4,
};

const CustomForm = styled(Form)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: "10px",
}));

const Uploader: React.FC<UploaderProps> = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const [isUploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const globalState = useGlobalProvider();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mutation = useMutation(
    async (values: any) => {
      let bodyFormData = new FormData();

      bodyFormData.append("id", values["id"]);
      bodyFormData.append("file", values["file"][0]);
      bodyFormData.append("status", "2");
      bodyFormData.append("document_link", "null");
      bodyFormData.append("date_submitted", new Date().toISOString());

      const result = await Axios({
        method: "PATCH",
        url: "api/user_documents",
        data: bodyFormData,
        onUploadProgress: (progressEvent: any) => {
          setProgress(() =>
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      });
      setUploading(false);
      return result;
    },
    {
      onSettled: () => {
        // queryClient.invalidateQueries('user_documents')
      },
      onSuccess: () => {
        globalState.setValues({
          open: true,
          query: "user_documents",
          text: "File successfully uploaded.",
          status: 200,
        });
      },
      onError: (err: any) => {
        globalState.setValues({
          open: true,
          text: err.response.data.message,
          status: err.response.status,
        });
      },
    }
  );


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
      <Formik
        initialValues={{
          id: data.id,
          file: "",
        }}
        validationSchema={Yup.object({
          file: Yup.array().required("Required"),
        })}
        onSubmit={async (doc: any) => {
        //  console.log(doc);
            setUploading(true);
            mutation.mutate(doc);
        }}
      >
        {(props: any) => (
          <CustomForm onSubmit={props.handleSubmit}>
            <Dropzone props={props} />
            {props.errors.file && props.touched.file ? (
              <Typography variant="body1" sx={{ color: "rgb(237, 28, 36)" }}>
                {props.errors.file}
              </Typography>
            ) : null}
            <Button color="primary" type="submit" variant="contained">
              Upload
            </Button>
            {isUploading && (
              <>
                <LinearProgress
                  sx={{
                    width: "90%",
                    marginRight: "5px",
                  }}
                  variant="determinate"
                  value={progress}
                />
                <span> {Math.round(progress)}%</span>
              </>
            )}
          </CustomForm>
        )}
      </Formik>
    </Box>
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        UPLOAD
      </Button>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default Uploader;
