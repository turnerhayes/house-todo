import * as React from "react";
import { Link, PathMatch, useLocation, useMatches } from "react-router-dom";
import { Breadcrumbs, LinkProps as MuiLinkProps, Link as MuiLink, Typography } from "@mui/material";


import { AppRoute, routes } from "../../routes";

interface RouteMatch {
  route: AppRoute;
  match: (ReturnType<typeof useMatches>)[number];
}

function findRouteForId(id: string, appRoutes: AppRoute[] = routes): AppRoute | null {
  for (let route of appRoutes) {
    if (route.id === id) {
      return route;
    }
    if (route.children?.length) {
      const matchingRoute = findRouteForId(id, route.children);
      if (matchingRoute) {
        return matchingRoute;
      }
    }
  }
  return null;
}

const breadcrumbNameMap: Record<string, string> = {
  '/projects': 'Projects',
};

interface LinkRouterProps extends MuiLinkProps {
  to: string;
  replace?: boolean;
}

const BreadcrumbLink = (props: LinkRouterProps) => {
  return (<MuiLink {...props} component={Link} />);
}

export const SiteHeader = () => {
  const matches = useMatches();

  const routeMatches = matches.reduce((routeMatches, match) => {
    const route = findRouteForId(match.id);
    if (route && !route.index && route.id !== 'home') {
      routeMatches.push({
        route,
        match,
      });
    }
    return routeMatches;
  }, [] as RouteMatch[]);

  console.log('routeMatches:', routeMatches);

  return (
    <header>
      {
        routeMatches.length > 0 ? (
          <Breadcrumbs separator="›">
            <BreadcrumbLink underline="hover" color="inherit" to="/">
              Home
            </BreadcrumbLink>
            {
              routeMatches.map(({ route, match }, index) => {
                const last = index === routeMatches.length - 1;
                const to = match.pathname;
                const title = route?.getBreadcrumbTitle?.(match.params);

                return last ? (
                  <Typography color="text.primary" key={to}>
                    {title}
                  </Typography>
                ) : (
                  <BreadcrumbLink underline="hover" color="inherit" to={to} key={to}>
                    {title}
                  </BreadcrumbLink>
                );
              })
            }
          </Breadcrumbs>
        ) : null
      }
    </header>
  );
};
