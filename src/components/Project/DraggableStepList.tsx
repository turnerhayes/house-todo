import * as React from "react";
import { ListItemIcon, ListItemText } from "@mui/material";

import { useAppDispatch } from "../../store/hooks";
import { Project, Step, setSteps } from "../../store/reducers/projects";
import { DraggableList } from "../DraggableList/DraggableList";
import { DragHandle } from "@mui/icons-material";


export const DraggableStepList = ({ project }: { project: Project; }) => {
  const dispatch = useAppDispatch();

  const handleStepsReordered = React.useCallback((reorderedSteps: Step[]) => {
    dispatch(setSteps({
      projectId: project.id,
      steps: reorderedSteps,
    }));
  }, []);

  return (
    <DraggableList items={[...project.steps]} onItemsReordered={handleStepsReordered}>
      {(item: Step) => (
        <>
          <ListItemIcon>
            <DragHandle />
          </ListItemIcon>
          <ListItemText primary={item} />
        </>
      )}
    </DraggableList>
  );
};