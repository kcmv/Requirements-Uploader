import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// @ts-ignore
import Dropzone from "./Dropzone";
import moment from "moment";
import SelectVaccines from "./SelectVaccines";
import DateGiven from "./DateGiven";
import { useMutation } from "react-query";
import Axios from "axios";
import { useGlobalProvider } from "../context/state";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";

const FormStyle = styled(Form)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const UpdateVaccination = ({ data, original, handleClose }: any) => {
  const [filtered, setFiltered] = React.useState([]);
  const globalState = useGlobalProvider();

  React.useEffect(() => {
    if (data) {
      setFiltered(
        data.filter(
          (item: any) => item.isbooster == original.vaccine_type["isbooster"]
        )
      );
    }
  }, []);

  const onChange = (e: any, props: any) => {
    if (e.target.value) {
      const vaccine: any = getDoseNumber(e.target.value);
      props.setFieldValue("dose_number", vaccine.dose_name);
      props.setFieldValue("vaccine_type", e.target.value);
    }
  };

  const getDoseNumber = (id: number) => {
    return filtered?.filter((item: any) => item.id === id)[0];
  };

  const getChangedValues = (values: any, initialValues: any) => {
    return Object.entries(values).reduce((acc: any, [key, value]: any) => {
      const hasChanged = initialValues[key] !== value;

      if (hasChanged) {
        acc[key] = value;
      }

      return acc;
    }, {});
  };

  const mutation = useMutation(
    async (values: any) => {
      // console.log(values)
      let bodyFormData = new FormData();

      bodyFormData.append("id", values["id"]);
      bodyFormData.append("dose", values["dose"]);
      bodyFormData.append("file", values["file"][0]);
      bodyFormData.append("link", values["link"]);
      bodyFormData.append("date_given", values["date_given"]);
      bodyFormData.append("dose_number", values["dose_number"]);
      bodyFormData.append("vaccine_type", values["vaccine_type"]);

      const result = await Axios({
        method: "PATCH",
        url: "api/vaccination",
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
          text: "File successfully updated",
          status: 200,
        });
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
    <div>
      <Formik
        initialValues={{
          id: original.id,
          file: "",
          dose: original.dose,
          date_given: original.date_given,
          link: original.link,
          dose_number: original.dose_number,
          vaccine_type: original.vaccine_type.id,
        }}
        validationSchema={Yup.object({
          // file: Yup.array().required("Required"),
          vaccine_type: Yup.string().required("Required"),
          dose: Yup.string().required("Required"),
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
          const matches = getChangedValues(values, {
            file: "",
            vaccine_type: original.vaccine_type.id,
            date_given: original.date_given,
            link: original.link,
            dose: original.dose,
            id: original.id,
            dose_number: original.dose_number,
          });

          if (Object.keys(matches).length > 0) {
            mutation.mutate(values);
          } else {
            handleClose();
          }

          setSubmitting(false);
          //
        }}
      >
        {(props: any) => (
          <FormStyle onSubmit={props.handleSubmit}>
            <div>
              <p>
                Vaccination Card:
                {props.errors.file && props.touched.file ? (
                  <Typography variant="h1" color="primary">
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
              <p>Dose: {props.values.dose}</p>
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
    </div>
  );
};

export default UpdateVaccination;
