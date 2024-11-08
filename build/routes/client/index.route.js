"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesClient = void 0;
const task_route_1 = require("./task.route");
const user_route_1 = require("./user.route");
const user_middleware_1 = require("../../middlewares/client/user.middleware");
const routesClient = (app) => {
    app.use("/tasks", user_middleware_1.requireAuth, task_route_1.tasksRoute);
    app.use("/users", user_route_1.usersRoute);
};
exports.routesClient = routesClient;
