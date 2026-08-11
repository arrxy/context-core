import prisma from "../lib/db.js";
import { omitUndefined } from "../utils/helper.js";
import type { CreateWorkspaceSchema, UpdateWorkspaceSchema } from "../validator/workspace.validator.js";

export const WorkspaceSelect = {
    id: true,
    title: true,
    description: true,
    icon: true,
    defaultModel: true,
    createdAt: true,
    updatedAt: true,
} as const;

export type WorkspaceRecord = {
    id: string,
    title: string,
    description: string | null,
    icon: string | null,
    defaultModel: string,
    createdAt: Date,
    updatedAt: Date,
};

export const findWorkspaceByUserId = async (userId: string) => {
    return await prisma.workspace.findMany({
        where: { userId, recordStatus: 1 },
        select: WorkspaceSelect,
    }) as WorkspaceRecord[];
};

export const findWorkspaceById = async (id: string) => {
    return await prisma.workspace.findUnique({
        where: { id, recordStatus: 1 },
        select: WorkspaceSelect,
    }) as WorkspaceRecord | null;
};

export const findWorkspaceByIdandUserId = async (workspaceId: string, userId: string) => {
    return await prisma.workspace.findUnique({
        where: { id: workspaceId, userId, recordStatus: 1 },
        select: WorkspaceSelect,
    }) as WorkspaceRecord | null;
};

export const createWorkspaceRecord = async (userId: string, data: CreateWorkspaceSchema) => {
    return await prisma.workspace.create({
        data: {
            userId,
            ...data,
        },
        select: WorkspaceSelect,
    });
};

export const updateWorkspaceRecord = async (userId: string, workspaceId: string, data: UpdateWorkspaceSchema) => {
    return await prisma.workspace.update({
        where: { id: workspaceId, userId, recordStatus: 1 },
        data: omitUndefined(data),
        select: WorkspaceSelect,
    });
};

export const deleteWorkspaceRecord = async (userId: string, workspaceId: string) => {
    return await prisma.workspace.update({
        where: { id: workspaceId, userId, recordStatus: 1 },
        data: { recordStatus: 0, deletedAt: new Date() },
    });
};

export const restoreWorkspaceRecord = async (userId: string, workspaceId: string) => {
    return await prisma.workspace.update({
        where: { id: workspaceId, userId, recordStatus: 0 },
        data: { recordStatus: 1, deletedAt: null },
    });
};