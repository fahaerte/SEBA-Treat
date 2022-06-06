import React from "react";
import { IBreadcrumbItem } from "./BreadcrumbItem/IBreadcrumbItem";

export type TBreadcrumbChildren =
  | React.ReactElement<IBreadcrumbItem>[]
  | React.ReactElement<IBreadcrumbItem>
  | undefined;

export interface IBreadcrumb {
  /**
   * This describes the character used to sseperate the different breadcrumbs
   */
  separator?: string;
  /**
   * This describes the maximum number of items that will be displayed next to each other
   */
  maxItems: number;
  /**
   * This describes the number of items before some breadcrumbs will be hidden
   */
  itemsBeforeCollapse?: number;
  /**
   * This describes the number of items that will be shown after the hidden breadcrumbs
   */
  itemsAfterCollapse?: number;
  /**
   * By clicking the three dots, the Breadcrumb expands
   */
  expandable?: boolean;
  /**
   * This describes additional classes added to the html element
   */
  className?: string;
  /**
   * Table contents
   */
  children: TBreadcrumbChildren;
}
