import * as React from "react";
import { shallowEqual } from "react-redux";
import { Button, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Project, Step, setSteps, updateProject } from "../../store/reducers/projects";
import { DraggableStepList } from "./DraggableStepList";
import { AddStepDialog } from "./AddStepDialog";
import { NoProject } from "./NoProject";
import { ReorderableStepList } from "./ReorderableStepList";


const Project = () => {
  const [addStepDialogIsOpen, setAddStepDialogIsOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const openAddStepDialogHandler = React.useCallback(() => {
    setAddStepDialogIsOpen(true);
  }, []);

  const handleAddStepFormSubmit = React.useCallback(() => {
    setAddStepDialogIsOpen(false);
  }, []);

  if (!projectId) {
    return (<NoProject />);
  }

  const project = useAppSelector(
    (state) => state.projects.projects.find(({ id }) => id === projectId),
    (project1, project2) => {
      if (project1 === project2) {
        return true;
      }
      if (project1 && project2) {
        if (project1.id !== project2.id) {
          return false;
        }
        if (project1.name !== project2.name) {
          return false;
        }
        if (JSON.stringify(project1.steps) !== JSON.stringify(project2.steps)) {
          return false;
        }
      }
      if ((!project1 && project2) || (project1 && project2)) {
        return false;
      }
      return true;
    }
  );

  if (!project) {
    return (<NoProject />);
  }

  const onReorder = (reorderedSteps: Step[]): void => {
    dispatch(updateProject({
      ...project,
      steps: reorderedSteps,
    }))
    // dispatch(setSteps({
    //   projectId: project.id,
    //   steps: reorderedSteps,
    // }));
  };

  return (
    <Stack>
      <header>
        <Typography variant="h2">
          {project.name}
        </Typography>
      </header>
      <AddStepDialog
        project={project}
        open={addStepDialogIsOpen}
        onSubmit={handleAddStepFormSubmit}
      />
      <Stack>
        <Button variant="contained" onClick={openAddStepDialogHandler}>
          Add step
        </Button>
        <ReorderableStepList steps={project.steps} onReorder={onReorder} />
        {/* <DraggableStepList project={project} /> */}
      </Stack>
    </Stack>
  );
};

export { Project };
