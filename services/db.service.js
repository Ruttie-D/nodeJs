import { connect } from 'mongoose';
import chalk from 'chalk';

// Load environment variables from.env file
const db = process.env.ENV === "dev" ? process.env.MONGO_LOCAL : process.env.MONGO_ATLAS;
const name = db === process.env.MONGO_LOCAL ? "local" : "atlas";

export const connectService = async () => {
    try {
        await connect(db);
        console.log(chalk.bgMagenta(`Connected to MongoDB ${name}`));
    } catch (e) {
        console.error(chalk.redBright(`Failed to connect to MongoDB. Error: ${e}`));
    }
}