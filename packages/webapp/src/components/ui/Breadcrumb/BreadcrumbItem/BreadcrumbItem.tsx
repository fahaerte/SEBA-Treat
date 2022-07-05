import React from "react";
import Link from "../../Link/Link";
import { IBreadcrumbItem } from "./IBreadcrumbItem";

const BreadcrumbItem = ({
  active = false,
  className = "",
  children,
  ...rest
}: IBreadcrumbItem) => (
  <li
    className={["breadcrumb-item", active ? "active" : "", className].join(" ")}
  >
    <Link {...rest} route size={"sm"}>
      {children}
    </Link>
  </li>
);

export default BreadcrumbItem;
