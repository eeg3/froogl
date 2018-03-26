import Home from "./components/Home.vue";
import Signin from "./components/Signin.vue";
import Register from "./components/Register.vue";
import Header from "./components/Header.vue";

export const routes = [
  { path: "", name: "home", component: Home },
  { path: "/signin", component: Signin },
  { path: "/register", component: Register },
  { path: "*", redirect: "/" }
];
