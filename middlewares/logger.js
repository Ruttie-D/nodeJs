import morgan from "morgan";
import chalk from "chalk";
import fs from 'fs';
import path from "path";

const getTodayDate = () => {
    const date = new Date();
    return date.toLocaleDateString('he-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\./g, '-');
}

const getTodayTime = () => {
    const date = new Date();
    return date.toLocaleTimeString('he-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const accessLogStream = fs.createWriteStream(path.join(logsDir, `${getTodayDate()}.txt`), { flags: 'a' });

export const consoleDisplay = morgan((tokens, req, res) => {
    return [
        chalk.yellow(getTodayDate()),
        chalk.yellow(getTodayTime()),
        chalk.cyan(tokens.method(req, res)),
        (tokens.status(req, res) >= 300 ? chalk.redBright : chalk.greenBright)(tokens.url(req, res)),
        (tokens.status(req, res) >= 300 ? chalk.redBright : chalk.greenBright)(tokens.status(req, res)),
        chalk.magenta(new Date().toLocaleDateString()),
        chalk.blue(new Date().toLocaleTimeString()),
        tokens['response-time'](req, res) + 'ms'
    ].join(' | ');
});

const fileDisplay = (tokens, req, res) => {
    return +res.statusCode < 400 ? "" :
        [
            getTodayDate(),
            getTodayTime(),
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens['response-time'](req, res) + 'ms',
        ].join(' | ');
}

const consoleLogger = morgan(consoleDisplay);

const fileLogger = morgan(fileDisplay, {
    stream: accessLogStream
});

export const morganLogger = (req, res, next) => {
    consoleLogger(req, res, (err) => {
        if (err) return next(err);
        fileLogger(req, res, next);
    });
}