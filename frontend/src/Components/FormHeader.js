import React from "react";

const FormHeader = ({ text = "This is form header" }) => {
  return (
    <div className="form-header">
      <h3>{text}</h3>
    </div>
  );
};

export default FormHeader;
