import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Step = string;

export interface Project {
  id: string;
  name: string;
  steps: Step[];
}

export interface ProjectsState {
  projects: Project[];
}

const initialState: ProjectsState = {
  projects: [],
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<Project[]>) => {
      state.projects.push(...action.payload);
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const projectIndex = state.projects.findIndex((project) => project.id === action.payload.id);
      if (projectIndex < 0) {
        throw new Error(`Project ${action.payload.id} does not exist`);
      }

      state.projects[projectIndex] = {
        ...state.projects[projectIndex],
        ...action.payload,
      };
    },
    addStep: (state, { payload: { projectId, step, } }:
      PayloadAction<{
        projectId: string;
        step: Step;
      }>
    ) => {
      const project = state.projects.find(
        (project) => project.id === projectId);
      if (!project) {
        return;
      }

      project.steps.push(step);
    },
    setSteps: (state, { payload: { projectId, steps } }: PayloadAction<{
      projectId: String;
      steps: Step[];
    }>) => {
      const project = state.projects.find((project) => project.id === projectId);

      if (!project) {
        return;
      }

      project.steps = steps;
    }
  },
});

export const { init, addProject, updateProject, addStep, setSteps } = projectsSlice.actions;

export const reducer = projectsSlice.reducer;