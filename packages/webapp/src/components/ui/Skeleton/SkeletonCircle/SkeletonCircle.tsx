import React from "react";
import { ISkeletonCircle } from "../ISkeleton";
import { SCSkeletonCircle } from "../styles";

const SkeletonCircle = ({
  height = "2rem",
  width = height,
  pulse = false,
  className = "",
  color = "secondary",
}: ISkeletonCircle) => (
  <SCSkeletonCircle
    width={width}
    height={height}
    className={[
      className,
      pulse ? `pulse bg-${color}` : `wave-${color} wave`,
    ].join(" ")}
  />
);

export default SkeletonCircle;
