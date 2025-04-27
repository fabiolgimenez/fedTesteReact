import { index, type RouteConfigEntry } from "@react-router/dev/routes";
import React, { useEffect } from "react";
import { Navigate } from "react-router";



const RouteGuard = ({ path, index }: { path: string | undefined; index: boolean | undefined }) => {
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    console.log("Token:", token);
    if (!token) {
      path = "/login";
    } 
  }, []);
  path = index ? "/" : path;
  console.log("Path:", path);
  return path ? <Navigate to={path} replace /> : null;
};

export default RouteGuard;

export const guardEntry = (entry:RouteConfigEntry) => {

  const ret =  {
    file: entry.file,
    id: entry.id,
    index: entry.index,
    element: <RouteGuard path={entry.path} index={entry.index} />,
  };
  console.log("Entry:", entry ,"Ret:", ret);
  return ret;
}