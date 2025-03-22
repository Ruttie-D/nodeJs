import User from "../models/User.schema.js"
import { comparePassword, hashPassword } from "./password.service.js";
import lodash from "lodash";
const { pick } = lodash;
import blockUser from "../models/attemptLogin.schema.js"

const registerNewUser = async (userData) => {
    try {
        const checkEmail = await User.findOne({ email: userData.email });
        if (checkEmail) {
            throw new Error("This email is already registered. Please log in.");
        }
        const newUser = new User(userData);
        newUser.password = await hashPassword(newUser.password);
        await newUser.save();

        if (!userData) {
            throw new Error("Failed to create user.");
        }
        const returnUser = pick(newUser.toObject(), ["_id", "name", "image", "isBusiness", "email", "address", "phone"]);
        return returnUser;
    } catch (err) {
        throw new Error(err.message);
    }
}

const loginUser = async (userData) => {
    try {
        const user = await User.findOne({ email: userData.email });
        if (!user) {
            throw new Error("User with the provided email address was not found.");
        }

        let usersBlocked = await blockUser.findOne({ userId: user._id.toString() });

        if (usersBlocked && usersBlocked.attempt >= 3) {
            const timeDifference = new Date() - new Date(usersBlocked.lastAttempt);
            const hoursPassed = timeDifference / (1000 * 60 * 60);

            if (hoursPassed <= 24) {
                throw new Error(
                    "Multiple failed login attempts detected. Your account is temporarily locked. Please try again after 24 hours."
                );
            }

            await usersBlocked.findByIdAndDelete(usersBlocked._id);
            usersBlocked = null;
        }

        const checkPassword = await comparePassword(userData.password, user.password);
        if (!checkPassword) {
            if (!usersBlocked) {
                usersBlocked = new blockUser({
                    userId: user._id,
                    attempt: 1,
                    lastAttempt: new Date(),
                });
                await usersBlocked.save();
            } else {
                usersBlocked.attempt++;
                usersBlocked.lastAttempt = new Date();
                await usersBlocked.save();
            }

            throw new Error("Invalid password. Please try again.");
        }

        if (usersBlocked) {
            await usersBlocked.findByIdAndDelete(usersBlocked._id);
        }

        return user;
    } catch (err) {
        console.error("Login process encountered an error:", err.message);
        throw new Error(err.message);
    }
}

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return pick(user, ["_id", "name", "image", "isBusiness", "email", "address", "phone"]);

    } catch (err) {
        throw new Error(err.message);
    }
}

const updateUser = async (userId, userData) => {
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: userData },
            { new: true, runValidators: true }
        );
        if (!user) {
            throw new Error("User Not Found");
        }
        const returnUser = pick(user, ["_id", "name", "image", "isBusiness", "email", "address", "phone",
        ]);
        return returnUser;
    } catch (err) {
        throw new Error(err.message);
    }
}

const changeBusinessStatus = async (userId) => {
    try {
        const user = await User.findById(userId);
        user.isBusiness = !user.isBusiness;
        await user.save();
        const returnUser = pick(user, ["_id", "name", "image", "isBusiness", "email", "address", "phone"]);
        return returnUser;
    } catch (err) {
        throw new Error(err.message);
    }
}

const deleteUser = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            throw new Error("User Not Found");
        }
        const returnUser = pick(user, ["_id", "name", "image", "isBusiness", "email", "address", "phone"]);
        return res.status(200).json(returnUser);
    } catch (err) {
        throw new Error(err.message);
    }
}

export { registerNewUser, loginUser, getUserById, updateUser, changeBusinessStatus, deleteUser }