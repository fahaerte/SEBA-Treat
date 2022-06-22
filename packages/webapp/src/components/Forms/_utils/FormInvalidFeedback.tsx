import Typography from "../../Typography/Typography";
import React from "react";

export const FormInvalidFeedback = ({ message }: { message: string }) => {
  return (
    <Typography
      variant="psmall"
      className="invalid-feedback position-absolute"
      color={"danger"}
    >
      {message}
    </Typography>
  );
};
