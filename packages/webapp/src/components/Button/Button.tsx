import React from "react";
import { SCButton } from "./styles";
import { IButton } from "./IButton";

/**
 * Button component to handle click events.
 * The Link component is derived from this component.
 * Depending on the use case, either the button or
 * the Link component should be used to follow
 * the HTML5 standards.
 */
const Button = ({
  color = "primary",
  type = "default",
  size = "md",
  className = "",
  disabled = false,
  htmlType = "button",
  onClick = () => undefined,
  isLoading = false,
  children,
}: IButton) => (
  <SCButton
    type={htmlType}
    className={[
      "btn",
      size === "md" ? "" : `btn-${size}`,
      type === "default" ? `btn-${color}` : "",
      type === "outline" ? `btn-outline-${color}` : "",
      className,
    ].join(" ")}
    onClick={(event) => onClick(event)}
    disabled={disabled}
  >
    {isLoading && (
      <>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </>
    )}
    {children}
  </SCButton>
);
export default Button;
