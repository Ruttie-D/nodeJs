import { verifyToken } from "../services/auth.service.js";

export const auth = async (req, res, next) => {
    try {
        const tokenFromClient = req.header("x-auth-token");
        const userData = verifyToken(tokenFromClient);
        if (!userData || !tokenFromClient) {
            throw new Error("Authentication failed: Token is missing or invalid. Please login to continue.");
        }
        req.user = userData;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}
