import * as React from "react";
import { Stack, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <Stack>
      <MuiLink component={Link} to="/projects">
        Projects
      </MuiLink>
    </Stack>
  );
};
