import { Router } from "express";
import { OrderOfServiceController } from "../api/UseCases/Order_of_service/Controllers";

const router = Router();

// User controllers
router.post("/", (req, res, next) => OrderOfServiceController.store(req, res, next));

export default router;