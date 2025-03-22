import { Router } from "express";
import { User } from "../models/User.schema.js"
import { registerNewUser, loginUser, getUserById } from "../services/usersDataAccess.service.js";
import { validate } from "../../middlewares/validation.js";
import RegisterSchema from "../validations/register.schema.js";
import LoginSchema from "../validations/login.schema.js";
import { generateToken } from "../../services/auth.service.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { isAdmin } from "../../middlewares/isAdmin.js";
import { isUser } from "../../middlewares/isUser.js";
import { isRegistered } from "../../middlewares/isRegistered.js";
import lodash from "lodash";
import { changeBusinessStatus, updateUser } from "../services/userDataAccess.service.js";
const { pick } = lodash;

const userRouter = Router();

//Authorization: all, Action: register user, Notice: unique email, Return: -
userRouter.post("/register", validate(RegisterSchema), async (req, res) => {
    try {
        const user = await registerNewUser(req.body);
        return res.status(201).res.json({ message: "New user has been created successfully", user });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

//Authorization: all, Action: login, Notice: -, Return: Encrypt token
userRouter.post("/login", validate(LoginSchema), async (req, res) => {
    try {
        const user = await loginUser(req.body);
        return res.json(generateToken(user));
    } catch (err) {

        if (err.message === "User with the provided email address was not found.") {
            return res.status(404).send(err.message); //not found
        }

        if (err.message === "Password is incorrect") {
            return res.status(401).send(err.message); // Unauthorized
        }

        return res.status(500).send(err.message);
    }
});

//Authorization: admin, Action: get all users, Notice: -, Return: array of users
userRouter.get("/", auth, isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        const displayUsers = users.map(user => pick(user, ["_id", "name", "image", "isBusiness", "email", "address", "phone"]));
        return res.status(200).json(displayUsers);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

//Authorization: the registered user or admin, Action: get user, Notice: -, Return: user
userRouter.get("/:id", auth, isUser, async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(404).send(err.message);
    }
});

//Authorization: the registered user, Action: edit user, Notice: -, Return: user
userRouter.put("/:id", auth, isRegistered(false), async (req, res) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

//Authorization: the registered user, Action: change isBusiness status, Notice: -, Return: user
userRouter.patch("/:id", auth, isUser, async (req, res) => {
    try {
        const user = await changeBusinessStatus(req.params.id);
        return res.status(200).json({ message: 'Business status changed successfully', user });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

//Authorization: the registered user or admin, Action: delete user, Notice: -, Return: deleted user
userRouter.delete("/:id", async (req, res) => {
    try {
        const user = await deleteUser(req.params.id);
        return res.status(200).json({ message: "User has been deleted successfully", user: user });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
});

export default userRouter;