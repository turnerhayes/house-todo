import * as React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { Project as ProjectComponent } from "../../src/components/Project/Project";
import { Project, addProject } from "../../src/store/reducers/projects";
import { store } from "../../src/store/store";
import { Provider } from "react-redux";

describe('Project component', () => {
  it('playground', () => {
    const project: Project = {
      id: 'test-project',
      name: 'Test Project',
      steps: [
        'Step 1',
        'Step 2',
        'Step 3',
      ],
    };

    const url = `/projects/${project.id}`;

    store.dispatch(addProject(project));

    cy.mount((
      <Provider store={store}>
        <MemoryRouter initialEntries={[
          url,
        ]}>
          <Routes>
            <Route element={<ProjectComponent />} path={"/projects/:projectId"} />
          </Routes>
        </MemoryRouter>
      </Provider>
    ));

    const step1 = cy.get('li').contains('Step 1');
    step1.drag('li:nth-child(2)', { force: true, });
  })
})