import { Router } from "express";
import { changeTheme, getTheme } from "../controller/themeController.js";

const themeRouter = Router();

themeRouter.get("/", getTheme);
themeRouter.patch("/changeTheme", changeTheme);

export default themeRouter;
