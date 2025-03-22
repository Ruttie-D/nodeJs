export const isBusiness = (req, res, next) => {
    if (!req.user.isBusiness) {
        return res.status(403).json({ message: "Access denied: This feature is restricted to business accounts only." });
    }
    return next();
};
