import React from "react";
import { IBreadcrumbItem } from "./BreadcrumbItem/IBreadcrumbItem";

export type TBreadcrumbChildren =
  | React.ReactElement<IBreadcrumbItem>[]
  | React.ReactElement<IBreadcrumbItem>;

export interface IBreadcrumb {
  /**
   * Content
   */
  children: TBreadcrumbChildren;
  /**
   * Character used to separate breadcrumb items
   */
  separator?: string;
  /**
   * Maximum number of items that will be displayed next to each other
   */
  maxItems?: number;
  /**
   * Number of items before some breadcrumbs will be hidden
   */
  itemsBeforeCollapse?: number;
  /**
   * Number of items that will be shown after the hidden breadcrumbs
   */
  itemsAfterCollapse?: number;
  /**
   * Shows three dots, that expand the breadcrumb items
   */
  expandable?: boolean;
  /**
   * Additional classes
   */
  className?: string;
}
