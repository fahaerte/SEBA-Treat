import React from "react";
import { IIcon } from "./IIcon";
import { SCIcon } from "./styles";

/**
 * Default Values from Bootstrap Icon Svg Example
 */
const Icon = ({ type, size = "md", color, className = "" }: IIcon) => (
  <>
    <SCIcon
      color={color}
      fill="currentColor"
      className={[`bi`, `bi-${type}`, `svg-${size}`, className].join(" ")}
    >
      <use xlinkHref={`#${type}`} />
    </SCIcon>
  </>
);

export default Icon;
