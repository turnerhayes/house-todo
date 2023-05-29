import * as React from "react";
import { Params, RouteObject } from "react-router-dom";
import { redirect } from "react-router-dom";

import { Project } from './components/Project/Project';
import { ProjectList } from "./components/ProjectList";
import { store } from "./store/store";
import { addProject, addStep } from './store/reducers/projects';
import { getProjectById } from "./store/selectors/projects";
import { useAppSelector } from "./store/hooks";
import { Home } from "./components/Home/Home";

export type AppRoute = RouteObject & {
  getBreadcrumbTitle?: (params: Params<string> | null) => React.ReactNode;
  children?: AppRoute[];
};

const ProjectDetailBreadcrumbTitle = ({ id }: { id: string; }) => {
  const project = useAppSelector((state) => getProjectById(state, id));
  console.log('project:', project);
  return (
    <>
      {project ? project.name : '...'}
    </>
  );
};

const slugify = (name: string) => {
  return name.toLowerCase().replace(/[^\d\w]/g, '-');
};

export const routes: AppRoute[] = [
  {
    id: "home",
    path: "/",
    element: <Home />
  },
  {
    path: "/projects",
    id: "projects-parent",
    getBreadcrumbTitle: () => {
      return 'Projects';
    },
    children: [
      {
        index: true,
        id: "project-list",
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
        path: ":projectId",
        id: "project-detail",
        element: <Project />,
        getBreadcrumbTitle: (params) => {
          if (!params) {
            throw new Error(`Unable to get breadcrumb title for project detail page: no params provided`);
          }
          const id = params.projectId;
          if (!id) {
            throw new Error(`Unable to get breadcrumb title for project detail page: no project ID provided`);
          }
          return (<ProjectDetailBreadcrumbTitle id={id} />);
        },
        children: [
          {
            path: "step",
            id: "step-change",
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
        ],
      },
    ],
  },
];