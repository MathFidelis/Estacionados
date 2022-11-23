import { IUser } from "../../User/Interfaces/IUser";

export interface IOrder_of_service {
	id: string,
	vehicle_plate: string,
	vehicle_color: string,
	type: "entry" | "exit",
	status: "pending" | "accepted" | "finished",
	created_at?: Date,
	accepted_at?: Date,
	finished_at?: Date,
	updated_at?: Date,
	user?: IUser
}