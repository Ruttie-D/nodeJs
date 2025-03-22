import { Router } from "express";
import { Card } from '../models/Card.schema.js';
import { auth } from "../../middlewares/auth.middleware.js";
import { isBusiness } from '../../middlewares/isBusiness.js';
import { isRegistered } from "../../middlewares/isRegistered.js";
import { isUser } from "../../middlewares/isUser.js";
import { createCard, deleteCard, editCard, getCardById, likeUnlike, userCards } from "../services/cardsDataAccess.service.js";

const router = Router();

//Authorization: all, Action: all cards, Return: -
router.get("/", async (req, res) => {
    try {
        const cards = await Card.find();
        return res.status(200).json(cards);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

//Authorization: the registered user, Action: user cards, Return: array of cards
router.get("/my-cards", auth, async (req, res) => {
    try {
        const myCards = await userCards(req.user._id);
        return res.status(200).json(myCards);
    } catch (err) {
        return res.status(404).json({ message: "No cards found for this user." });
    }
});

//Authorization: all, Action: get card by id, Return: card
router.get("/:id", async (req, res) => {
    try {
        const card = await getCardById(req.params.id);
        return res.status(200).json(card);
    } catch (err) {
        return res.status(404).send(err.message);
    }
});

//Authorization: business user, Action: create new card, Return: card
router.post("/", auth, isBusiness, async (req, res) => {
    try {
        const cardData = { ...req.body, userId: req.user._id };
        const card = await createCard(cardData);
        return res.status(201).json(card);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

//Authorization: card owner, Action: edit card, Return: card
router.put("/:id", auth, isRegistered(true), async (req, res) => {
    try {
        const card = await editCard(req.params.id, req.body);
        return res.status(200).json(card);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

//Authorization: a registered user, Action: like card, Return: card
router.patch("/:id", auth, async (req, res) => {
    try {
        const card = await likeUnlike(req.params.id, req.user._id);
        return res.status(200).json(card);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

//Authorization: cards owner or admin, Action: delete card, Return: deleted card
router.delete("/:id", auth, isUser, async (req, res) => {
    try {
        const card = await deleteCard(req.params.id);
        return res.json({ message: "The card has been successfully deleted", card });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
});

export default router;