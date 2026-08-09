import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import { ZodError } from "zod";
import { AppError } from "../types/app-error.js";
import { getZodFieldsErrors } from "../utils/zod-error.js";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      errors: getZodFieldsErrors(err),
    });
  }

  if (err instanceof multer.MulterError) {
    const statusCode = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;

    return res.status(statusCode).json({
      message:
        err.code === "LIMIT_FILE_SIZE"
          ? "Uploaded file is too large"
          : err.message,
      code: err.code,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode as number).json({
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    message: "Internal server error",
  });
};