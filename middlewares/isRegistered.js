import CardSchema from "../cards/models/Card.schema.js";

export const isCardOwner = (isCard) => async (req, res, next) => {
    const card = await CardSchema.findById(req.params.id);

    if (isCard && (!card || req.user._id !== card.userId)) {
        return res.status(403).json({
            message: "You are not authorized to perform this action, as you are not the card owner."
        });
    }

    if (!isCard && req.user._id !== req.params.id) {
        return res.status(403).json({
            message: "You are not authorized to perform this action, as you are not the authorized user."
        });
    }

    return next();
}
