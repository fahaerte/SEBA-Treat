import React, { MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import { SCLink } from "./styles";
import { ILink } from "./ILink";
import Button from "../Button/Button";

/**
 * Link is based on the button component regarding styling and the interface.
 * The onClick event handler was removed, since links should
 * only be used for navigation purposes.
 */
const Link = ({
  color = "primary",
  display = "text",
  size = "md",
  className = "",
  to,
  route = true,
  underline = true,
  children,
  onClick = () => undefined,
  buttonProps,
}: ILink) => {
  return (
    <SCLink
      as={route ? NavLink : "a"}
      href={route ? undefined : (to as string)}
      to={route ? to : ""}
      $underline={underline}
      onClick={(event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) =>
        onClick(event)
      }
      className={`${
        display === "text" ? `link-${color} link-${size}` : ""
      } ${className}`}
      color={color}
    >
      {display === "text" ? (
        children
      ) : (
        <Button
          color={color}
          size={size}
          className={className}
          as={"div"}
          {...buttonProps}
        >
          {children}
        </Button>
      )}
    </SCLink>
  );
};

export default Link;
