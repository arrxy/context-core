import { flattenError, type ZodError } from "zod";

export const getZodFieldsErrors = (error: ZodError) => {
    return flattenError(error).fieldErrors;
};