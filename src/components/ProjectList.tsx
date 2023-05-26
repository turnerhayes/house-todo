import * as React from "react";
import { List, Button, ListItemButton, ListItemText, Accordion, AccordionSummary, AccordionDetails, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addProject } from "../store/reducers/projects";
import { NewProjectForm } from "./NewProjectForm";

export const ProjectList = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.projects);
  const onAddClick = React.useCallback(() => {
    dispatch(addProject({
      id: `project_${projects.length + 1}`,
      name: `Project ${projects.length + 1}`,
      steps: [],
    }));
  }, [projects]);

  return (
    <Stack>
      <Accordion>
        <AccordionSummary>Add project</AccordionSummary>
        <AccordionDetails>
          <NewProjectForm />
        </AccordionDetails>
      </Accordion>
      <List>
        {projects.map((project, index) => (
          <ListItemButton key={index} component={Link} to={`/projects/${project.id}`}>
            <ListItemText primary={project.name} />
          </ListItemButton>
        ))}
      </List>
    </Stack>
  );
}
