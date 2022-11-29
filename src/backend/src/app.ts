// Importing all required libraries.
import "reflect-metadata";
import express  from "express";
import cors from "cors";

// Importing all required routes.
import userRoutes from "./routes/userRoutes";
import orderOfServiceRoutes from "./routes/orderOfServiceRoutes";
import rootRoutes from "./routes/rootRoutes";

// Instacing the app.
const app = express();

// Only looks at requests where Content-Type header matches json.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting up cors to allow all origins.
app.use(cors());

// Setting up the application routes.
app.use("/api/v1", rootRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/order-of-service", orderOfServiceRoutes);

// Exporting app.
export { app };
