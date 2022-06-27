import React from "react";
import { IPageHeading } from "./IPageHeading";
import { SCPageHeading } from "./styles";

/**
 * Button component to handle click events.
 * The Link component is derived from this component.
 * Depending on the use case, either the button or
 * the Link component should be used to follow
 * the HTML5 standards.
 */
const PageHeading = ({ children }: IPageHeading) => (
  <SCPageHeading>{children}</SCPageHeading>
);
export default PageHeading;
