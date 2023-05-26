import * as localforage from "localforage";

import { Project } from "./reducers/projects";
import { store } from './store';
import { init as initProjects } from "./reducers/projects";

const STORE_KEY = "REDUX_STORE";

export interface PersistedState {
  projects: Project[];
}

export const getPersistedState = async () => {
  return await localforage.getItem<PersistedState>(STORE_KEY);
};

export const initPersist = () => {
  store.subscribe(async () => {
    const state = store.getState();
    const persistedState = {
      projects: state.projects.projects,
    };
    await localforage.setItem(STORE_KEY, persistedState);
  });
};

getPersistedState().then((storedState) => {
  if (!storedState?.projects?.length) {
    return;
  }
  store.dispatch(initProjects(storedState.projects));
});
