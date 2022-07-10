import { getAMPM } from "helpers/util";
import React from "react";

const Ui = ({ setFieldValue, name }: any) => (
  <input
    type="time"
    style={{ width: "100%" }}
    name={name}
    onChange={(e) => {
      setFieldValue(name, getAMPM(e.target.value));
    }}
  />
);

const CustomTimeInput = React.memo(Ui);

export default CustomTimeInput;
