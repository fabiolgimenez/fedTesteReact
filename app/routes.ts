
import { index, route, type RouteConfig, type RouteConfigEntry } from "@react-router/dev/routes";
import { guardEntry } from "./utils/routeGuard";    


export default [
  guardEntry(index("routes/home.tsx")),
  route("/register", "routes/register.tsx"),
  route("/login", "routes/login.tsx"),
] satisfies RouteConfig;


