import React from "react";
import { ISectionHeading } from "./ISectionHeading";
import { SCSectionHeading } from "./styles";

/**
 * Button component to handle click events.
 * The Link component is derived from this component.
 * Depending on the use case, either the button or
 * the Link component should be used to follow
 * the HTML5 standards.
 */
const SectionHeading = ({ children }: ISectionHeading) => (
  <SCSectionHeading>
    {children}
    <hr />
  </SCSectionHeading>
);
export default SectionHeading;
