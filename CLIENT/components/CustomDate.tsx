import React from 'react'

const Ui = ({ setFieldValue, name }: any) => (
    <input
      style={{ width: "100%", padding: "3px" }}
      type="date"
      name={name}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
    />
  );

const CustomDate = React.memo(Ui)

export default CustomDate