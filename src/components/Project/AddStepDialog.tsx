import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogProps, Button } from "@mui/material"

import { AddStepForm, AddStepFormParams } from "./AddStepForm";

export const AddStepDialog = ({ project, open, onSubmit }: AddStepFormParams & DialogProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle>
        Add a step
      </DialogTitle>
      <DialogContent>
        <AddStepForm project={project} onSubmit={onSubmit} />
      </DialogContent>
      <DialogActions>
        <Button variant="contained">Cancel</Button>
        <Button type="submit" variant="contained">Add</Button>
      </DialogActions>
    </Dialog>
  )
};