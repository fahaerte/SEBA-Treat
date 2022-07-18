import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "./ui";
import { Header } from "./ui/Header/Header";

const AppLayout = ({ children }: { children?: React.ReactNode }) => (
  <div className={"mb-5"}>
    <Header />
    <main className="p-3">
      <div>
        <Container>{children || <Outlet />}</Container>
      </div>
    </main>
  </div>
);
export default AppLayout;
