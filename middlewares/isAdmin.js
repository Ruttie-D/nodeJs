export const isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({
            message: "Access denied: Administrative privileges are required to access this resource."
        });
    }
    return next();
};
