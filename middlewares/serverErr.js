import chalk from "chalk";

export const serverErr = ((err, req, res) => {
    res.status(500).send(`Internal Server Error ${chalk.redBright(err.message)}`);
});