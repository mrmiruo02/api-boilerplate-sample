import express from "express";
import userGetRoute from "./routes/userGetroute.ts";
import userRegisterRoute from "./routes/userRegisterRoute.ts";
import { dbConfig } from "./config/db.config.ts";
import userDeleteRoute from "./routes/userDeleteRout.ts";
const PORT = dbConfig.config.port;
const app = express();

app.use(express.json());
app.use("/api/users", userGetRoute);
app.use("/api/users", userRegisterRoute);
app.use("/api/users", userDeleteRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
