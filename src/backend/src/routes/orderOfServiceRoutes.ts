import { Router } from "express";
import { OrderOfServiceController } from "../api/UseCases/Order_of_service/Controllers";
import { auth } from "../middlewares/auth";
import { isUserAttendantOrManager } from "../middlewares/isUserAttendantOrManager";

const router = Router();

// User controllers
router.post("/", (req, res, next) => OrderOfServiceController.store(req, res, next));
router.post("/accept/:id", (req, res, next) => auth(req, res, next), (req, res, next) => isUserAttendantOrManager(req, res, next), (req, res, next) => OrderOfServiceController.accept(req, res, next));

export default router;