import type { Request, Response } from "express";
import { 
    getWorkspace,
    createWorkspace as createWorkspaceService,
    listWorkspaces,
    updateWorkspace as updateWorkspaceService,
    deleteWorkspace as deleteWorkspaceService,
    restoreWorkspace as restoreWorkspaceService,
 } from "../services/workspace.service.js";
import { NotFoundError, ValidationError } from "../types/app-error.js";
import { getZodFieldsErrors } from "../utils/zod-error.js";
import {
    createWorkspaceSchema,
    updateWorkspaceSchema,
    workspaceIdParamSchema,
} from "../validator/workspace.validator.js";

const parseWorkspaceId = (params: Request["params"]) => {
    const parsed = workspaceIdParamSchema.safeParse(params);
    if (!parsed.success) {
        throw new ValidationError(
            "invalid workspace id",
            getZodFieldsErrors(parsed.error)
        )
    }
    return parsed.data;
}

const parseCreateBody = (body: unknown) => {
    const parsed = createWorkspaceSchema.safeParse(body);
    if (!parsed.success) {
        throw new ValidationError(
            "invalid create workspace body",
            getZodFieldsErrors(parsed.error)
        )
    }
    return parsed.data;
}

const parseUpdateBody = (body: unknown) => {
    const parsed = updateWorkspaceSchema.safeParse(body);
    if (!parsed.success) {
        throw new ValidationError(
            "invalid update workspace body",
            getZodFieldsErrors(parsed.error)
        )
    }
    return parsed.data;
}

export const listUserWorkspaces = async (req: Request, res: Response) => {
    const userId = req.session.user.id;
    const workspaces = await listWorkspaces(userId);
    res.status(200).json(workspaces);
}

export const getWorkspaceById = async (req: Request, res: Response) => {
    const { workspaceId } = parseWorkspaceId(req.params);
    const userId = req.session.user.id;
    const workspace = await getWorkspace(userId, workspaceId);
    res.status(200).json(workspace);
}

export const createWorkspace = async (req: Request, res: Response) => {
    const data = parseCreateBody(req.body);
    const userId = req.session.user.id;
    const workspace = await createWorkspaceService(userId, data);
    res.status(201).json(workspace);
}

export const updateWorkspace = async (req: Request, res: Response) => {
    const { workspaceId } = parseWorkspaceId(req.params);
    const data = parseUpdateBody(req.body);
    const userId = req.session.user.id;
    const workspace = await updateWorkspaceService(userId, workspaceId, data);
    res.status(200).json(workspace);
}

export const deleteWorkspace = async (req: Request, res: Response) => {
    const { workspaceId } = parseWorkspaceId(req.params);
    const userId = req.session.user.id;
    const workspace = await deleteWorkspaceService(userId, workspaceId);
    res.status(200).json(workspace);
}

export const restoreWorkspace = async (req: Request, res: Response) => {
    const { workspaceId } = parseWorkspaceId(req.params);
    const userId = req.session.user.id;
    const workspace = await restoreWorkspaceService(userId, workspaceId);
    res.status(200).json(workspace);
}