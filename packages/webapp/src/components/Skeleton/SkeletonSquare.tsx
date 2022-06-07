import React from "react";
import { ISkeletonSquare } from "./ISkeleton";
import { SCSkeleton } from "./styles";

const SkeletonSquare = ({
  rows = 1,
  pulse = false,
  className = "",
  color = "secondary",
  width = "auto",
  height = "20px",
  rounded = true,
}: ISkeletonSquare) => (
  <>
    {[...Array(rows)].map((value: undefined, index: number) => (
      <SCSkeleton
        key={`${index}-skeleton-text`}
        height={height}
        width={width}
        rounded={rounded}
        className={[
          className,
          pulse ? "pulse" : `wave-${color} wave`,
          rows > 1 ? "mb-2" : "",
          `bg-${color}`,
        ].join(" ")}
      />
    ))}
  </>
);

export default SkeletonSquare;
