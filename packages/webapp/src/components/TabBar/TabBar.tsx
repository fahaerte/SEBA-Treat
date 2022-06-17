import React from "react";
import { ITabBar } from "./ITabBar";
import { SCTab, SCTabBar } from "./styles";

export const TabBar = ({ className = "", tabs, color = "light" }: ITabBar) => (
  <SCTabBar
    className={[
      "w-100 d-flex flex-row",
      "justify-content-start",
      className,
    ].join(" ")}
  >
    {tabs?.map((tab, index) => (
      <SCTab
        color={color}
        key={`tab-item-${index}`}
        className={`${tab.className || ""} py-sm px-lg`}
        to={tab.to}
        end
      >
        {tab.children}
      </SCTab>
    ))}
  </SCTabBar>
);
