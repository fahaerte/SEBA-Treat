import React from "react";
import { IListItem } from "./ListItem/IListItem";
import { ISkeletonConfig } from "../Skeleton/ISkeleton";
import { IComponentColorBase } from "../../assets/theme/types/IComponentColorBase";

export const AListType = ["list", "link"] as const;
export type TListType = typeof AListType[number];

export type TListChildren =
  | React.ReactElement<IListItem>[]
  | React.ReactElement<IListItem>
  | undefined;

export interface IList extends Omit<IComponentColorBase, "children"> {
  /**
   * Children of the component
   * defined to prevent errors if List has only one or no item
   */
  children?: TListChildren;
  /**
   * Whether it is an inline list
   */
  inline?: boolean;
  /**
   * If true, the first li element is styled like a subheader
   */
  subheader?: boolean;
  /**
   * If true, the list is wrapped with an outer border
   */
  outerBorder?: boolean;
  /**
   * Whether the content is loading
   */
  isLoading?: boolean;
  /**
   * number of list item skeletons to be displayed
   */
  loadingItems?: number;
  /**
   * Properties to configure SkeletonSquare
   */
  skeletonProps?: ISkeletonConfig;
  /**
   * Whether the list is ordered or unordered (ol or ul)
   */
  ordered?: boolean;
  /**
   * Whether the list's children should be link-components
   */
  listType?: TListType;
  /**
   * Whether the listitem is hoverable
   */
  hoverable?: boolean;
}
