import { Grid, Typography } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import React from "react";

interface UiProps {
  props: any;
  type: string;
  dosageCount?: string;
}

const Ui: React.FC<UiProps> = ({ props, dosageCount }) => {
  return (
    <div>
      <p>Dose:</p>
      <Grid container sx={{ paddingLeft: "10px" }}>
        <div>
          <FormLabel>1</FormLabel>
          <Radio
            checked={props.values.dose === "1"}
            onChange={(e) => {
              props.setFieldValue("dose", e.target.value);
            }}
            value="1"
            name="dose"
            inputProps={{ "aria-label": "1" }}
          />
        </div>
        <div>
          {dosageCount === "2" && (
            <>
              <FormLabel>2</FormLabel>
              <Radio
                checked={props.values.dose === "2"}
                onChange={(e) => {
                  props.setFieldValue("dose", e.target.value);
                }}
                value="2"
                name="dose"
                inputProps={{ "aria-label": "2" }}
              />
            </>
          )}
        </div>
        {props.errors.dose && props.touched.dose ? (
          <Typography variant="body1" color="primary">
            {props.errors.dose}
          </Typography>
        ) : null}
      </Grid>
    </div>
  );
};

const DosageRadio = React.memo(Ui);

export default DosageRadio;
