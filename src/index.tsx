import * as React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import "./styles.scss";
import { store } from './store/store';
import { initPersist } from './store/persist';
import { SiteLayout } from './components/SiteLayout';
import { routes } from "./routes";


initPersist();

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: routes,
  },
]);

const root = createRoot(document.getElementById("app")!);

root.render((
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
));
