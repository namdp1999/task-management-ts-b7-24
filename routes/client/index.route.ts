import { Express } from "express";
import { tasksRoute } from "./task.route";
import { usersRoute } from "./user.route";
import { requireAuth } from "../../middlewares/client/user.middleware";

export const routesClient = (app: Express) => {

  app.use("/tasks", requireAuth, tasksRoute);

  app.use("/users", usersRoute);

}