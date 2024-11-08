import { Express } from "express";
import { tasksRoute } from "./task.route";
import { usersRoute } from "./user.route";

export const routesClient = (app: Express) => {

  app.use("/tasks", tasksRoute);

  app.use("/users", usersRoute);

}