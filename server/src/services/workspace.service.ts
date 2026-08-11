import {
    findWorkspaceByUserId,
    findWorkspaceById,
    findWorkspaceByIdandUserId,
    createWorkspaceRecord,
    updateWorkspaceRecord,
    deleteWorkspaceRecord,
    restoreWorkspaceRecord
} from "../repository/workspace.repository.js"
import { NotFoundError } from "../types/app-error.js"
import type { CreateWorkspaceSchema, UpdateWorkspaceSchema } from "../validator/workspace.validator.js"

export const listWorkspaces = async (userId: string) => {
    return await findWorkspaceByUserId(userId)
}

export const getWorkspace = async (userId: string, workspaceId: string) => {
    const workspace = await findWorkspaceByIdandUserId(workspaceId, userId)
    if (!workspace) {
        throw new NotFoundError("Workspace not found");
    }
    return workspace;
}

export const createWorkspace = async (userId: string, data: CreateWorkspaceSchema) => {
    return await createWorkspaceRecord(userId, data)
}

export const updateWorkspace = async (userId: string, workspaceId: string, data: UpdateWorkspaceSchema) => {
    return await updateWorkspaceRecord(userId, workspaceId, data)
}

export const deleteWorkspace = async (userId: string, workspaceId: string) => {
    return await deleteWorkspaceRecord(userId, workspaceId)
}

export const restoreWorkspace = async (userId: string, workspaceId: string) => {
    return await restoreWorkspaceRecord(userId, workspaceId)
}