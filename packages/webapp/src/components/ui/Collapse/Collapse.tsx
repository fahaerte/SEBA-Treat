import React from "react";
import { Collapse as CollapseBootstrap } from "react-bootstrap";
import { ICollapse } from "./ICollapse";

const Collapse = ({
  children,
  className = "",
  show = false,
  direction = "vertical",
  collapseHeight = "0px",
  contentWidth = "100%",
  ...props
}: ICollapse) => (
  <div style={{ minHeight: `${collapseHeight}` }}>
    <CollapseBootstrap
      dimension={direction === "vertical" ? "height" : "width"}
      in={show}
      className={className}
      {...props}
    >
      {/**
       * The reason for these div blocks is to make the width
       * that was setted valid. Extracted from React-Bootstrap
       * code example.
       */}
      <div>
        <div style={{ width: `${contentWidth}` }}>{children}</div>
      </div>
    </CollapseBootstrap>
  </div>
);

export default Collapse;
