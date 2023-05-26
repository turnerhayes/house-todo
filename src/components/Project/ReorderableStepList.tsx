import * as React from "react";
import { Step } from "../../store/reducers/projects";
import { ReorderableList } from "../ReorderableList/ReorderableList";
import { ListItemText } from "@mui/material";

export function ReorderableStepList({
  steps,
  onReorder,
}: {
  steps: Step[];
  onReorder: (reorderedSteps: Step[]) => void;
}) {
  return (
    <ReorderableList items={steps} onReorder={onReorder}>
      {
        (step: Step) => (
          <ListItemText>
            {step}
          </ListItemText>
        )
      }
    </ReorderableList>
  );
}
