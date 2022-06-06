import React, { useState } from "react";
import { IBreadcrumb, TBreadcrumbChildren } from "./IBreadcrumb";
import { SCBreadcrumb } from "./styles";

const Breadcrumb = ({
  separator = "/",
  maxItems = 4,
  itemsBeforeCollapse = 0,
  itemsAfterCollapse = 0,
  expandable = true,
  className = "",
  children,
}: IBreadcrumb) => {
  let assignableMaxItems = maxItems;
  let assignableItemsBeforeCollapse = itemsBeforeCollapse;
  let assignableItemsAfterCollapse = itemsAfterCollapse;

  const [collapseBreadcrumb, setCollapseBreadcrumb] = useState(true);
  let breadcrumbs: (React.ReactElement | React.ReactElement[])[] = [];
  const [breadcrumbChildren] = useState<TBreadcrumbChildren>(children);
  const expandBreadcrumb = () => {
    if (expandable) setCollapseBreadcrumb(!collapseBreadcrumb);
  };

  const createBreadcrumbs = () => {
    if (breadcrumbChildren && "length" in breadcrumbChildren) {
      const breadcrumbsBeforeCollapse = breadcrumbChildren.slice(
        0,
        assignableItemsBeforeCollapse
      );
      const ellipsis = (
        <li className="breadcrumb-item ellipsis">
          <button onClick={expandBreadcrumb} type="button">
            ...
          </button>
        </li>
      );
      const breadcrumbsAfterCollapse = breadcrumbChildren.slice(
        breadcrumbChildren.length - assignableItemsAfterCollapse
      );
      breadcrumbs = [
        ...breadcrumbsBeforeCollapse,
        ellipsis,
        ...breadcrumbsAfterCollapse,
      ];
    }
  };
  if (breadcrumbChildren && "length" in breadcrumbChildren) {
    if (
      breadcrumbChildren.length > assignableMaxItems &&
      assignableItemsBeforeCollapse + assignableItemsAfterCollapse <
        breadcrumbChildren.length &&
      collapseBreadcrumb
    ) {
      if (assignableItemsBeforeCollapse && assignableItemsAfterCollapse) {
        assignableMaxItems =
          assignableItemsBeforeCollapse + assignableItemsAfterCollapse;
        createBreadcrumbs();
      } else {
        assignableItemsBeforeCollapse = Math.floor(assignableMaxItems / 2);
        assignableItemsAfterCollapse =
          Math.floor(assignableMaxItems / 2) + (assignableMaxItems % 2);
        createBreadcrumbs();
      }
    } else {
      breadcrumbs = breadcrumbChildren;
    }
  }

  return (
    <nav className="breadcrumbWrapper">
      <SCBreadcrumb
        className={["breadcrumb", className].join(" ")}
        separator={separator}
      >
        {breadcrumbs}
      </SCBreadcrumb>
    </nav>
  );
};

export default Breadcrumb;
