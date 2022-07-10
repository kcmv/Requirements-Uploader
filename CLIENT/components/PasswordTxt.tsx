import React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useField } from "formik";

interface State {
  password: string;
  showPassword: boolean;
}

interface PasswordTxtProps {
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

const PasswordTxt: React.FC<PasswordTxtProps> = ({ ...props }) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error ? true : false;
  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        error={isError}
        {...field}
        {...props}
        id="outlined-adornment-password"
        type={values.showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default PasswordTxt;
