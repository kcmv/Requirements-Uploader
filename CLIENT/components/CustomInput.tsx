import React from "react";

const Ui = ({ setFieldValue, values, name }: any) => (
  <input
    type="text"
    style={{ width: "100%" }}
    value={values[name] || ""}
    name={name}
    onChange={(e) => {
      setFieldValue(name, e.target.value);
    }}
  />
);

const CustomInput = React.memo(Ui);

export default CustomInput;
