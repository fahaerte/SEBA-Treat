import React from "react";
import { SCList } from "./styles";
import { IList, TListType } from "./IList";
import { ListItem } from "./index";
import { SkeletonSquare } from "../Skeleton";
import { TBootstrapPalette } from "../../../assets/theme/interfaces/TBootstrapPalette";

const ListColorContext = React.createContext<{
  color: TBootstrapPalette;
  listType: TListType;
  hoverable: boolean;
}>({
  color: "primary",
  listType: "list",
  hoverable: false,
});

export const useListColorContext = () => React.useContext(ListColorContext);

const List = ({
  ordered = false,
  color = "light",
  className = "",
  inline = false,
  children,
  subheader = false,
  outerBorder = true,
  isLoading = false,
  loadingItems = 2,
  skeletonProps = { color: color, width: "10rem" },
  listType = "list",
  hoverable = false,
  ...props
}: IList) => {
  const generateSkeleton = (): React.ReactNode => {
    const subheaderElement = subheader
      ? Array.isArray(children)
        ? children[0]
        : children
      : undefined;
    return (
      <>
        {subheaderElement}
        {[...Array(loadingItems)].map((value: undefined, index: number) => (
          <ListItem key={`li-${index}`}>
            <SkeletonSquare key={`li-skeleton-${index}`} {...skeletonProps} />
          </ListItem>
        ))}
      </>
    );
  };

  const getRenderType = () => {
    if (ordered) return "ol";
    if (listType === "link") return "div";
    return "ul";
  };

  return (
    <ListColorContext.Provider
      value={{ color: color, listType: listType, hoverable: hoverable }}
    >
      <SCList
        className={[
          "list-group",
          ordered ? "list-group-numbered" : "",
          outerBorder ? "" : "list-group-flush",
          `list-${color}`,
          subheader ? "subheader" : "",
          inline ? "list-group-horizontal" : "",
          className,
        ].join(" ")}
        {...props}
        as={getRenderType()}
      >
        {isLoading ? generateSkeleton() : children}
      </SCList>
    </ListColorContext.Provider>
  );
};

export default List;
