import React from "react";
import { IRow } from "./IRow";

const Row = ({
  alignContent = "stretch",
  alignItems = "stretch",
  wrap = "wrap",
  direction = "row",
  justify = "start",
  className = "",
  children,
  ...props
}: IRow) => (
  <div
    className={[
      "row",
      `flex-wrap-${wrap}`,
      `align-content-${alignContent}`, // BS-class
      `align-items-${alignItems}`, // BS-class
      `flex-${direction}`, // BS-Class
      `justify-content-${justify}`, // BS-Class
      className,
    ].join(" ")}
    {...props}
  >
    {children}
  </div>
);

export default Row;
