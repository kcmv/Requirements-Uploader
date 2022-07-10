import React, { memo } from "react";
import { useField } from "formik";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

interface FormikTextfieldProps {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: true | false;
  onChange?: any;
  format?: any;
  helperText?: string;
  select?: boolean;
  variant?: "filled" | "standard" | "outlined" | undefined;
  children?: React.ReactNode;
  multiline?: boolean;
  rowsMax?: number;
  onBlur?: any;
}

export const Ui: React.FC<FormikTextfieldProps> = ({ ...props }) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error ? true : false;

  return (
    <>
      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
        <InputLabel htmlFor={`outlined-adornment-${props.label}`}>
          {props.label}
        </InputLabel>
        <OutlinedInput
          error={isError}
          {...field}
          {...props}
          id="outlined-adornment-text"
          type="text"
          placeholder={props.placeholder}
          fullWidth={true}
          margin="dense"
        />
      </FormControl>
    </>
  );
};

const FormikTextField = memo(Ui);

export default FormikTextField;
