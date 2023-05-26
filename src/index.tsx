import * as React from 'react';
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import App from './components/App';
import { ProjectList } from './components/ProjectList';
import "./styles.scss";
import { store } from './store/store';
import { initPersist } from './store/persist';
import { Project } from './components/Project/Project';
import { addProject, addStep } from './store/reducers/projects';

const slugify = (name: string) => {
  return name.toLowerCase().replace(/[^\d\w]/g, '-');
};

initPersist();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/projects",
    element: <ProjectList />,
    action: async ({ request }) => {
      if (request.method === 'POST') {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        if (!name) {
          throw new Response('', { status: 400 });
        }
        const id = slugify(name);
        store.dispatch(addProject({
          name,
          id,
          steps: [],
        }));
        return redirect(`/projects/${id}`);
      }

      throw new Response('', { status: 405 });
    },
  },
  {
    path: "/projects/:projectId",
    element: <Project />,
  },
  {
    path: "/projects/:projectId/step",
    action: async ({ request, params }) => {
      if (request.method === 'POST') {
        const formData = await request.formData();
        const step = formData.get("stepText") as string;
        const { projectId } = params;
        if (!projectId) {
          throw new Response('', { status: 404 });
        }
        const project = store.getState().projects.projects.find(
          (project) => project.id === projectId);
        if (!project) {
          throw new Response('', { status: 404 });
        }

        store.dispatch(addStep({ projectId, step }));
        return redirect(`/projects/${projectId}`);
      }

      throw new Response('', { status: 405 });
    },
  },
]);

const root = createRoot(document.getElementById("app")!);

root.render((
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
));
