import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "./ui";
import { Header } from "./ui/Header/Header";

const AppLayout = ({ children }: { children?: React.ReactNode }) => (
  <div className={"layout-app grid-app"}>
    <Header />
    <main className="main p-3">
      <div className={"content bg-white"}>
        <Container>{children || <Outlet />}</Container>
      </div>
    </main>
  </div>
);
export default AppLayout;
