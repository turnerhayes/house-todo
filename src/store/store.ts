import { Action, Middleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { reducer as projectsReducer } from "./reducers/projects";

const logMiddleware: Middleware = store => next => action => {
  console.log('dispatching action', action);
  return next(action);
};

const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
  middleware: [
    logMiddleware,
  ]
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export { store };