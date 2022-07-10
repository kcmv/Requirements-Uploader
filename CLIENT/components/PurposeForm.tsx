import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PayModal from "./PayModal";
import DaysSelection from "./DaysSelection";
import CustomTimeInput from "./CustomTimeInput";
import CustomInput from "./CustomInput";
import CustomDate from "./CustomDate";
import { useMutation } from "react-query";
import Axios from "axios";
import { useGlobalProvider } from "context/state";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const Ui = ({ data }: any) => {
  const [fields, setFields] = React.useState<any>([]);
  const [values, setValues] = React.useState<any>();
  const [open, setOpen] = React.useState(false);
  const [yup_values, setYupValues] = React.useState<any>();
  const [withPassword, setWithPassword] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);
  const globalState = useGlobalProvider();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mutation = useMutation(
    async (values: any) => {
      const result = await Axios({
        method: "POST",
        url: "api/coe_requests",
        data: {
          ...values,
          password: "",
        },
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
          query: "coe_requests",
          text: "Request successfully sent.",
          status: 200,
        });
        setLoading(false);
      },
      onError: (err: any) => {
        globalState.setValues({
          open: true,
          text: err.response.data,
          status: err.response.status,
        });
        setLoading(false);
      },
    }
  );

  const ChooseInput = (props: any) => {
    let input;
    switch (props.type) {
      case "input":
        input = <CustomInput {...props} />;
        break;
      case "time":
        input = <CustomTimeInput {...props} />;
        break;
      case "days":
        input = <DaysSelection {...props} />;
        break;
      default:
        input = <CustomDate {...props} />;
    }

    return input;
  };

  React.useEffect(() => {
    const val: any = {
      emailToUse: "",
    };
    const yup_val: any = {
      emailToUse: Yup.string().required("Required"),
    };

    const new_fields: any = [];

    data?.purpose_field_types.map((item: any) => {
      if (item.isNeeded) {
        val[item.id] = "";
        yup_val[item.id] = Yup.string().required("Required");

        new_fields.push({ id: item.id, type: item.field_type });
      }
    });
    setFields(new_fields);
    setValues(val);
    setYupValues(yup_val);

    return () => {
      setValues(null);
      setYupValues(null);
      setFields(null);
    };
  }, [data]);

  return (
    <Grid sx={{ p: 2, width: "100%" }}>
      <Formik
        enableReinitialize={true}
        initialValues={values}
        validationSchema={Yup.object(yup_values)}
        onSubmit={async (val: any, { setSubmitting }) => {
          setSubmitting(true);
          setLoading(true);
          const answers = [];

          for (const fields in val) {
            if (fields !== "emailToUse") {
              answers.push({
                purpose_field_type: fields,
                answer: val[fields],
              });
            }
          }

          const answers_with_purpose: any = {
            answers,
            purpose_id: data.id,
            emailToUse: val.emailToUse,
            withCompensation: data.withCompensation,
          };

          setWithPassword(answers_with_purpose);

          if (data.withCompensation) {
            handleOpen();
            setLoading(false);
          } else {
            mutation.mutate(answers_with_purpose);
          }
        }}
      >
        {(props: any) => (
          <Form onSubmit={props.handleSubmit}>
            {fields &&
              fields.map((item: any) => {
                const field_props = {
                  key: item.id,
                  type: item.type[0].answer_type,
                  name: item.id,
                  setFieldValue: props.setFieldValue,
                  values: props.values,
                };
                return (
                  <Grid sx={{ width: "100%" }} key={item.id}>
                    <Typography variant="body1">
                      {item.type[0].description}:
                    </Typography>
                    <Grid>{ChooseInput(field_props)}</Grid>
                    {props.errors[item.id] && props.touched[item.id] ? (
                      <Typography variant="body1" color="primary">
                        {props.errors[item.id]}
                      </Typography>
                    ) : null}
                  </Grid>
                );
              })}

            {data && (
              <>
                <div style={{ marginBottom: "15px" }}>
                  <Typography variant="body1">Select email to use:</Typography>
                  <select
                    style={{ padding: "3px", width: "100%" }}
                    onChange={(e: any) => {
                      props.setFieldValue("emailToUse", e.target.value);
                    }}
                    value={props?.values.emailToUse}
                  >
                    <option value="" defaultChecked></option>
                    <option value="company">Company</option>
                    <option value="personal">Personal</option>
                  </select>
                  {props.errors.emailToUse && props.touched.emailToUse ? (
                    <Typography variant="body1" color="primary">
                      {props.errors.emailToUse}
                    </Typography>
                  ) : null}
                </div>

                <Button variant="contained" type="submit">
                  {loading ? "Submitting" : "SUBMIT"}
                </Button>
              </>
            )}
          </Form>
        )}
      </Formik>
      <PayModal
        open={open}
        handleClose={handleClose}
        withPassword={withPassword}
      />
    </Grid>
  );
};

const PurposeForm = React.memo(Ui);

export default PurposeForm;
