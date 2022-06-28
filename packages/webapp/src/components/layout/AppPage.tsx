import React from "react";
import { Outlet } from "react-router-dom";
import { Typography } from "../ui";

const AppPage = ({ children }: { children?: React.ReactNode }) => (
  <div className={"layout-app grid-app"}>
    <Typography>Header Section</Typography>
    <main className="main p-3">
      <div className={"content p-3"}>{children || <Outlet />}</div>
    </main>
  </div>
);

export default AppPage;
