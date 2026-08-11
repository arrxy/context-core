import { Router } from "express";
import { 
    listUserWorkspaces, 
    getWorkspaceById, 
    createWorkspace, 
    updateWorkspace,
    deleteWorkspace,
    restoreWorkspace 
} from "../controllers/workspce.controller.js";
import { requireAuth } from "../middleware/require-auth.middleware.js"
import { asyncHandler } from "../utils/async-handler.js";

export const workspaceRouter = Router();
workspaceRouter.use(asyncHandler(requireAuth));
workspaceRouter.get("/", asyncHandler(listUserWorkspaces));
workspaceRouter.get("/:workspaceId", asyncHandler(getWorkspaceById));
workspaceRouter.post("/", asyncHandler(createWorkspace));
workspaceRouter.put("/:workspaceId", asyncHandler(updateWorkspace));
workspaceRouter.delete("/:workspaceId", asyncHandler(deleteWorkspace));
workspaceRouter.post("/:workspaceId/restore", asyncHandler(restoreWorkspace));