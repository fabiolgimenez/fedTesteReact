import type { Route } from "./+types/home";
import  RegisterForm  from "../pages/registerForm/registerForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  return <RegisterForm />;
}

