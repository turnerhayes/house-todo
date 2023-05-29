import { createSelector } from 'reselect';
import { RootState } from '../store';

export const getProjects = createSelector(
  (state: RootState) => state.projects,
  (projects) => projects.projects
);

export const getProjectById = createSelector(
  getProjects,
  (state: RootState, id: string) => id,
  (projects, id) => projects.find((project) => project.id === id)
);