import React from "react";
import { SCBadge } from "./styles";
import { IBadge } from "./IBadge";

const Badge = ({
  children,
  className = "",
  rounded = false,
  color = "primary",
  outlined = false,
  ...props
}: IBadge) => (
  <SCBadge
    color={color}
    className={[
      className,
      "badge",
      outlined ? "outlined" : "",
      `${rounded ? "rounded-pill" : ""}`,
    ].join(" ")}
    {...props}
  >
    {children}
  </SCBadge>
);

export default Badge;
