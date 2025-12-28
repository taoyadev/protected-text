import { NextResponse } from 'next/server';

// Standard API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
}

// Common error codes
export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  NOT_FOUND: 'NOT_FOUND',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

// Helper function to create JSON error responses
export function jsonError(
  code: string,
  message: string,
  status: number = 400,
): NextResponse<ApiResponse> {
  return NextResponse.json(
    { success: false, error: { code, message } },
    { status },
  );
}

// Helper function to create JSON success responses
export function jsonSuccess<T>(
  data?: T,
  status: number = 200,
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

// Predefined error responses
export function badRequest(
  message: string = 'Invalid request',
): NextResponse<ApiResponse> {
  return jsonError(ErrorCodes.BAD_REQUEST, message, 400);
}

export function unauthorized(
  message: string = 'Unauthorized',
): NextResponse<ApiResponse> {
  return jsonError(ErrorCodes.UNAUTHORIZED, message, 401);
}

export function notFound(
  message: string = 'Resource not found',
): NextResponse<ApiResponse> {
  return jsonError(ErrorCodes.NOT_FOUND, message, 404);
}

export function rateLimited(
  message: string = 'Too many requests',
): NextResponse<ApiResponse> {
  return jsonError(ErrorCodes.RATE_LIMITED, message, 429);
}

export function internalError(
  message: string = 'Internal server error',
): NextResponse<ApiResponse> {
  return jsonError(ErrorCodes.INTERNAL_ERROR, message, 500);
}

export function validationError(message: string): NextResponse<ApiResponse> {
  return jsonError(ErrorCodes.VALIDATION_ERROR, message, 400);
}
