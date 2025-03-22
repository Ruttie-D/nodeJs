import Card from "../models/Card.schema.js";

const userCards = async (userId) => {
    try {
        const myCards = await Card.find({ userId: userId });
        if (myCards.length === 0) {
            throw new Error("No cards found for this user.");
        }
        return myCards;
    } catch (err) {
        throw new Error(err.message);
    }
}

const getCardById = async (cardId) => {
    try {
        const card = await Card.findById(cardId);
        if (!card) {
            throw new Error("No card found with the provided ID");
        }
        return card;
    } catch (err) {
        throw new Error(`Error fetching card: ${err.message}`);
    }
}

const createCard = async (cardData) => {
    try {
        if (!cardData) {
            throw new Error("Card data is missing");
        }

        const newCard = new Card(cardData);

        if (!cardData.bizNumber) {
            newCard.bizNumber = Math.floor(100000 + Math.random() * 900000);
        }

        await newCard.save();

        return newCard;
    } catch (err) {
        throw new Error(`Failed to create card: ${err.message}`);
    }
}

const editCard = async (cardId, cardData) => {
    try {
        const card = await Card.findByIdAndUpdate(cardId, cardData, { new: true });

        if (!card) {
            throw new Error("Card not found for updating");
        }
        return card;
    } catch (err) {
        throw new Error(`Error updating card: ${err.message}`);
    }
}

const likeUnlike = async (cardId, userId) => {
    try {
        const card = await Card.findById(cardId);
        if (!card) {
            throw new Error("Card Was Not Found");
        }
        if (card.likes.includes(userId)) {
            card.likes = card.likes.filter(id => id.toString() !== userId);
        } else {
            card.likes.push(userId)
        }
        await card.save();
        return card;
    } catch (err) {
        throw new Error(err.message);
    }
}

const deleteCard = async (cardId) => {
    try {
        const card = await Card.findByIdAndDelete(cardId);
        if (!card) {
            throw new Error("Card Not Found");
        }
        return card;
    } catch (err) {
        throw new Error(err.message);
    }
}

export { userCards, getCardById, createCard, editCard, likeUnlike, deleteCard }