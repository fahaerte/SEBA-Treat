import React from "react";
import Link from "../../Link/Link";
import { IBreadcrumbItem } from "./IBreadcrumbItem";

/**
 * Primary UI component for user interaction
 */
const BreadcrumbItem = ({
  active = false,
  className = "",
  to = "/",
  type = "link",
  route = false,
  size = "md",
  children,
}: IBreadcrumbItem) => (
  <li
    className={["breadcrumb-item", active ? "active" : "", className].join(" ")}
  >
    <Link to={to} type={type} route={route} size={size}>
      {children}
    </Link>
  </li>
);

export default BreadcrumbItem;
