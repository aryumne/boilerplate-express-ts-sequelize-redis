import { Request } from "express";

interface AuthenticatedRequest extends Request {
  user?: any; // Adjust the type based on what your decoded token contains
  token?: string;
}
export default AuthenticatedRequest;
