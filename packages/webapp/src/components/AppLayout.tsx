import React from "react";
import { Outlet } from "react-router-dom";
import { Typography } from "./ui";

const AppLayout = ({ children }: { children?: React.ReactNode }) => (
  <div className={"layout-app grid-app"}>
    <Typography>Header Section</Typography>
    <main className="main p-3">
      <div className={"content bg-white p-3"}>{children || <Outlet />}</div>
    </main>
  </div>
);
export default AppLayout;
