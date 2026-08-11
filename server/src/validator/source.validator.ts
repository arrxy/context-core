import { z } from "zod";

export const sourceTypeSchema = z.enum([
    "PDF", 
    "WEBSITE", 
    "YOUTUBE", 
    "TEXT", 
    "MARKDOWN"
]);

export const sourceStatusSchema = z.enum([
    "PENDING", 
    "PROCESSING", 
    "COMPLETED", 
    "FAILED"
]);

export const workspaceIdParamSchema = z.object({
    workspaceId: z.string().trim().min(1)
});

export const sourceIdParamSchema = z.object({
    workspaceId: z.string().trim().min(1),
    sourceId: z.string().trim().min(1)
})

export const listSourcesQuerySchema = z.object({
    q: z.string().trim().optional(),
    type: sourceTypeSchema.optional(),
    status: sourceStatusSchema.optional(),
});

export const createTextSourceSchema = z.object({
    type: z.literal("TEXT"),
    title: z.string().trim().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
    description: z.string().trim().optional(),
    content: z.string().trim().min(1, "Content is required")
});

export const createMarkdownSourceSchema = z.object({
    type: z.literal("MARKDOWN"),
    title: z.string().trim().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
    description: z.string().trim().optional(),
    content: z.string().trim().min(1, "Content is required")
});

export const createSourceSchema = z.discriminatedUnion("type", [
    createTextSourceSchema,
    createMarkdownSourceSchema
]);

export const importWebsiteSchema = z.object({
    type: z.literal("WEBSITE"),
    url: z.string().trim().url("Invalid URL"),
    title: z.string().trim().max(255, "Title must be less than 255 characters").optional(),
    description: z.string().trim().optional(),
});

export const importYoutubeSchema = z.object({
    type: z.literal("YOUTUBE"),
    url: z.string().trim().url("Invalid URL"),
    title: z.string().trim().max(255, "Title must be less than 255 characters").optional(),
    description: z.string().trim().optional(),
});

export const importPdfSchema = z.object({
    type: z.literal("PDF"),
    url: z.string().trim().url("Invalid URL"),
    title: z.string().trim().max(255, "Title must be less than 255 characters").optional(),
    description: z.string().trim().optional(),
});

export const reprocessSourceSchema = z.object({
    sourceIds: z.array(z.string().trim().min(1)).optional(),
});

export type SourceType = z.infer<typeof sourceTypeSchema>;
export type SourceStatus = z.infer<typeof sourceStatusSchema>;
export type WorkspaceIdParam = z.infer<typeof workspaceIdParamSchema>;
export type SourceIdParam = z.infer<typeof sourceIdParamSchema>;
export type ListSourcesQuery = z.infer<typeof listSourcesQuerySchema>;
export type CreateSource = z.infer<typeof createSourceSchema>;
export type ImportWebsite = z.infer<typeof importWebsiteSchema>;
export type ImportYoutube = z.infer<typeof importYoutubeSchema>;
export type ImportPdf = z.infer<typeof importPdfSchema>;
export type ReprocessSource = z.infer<typeof reprocessSourceSchema>;