import { User } from "../../src/database/entities/User";

declare global{
    namespace Express {
        interface Request {
            user : {
				id: string,
				email: string,
				role: "manager" | "attendant" | "valet"
			}
        }
    }
}