import * as React from "react";
import { Form } from "react-router-dom";
import { Stack, TextField } from "@mui/material";

import { Project } from "../../store/reducers/projects";


export interface AddStepFormParams {
  project: Project;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}


export const AddStepForm = ({ project, onSubmit }: AddStepFormParams) => {
  return (
    <Form method="post" action={`/projects/${project.id}/step`} onSubmit={onSubmit}>
      <Stack>
        <TextField name="stepText" label="Step" autoFocus={true} />
      </Stack>
    </Form>
  );
};
