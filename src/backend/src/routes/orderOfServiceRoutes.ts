import { Router } from "express";
import { OrderOfServiceController } from "../api/UseCases/Order_of_service/Controllers";
import { auth } from "../middlewares/auth";
import { isUserAttendantOrManager } from "../middlewares/isUserAttendantOrManager";
import { isUserValet } from "../middlewares/isUserValet";

const router = Router();

// User controllers
router.post("/", (req, res, next) => OrderOfServiceController.store(req, res, next));

// Change to permit only valet.
router.post("/accept/:id", (req, res, next) => auth(req, res, next), (req, res, next) => isUserAttendantOrManager(req, res, next), (req, res, next) => OrderOfServiceController.accept(req, res, next));
router.post("/finish/:id", (req, res, next) => auth(req, res, next), (req, res, next) => isUserAttendantOrManager(req, res, next), (req, res, next) => OrderOfServiceController.finish(req, res, next));
router.get("/", (req, res, next) => auth(req, res, next), (req, res, next) => isUserAttendantOrManager(req, res, next), (req, res, next) => OrderOfServiceController.list(req, res, next));
router.get("/:id", (req, res, next) => auth(req, res, next), (req, res, next) => isUserAttendantOrManager(req, res, next), (req, res, next) => OrderOfServiceController.listOneById(req, res, next));


export default router;