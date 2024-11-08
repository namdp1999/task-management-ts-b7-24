import { Express } from "express";
import { tasksRoute } from "./task.route";

export const routesClient = (app: Express) => {

  app.use("/tasks", tasksRoute);

}