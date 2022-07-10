import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Dropzone from "./Dropzone"
import moment from "moment";
import SelectVaccines from "./SelectVaccines";
import DateGiven from "./DateGiven";
import { useMutation } from "react-query";
import Axios from "axios";
import { useGlobalProvider } from "../context/state";
import { Button, Grid, Typography } from "@mui/material";
import styled from "@mui/system/styled";

const FormStyle = styled(Form)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));


const BoosterGroup = ({ data }: any) => {
  const [filtered, setFiltered] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const globalState = useGlobalProvider();

  React.useEffect(() => {
    if (data) {
      setFiltered(data.filter((item: any) => item.isbooster));
    }
  }, []);

  const onChange = (e: any, props: any) => {
    const vaccine: any = getDoseNumber(e.target.value);
    props.setFieldValue("dose_number", vaccine.dose_name);
    props.setFieldValue("vaccine_type", e.target.value);
  };

  const getDoseNumber = (id: number) => {
    return filtered?.filter((item: any) => item.id === id)[0];
  };

  const mutation = useMutation(
    async (values: any) => {
      let bodyFormData = new FormData();

      bodyFormData.append("dose", values["dose"]);
      bodyFormData.append("file", values["file"][0]);
      bodyFormData.append("date_given", values["date_given"]);
      bodyFormData.append("dose_number", values["dose_number"]);
      bodyFormData.append("vaccine_type", values["vaccine_type"]);

      const result = await Axios({
        method: "POST",
        url: "api/booster",
        data: bodyFormData,
      });
      return result;
    },
    {
      onSettled: () => {
        // queryClient.invalidateQueries('user_documents')
      },
      onSuccess: () => {
        globalState.setValues({
          open: true,
          query: "user_vaccination",
          text: "File successfully uploaded.",
          status: 200,
        });
        setOpen(!open);
      },
      onError: (err: any) => {
        globalState.setValues({
          open: true,
          text: err.response.data,
          status: err.response.status,
        });
      },
    }
  );

  return (
    <Grid sx={{m:1}}>
      <Formik
        initialValues={{
          file: "",
          dose: 3,
          date_given: "",
          dose_number: "",
          vaccine_type: "",
        }}
        validationSchema={Yup.object({
          file: Yup.array().required("Required"),
          vaccine_type: Yup.string().required("Required"),
          date_given: Yup.string()
            .test(function (value) {
              const isValid = moment(value).isAfter();
              if (!isValid) return true;
              return this.createError({
                message: "Date provided should not be future-dated",
              });
            })
            .required("Required"),
        })}
        onSubmit={(values: any, { setSubmitting }) => {
          setSubmitting(false);
          mutation.mutate(values);
        }}
      >
        {(props: any) => (
          <FormStyle onSubmit={props.handleSubmit}>
            <div>
              <p>
                Vaccination Card:
                {props.errors.file && props.touched.file ? (
                  <Typography variant="body1" color="primary">
                    {props.errors.file}
                  </Typography>
                ) : null}
              </p>
              <Dropzone props={props} />
              <p>Vaccine Brand:</p>
              <SelectVaccines
                type="vaccine_type"
                vaccines={filtered}
                props={props}
                onChange={onChange}
              />
              <DateGiven props={props} />
            </div>
            <Button
              type="submit"
              variant="contained"
              disabled={props.isSubmitting}
            >
              {props.isSubmitting ? "Loading" : "SUBMIT"}
            </Button>
          </FormStyle>
        )}
      </Formik>
    </Grid>
  );
};

export default BoosterGroup;
