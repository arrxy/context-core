import type { Express } from "express";
import { workspaceRouter } from "./workspace.route.js";

export const registerRoutes = (app: Express): void => {
    app.use("/api/workspaces", workspaceRouter);
}