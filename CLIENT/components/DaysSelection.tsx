import React from "react";

const Ui = ({ setFieldValue, values, name }: any) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <>
      <select
        style={{ width: "100%" }}
        value={values[name]}
        name={name}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
        }}
      >
        <option value="" defaultChecked></option>
        {days.map((day) => {
          return (
            <option key={day} value={day}>
              {day}
            </option>
          );
        })}
      </select>
    </>
  );
};

const DaysSelection = React.memo(Ui);

export default DaysSelection;
