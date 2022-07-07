import React from "react";
import { IContainer } from "./IContainer";

const Container = ({
  className = "",
  children,
  fluid = false,
  ...props
}: IContainer) => {
  let bsContainer = "container";
  if (typeof fluid === "string") {
    bsContainer += `-${Object.keys(fluid)[0]}`;
  } else if (fluid) {
    bsContainer += "-fluid";
  }
  return (
    <div
      className={[
        bsContainer, // BS-Class
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
