import React from "react";
import { SCTypography } from "./styles";
import { ITypography } from "./ITypography";
import { SkeletonSquare } from "../Skeleton";

const Typography = ({
  variant = "p",
  display = "block",
  align = "start",
  noWrap = false,
  className = "",
  component,
  children,
  gutterBottom = true,
  isLoading = false,
  skeletonProps = { color: "secondary" },
  color,
  ...props
}: ITypography) => (
  <>
    {isLoading ? (
      <SkeletonSquare {...skeletonProps} />
    ) : (
      <SCTypography
        color={color}
        className={[
          "typography",
          `d-${display}`,
          align !== "start" ? `text-${align}` : "",
          noWrap ? "text--noWrap" : "",
          gutterBottom
            ? `${
                variant.includes("h")
                  ? "typography--headline--mb"
                  : "typography--body--mb"
              }`
            : "typography--mb-0",
          variant.includes("h") ? "typography--headline" : "typography--body",
          `typography--${variant}`,
          className,
        ].join(" ")}
        {...props}
        as={variant === "psmall" ? "p" : component || variant}
      >
        {children}
      </SCTypography>
    )}
  </>
);

export default Typography;
