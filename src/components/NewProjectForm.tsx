import { Button, Stack, TextField } from "@mui/material";
import * as React from "react";
import { Form } from "react-router-dom";

export const NewProjectForm = () => {
  return (
    <Form method="post" action="/projects">
      <Stack spacing={1}>
        <TextField name="name" label="Name" />
        <Button variant="contained" type="submit">
          Create
        </Button>
      </Stack>
    </Form>
  );
};