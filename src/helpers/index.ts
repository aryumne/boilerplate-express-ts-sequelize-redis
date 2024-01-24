import AuthenticatedRequest from "../requests/authenticated.request";

export const extractToken = (req: AuthenticatedRequest) => {
  try {
    const getToken = req.headers.authorization?.replace("Bearer ", "");
    if (!getToken) throw new Error("Token missing from request");
    return getToken;
  } catch (error) {
    throw error;
  }
};
