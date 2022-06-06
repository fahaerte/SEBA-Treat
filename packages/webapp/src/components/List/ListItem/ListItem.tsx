import React from "react";
import { SCListItem } from "../styles";
import { IListItem } from "./IListItem";
import { useListColorContext } from "../List";
import Link from "../../Link/Link";

const ListItem = ({
  children,
  className = "",
  alignItems = "start",
  active = false,
  disabled = false,
  onClick = () => undefined,
  linkProps,
  ...props
}: IListItem) => {
  const { color, listType, hoverable } = useListColorContext();
  const getListVariant = () => {
    switch (listType) {
      case "link":
        return Link;
      default:
        return "li";
    }
  };

  return (
    <SCListItem
      color={color}
      className={[
        `align-items-${alignItems}`,
        "list-group-item",
        hoverable || listType === "link"
          ? `list-group-item-action list-group-item-action.link-${color}` // Second class to overwrite link css
          : "",
        active ? "active" : "",
        disabled ? "disabled" : "",
        className,
      ].join(" ")}
      onClick={onClick}
      {...props}
      {...linkProps}
      as={getListVariant()}
    >
      {children}
    </SCListItem>
  );
};

export default ListItem;
