import React from "react";
import { IIcon } from "./IIcon";
import { SCIcon } from "./styles";

/**
 * Default Values from Bootstrap Icon Svg Example
 */
const Icon = ({ type, size = "md" }: IIcon) => (
  <>
    <SCIcon
      fill="currentColor"
      className={[`bi`, `bi-${type}`, `svg-${size}`].join(" ")}
    >
      <use xlinkHref={`#${type}`} />
    </SCIcon>
  </>
);

export default Icon;
