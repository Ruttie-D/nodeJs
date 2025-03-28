import { Router } from "express";
import userRouter from "../users/routes/users.routes.js";
import cardRouter from "../cards/routes/cards.routes.js";
import { auth } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import path from 'path';

const router = Router();

router.get("/", (req, res) => {
    throw new Error('Error');
});

//for admins to see the logs dates according to postman
router.get("/log/:date", auth, isAdmin, (req, res) => {
    try {
        const { date } = req.params;
        return res.sendFile(path.join(process.cwd(), 'logs', `${date}.txt`));
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.use("/users", userRouter);

router.use("/cards", cardRouter);

export default router;