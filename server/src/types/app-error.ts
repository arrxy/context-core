export class AppError extends Error {
    constructor(
        public readonly statusCode: Number,
        message: string,
        public readonly details?: Record<string, unknown>,
    ) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.name = "AppError";
    }
}

export class NotFoundError extends AppError {
    constructor(message: string, details?: Record<string, unknown>) {
        super(404, message, details);
        this.name = "NotFoundError";
    }
}

export class BadRequestError extends AppError {
    constructor(message: string, details?: Record<string, unknown>) {
        super(400, message, details);
        this.name = "BadRequestError";
    }
}

export class ValidationError extends AppError {
    constructor(message: string, details?: Record<string, unknown>) {
        super(422, message, details);
        this.name = "ValidationError";
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string, details?: Record<string, unknown>) {
        super(401, message, details);
        this.name = "UnauthorizedError";
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string, details?: Record<string, unknown>) {
        super(403, message, details);
        this.name = "ForbiddenError";
    }
}

export class InternalServerError extends AppError {
    constructor(message: string, details?: Record<string, unknown>) {
        super(500, message, details);
        this.name = "InternalServerError";
    }
}

export class ConflictError extends AppError {
    constructor(message: string, details?: Record<string, unknown>) {
        super(409, message, details);
        this.name = "ConflictError";
    }
}