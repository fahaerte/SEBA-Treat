import React, { MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import { SCLink } from "./styles";
import { ILink } from "./ILink";

/**
 * Link is based on the button component
 * regarding styling and the interface.
 * For an anchor tag, the onClick event
 * handler was removed, since links should
 * only be used for navigation purposes.
 */
const Link = ({
  color = "primary",
  type = "link",
  size = "md",
  className = "",
  to,
  route = true,
  underline = true,
  children,
  style = {},
  onClick = () => undefined,
  ...props
}: ILink) => {
  const classes = [
    type === "link" ? `link-${color} link-${size}` : "",
    type === "default" ? `btn btn-${color} btn-${size}` : "",
    type === "outline" ? `btn btn-outline-${color} btn-${size}` : "",
    className,
  ].join(" ");
  return (
    <SCLink
      as={route ? NavLink : "a"}
      href={route || typeof to !== "string" ? "" : to}
      underline={underline}
      onClick={(event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) =>
        onClick(event)
      }
      style={style}
      className={classes}
      to={route ? to : ""}
      {...props}
    >
      {children}
    </SCLink>
  );
};

export default Link;
