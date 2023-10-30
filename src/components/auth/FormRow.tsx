import React from "react";

function FormRow(props: React.HTMLProps<HTMLInputElement>) {
  return (
    <>
      <span className="-mb-2">{props.placeholder}</span>
      <input
        {...props}
        className={"px-4 py-3 rounded-xl border " + props.className}
      ></input>
    </>
  );
}

export default FormRow;
