import { Router } from "express";
import { UserController } from "../api/UseCases/User/Controllers";

const router = Router();

// User controllers
router.post("/", (req, res, next) => UserController.store(req, res, next));
router.post("/auth", (req, res, next) => UserController.auth(req, res, next));

export default router;