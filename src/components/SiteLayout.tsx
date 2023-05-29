import * as React from "react";
import { SiteHeader } from "./SiteHeader/SiteHeader";
import { Outlet } from "react-router-dom";

export const SiteLayout = () => {
  return (
    <div>
      <SiteHeader />
      <Outlet />
    </div>
  );
};
