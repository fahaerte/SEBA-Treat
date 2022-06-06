import React from "react";
import { ICol, TColNumber } from "./ICol";

const getBreakpointProperties = (
  breakpoint: string,
  breakpointConfig: TColNumber
) => {
  let breakpointProps = "";
  switch (typeof breakpointConfig) {
    case "boolean":
      breakpointProps = `col-${breakpoint}`;
      break;
    case "number":
      if (breakpoint === "xs") {
        breakpointProps = `col-${breakpointConfig}`;
      } else {
        breakpointProps = `col-${breakpoint}-${breakpointConfig}`;
      }
      break;
    case "string":
      breakpointProps = `col-${breakpoint}-auto`;
      break;
    case "object":
      if (breakpointConfig.span) {
        if (typeof breakpointConfig.span === "number") {
          breakpointProps = `col-${breakpoint}-${breakpointConfig.span}`;
        } else if (breakpointConfig.span === "auto") {
          breakpointProps = `col-${breakpoint}-auto`;
        } else if (breakpointConfig.span) {
          breakpointProps = `col-${breakpoint}`;
        }
      }
      if (breakpointConfig.offset) {
        breakpointProps += ` offset-${breakpoint}-${breakpointConfig.offset}`;
      }
      if (breakpointConfig.order) {
        breakpointProps += ` order-${breakpoint}-${breakpointConfig.order}`;
      }
      break;
    default:
      break;
  }
  return breakpointProps;
};

const Col = ({
  lg,
  md,
  // sm,
  // xl,
  xs,
  className = "",
  children,
  ...props
}: ICol) => {
  const colLg = lg ? getBreakpointProperties("lg", lg) : "";
  const colMd = md ? getBreakpointProperties("md", md) : "";
  // const colSm = sm ? getBreakpointProperties(sm) : "";
  // const colXl = xl ? getBreakpointProperties(xl) : "";
  const colXs = xs ? getBreakpointProperties("xs", xs) : "";
  return (
    <div
      className={[
        `${
          colLg !== "" ||
          colMd !== "" ||
          // colSm !== "" ||
          // colXl !== "" ||
          colXs !== ""
            ? ""
            : "col"
        }`,
        colLg,
        colMd,
        // colSm,
        // colXl,
        colXs,
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
};

export default Col;
