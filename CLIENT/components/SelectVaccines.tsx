import { Typography } from "@mui/material";
import React from "react";

interface UiProps {
  vaccines: any;
  props: any;
  onChange: Function;
  type: string;
}
const Ui: React.FC<UiProps> = ({ vaccines, props, onChange, type }) => {
  return (
    <>
      <select
        onChange={(e) => {
          onChange(e, props);
        }}
        value={props.values.vaccine_type}
      >
        <option value=""></option>
        {(vaccines as string[])?.map((vaccine: any) => (
          <option key={vaccine.id} value={vaccine.id}>
            {vaccine.name}
          </option>
        ))}
      </select>
      {props.errors[type] && props.touched[type] ? (
        <Typography variant="body1" color="primary">
          {props.errors[type]}
        </Typography>
      ) : null}
    </>
  );
};

const SelectVaccines = React.memo(Ui);

export default SelectVaccines;
