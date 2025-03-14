import express from "express";
import { dbConfig } from "./config/db.config.ts";
import { routes } from "./routes.ts";
import { authenticateToken, loginAuth, registerAuth } from "./authentication.ts";
const PORT = dbConfig.config.port;
const app = express();

app.use(express.json());
app.use('/api', registerAuth);
app.use('/api', loginAuth);
routes.forEach(({ path, route }) => {
  app.use(path, authenticateToken, route);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
