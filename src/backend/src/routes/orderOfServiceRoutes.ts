import { Router } from "express";
import { OrderOfServiceController } from "../api/UseCases/Order_of_service/Controllers";
import { auth } from "../middlewares/auth";
import { isUserAttendantOrManager } from "../middlewares/isUserAttendantOrManager";

const router = Router();

// User controllers
router.post("/", (req, res, next) => OrderOfServiceController.store(req, res, next));
router.post("/accept/:id", (req, res, next) => auth(req, res, next), (req, res, next) => isUserAttendantOrManager(req, res, next), (req, res, next) => OrderOfServiceController.accept(req, res, next));
router.post("/finish/:id", (req, res, next) => auth(req, res, next), (req, res, next) => isUserAttendantOrManager(req, res, next), (req, res, next) => OrderOfServiceController.finish(req, res, next));

router.get("/:status", (req, res, next) => auth(req, res, next), (req, res, next) => isUserAttendantOrManager(req, res, next), (req, res, next) => OrderOfServiceController.index(req, res, next));


// router.get("/getAll", (req, res, next) => auth(req, res, next), (req, res, next) => isUserAttendantOrManager(req, res, next), (req, res, next) => OrderOfServiceController.getAll(req, res, next));
// router.get("/getAllPending", (req, res, next) => auth(req, res, next), (req, res, next) => isUserAttendantOrManager(req, res, next), (req, res, next) => OrderOfServiceController.getAllPending(req, res, next));


export default router;