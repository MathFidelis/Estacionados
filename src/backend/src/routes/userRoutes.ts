import { Router } from "express";
import { UserController } from "../api/UseCases/User/Controllers";
import { auth } from "../middlewares/auth";
import { isUserAttendantOrManager } from "../middlewares/isUserAttendantOrManager";

const router = Router();

// User controllers
router.post("/", (req, res, next) => UserController.store(req, res, next));
router.post("/auth", (req, res, next) => UserController.auth(req, res, next));
router.get("/", (req, res, next) => auth(req, res, next), (req, res, next) => isUserAttendantOrManager(req, res, next), (req, res, next) => UserController.list(req, res, next));

export default router;