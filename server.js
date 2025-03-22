import express from 'express';
import { Logger } from './middlewares/logger.js';
import router from './router/router.js';
import { badRequest } from './middlewares/badRequests.js';
import { serverErr } from './middlewares/serverErr.js';
import { connectService } from './services/db.service.js';
import User from './users/models/User.schema.js';
import userSeed from './users/initialData/initialUsers.json' with {type: 'json'};
import Card from './cards/models/Card.schema.js';
import cardSeed from './cards/initialData/initialCards.json' with {type: 'json'};

const app = express();
const PORT = 8080;

// A middleware to parse JSON, Maximum request body size is 5MB
app.use(express.json({ limit: '5mb' }));

// A custom middleware to log incoming requests
app.use(Logger);

// The router to the app
app.use(router);

// A middleware to handle 404 errors
app.use(badRequest);

// A middleware to handle server errors
app.use(serverErr);

// Start the server
app.listen(PORT, async () => {
    console.log(chalk.magentaBright(`Server is running on port ${PORT}`));
    await connectService();

    const usersFromDB = await User.find();
    const cardsFromDB = await Card.find();

    try {
        userSeed.forEach(async (user) => {
            if (usersFromDB.find((dbUser) => dbUser.email === user.email)) {
                return;
            }
            const newUser = new User(user);
            await newUser.save();
        });

        const cardsLength = await Card.find().countDocuments();
        if (cardsLength > 3) {
            return;
        }
        cardSeed.forEach(async (card) => {
            const newCard = new Card(card);
            await newCard.save();
        });

    } catch (err) {
        console.error(chalk.redBright('Failed to seed initial users'));
    }
});