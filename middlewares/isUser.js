export const isUser = (req, res, next) => {
    if (req.user._id !== req.params.id && !req.user.isAdmin) {
        return res.status(403).json(
            { message: "Access denied! You are not authorized to perform this action." }
        );
    }
    return next();
}
