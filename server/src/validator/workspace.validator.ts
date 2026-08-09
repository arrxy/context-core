import { z } from "zod";
const CHAT_MODELS = ["gpt-4o", "gpt-4o-mini", "gpt-3.5-turbo", "gpt-3.5-turbo-1106"] as const;

export const createWorkspaceSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
    description: z.string().trim().max(1000, "Description must be less than 1000 characters").optional().default(""),
    icon: z.string().trim().max(8).optional().default(""),
    defaultModel: z.enum(CHAT_MODELS).default("gpt-4o-mini"),
});

export const updateWorkspaceSchema = createWorkspaceSchema.partial().refine(
    data => Object.keys(data).length > 0,
    { message: "At least one field is required" }
);

export type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceSchema = z.infer<typeof updateWorkspaceSchema>;