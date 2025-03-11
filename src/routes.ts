import userDeleteRoute from "./routes/userDeleteRout";
import userGetRoute from "./routes/userGetroute";
import userRegisterRoute from "./routes/userRegisterRoute";

export const routes = [
  { path: "/api/users", route: userGetRoute },
  { path: "/api/users/delete", route: userDeleteRoute },
  { path: "/api/users/register", route: userRegisterRoute },
]