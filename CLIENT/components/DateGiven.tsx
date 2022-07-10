import React from "react";
import moment from "moment";
import { Typography } from "@mui/material";

interface UiProps {
  props: any;
}

const Ui: React.FC<UiProps> = ({ props }) => {
  return (
    <div>
      <p>Date Given:</p>
      <input
        type="date"
        value={moment(props.values.date_given).format("yyyy-MM-DD")}
        onChange={(e) => {
          props.setFieldValue("date_given", e.target.value);
        }}
      />
      {props.errors.date_given && props.touched.date_given ? (
        <Typography variant="body1" color="primary">
          {props.errors.date_given}
        </Typography>
      ) : null}
    </div>
  );
};

const DateGiven = React.memo(Ui);

export default DateGiven;
