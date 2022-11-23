import getCurrentLine from "get-current-line";
import { Order_of_service } from "../../../database/entities/Order_of_service";
import { errors } from "../../constants/errors";
import { success } from "../../constants/success";
import { IOrder_of_service } from "./Interfaces/IOrder_of_service";


// Instacing a new order of service object.
const order_of_service = new Order_of_service;

export const OrderOfServiceService = {

	async store(data : IOrder_of_service) {

		try {

			// Creating the order of service in database.
			const created_order_of_service = await order_of_service.store(data);

			// Returning the created user with its account confirmation status.
			return {
				status: 201, 
				success: {
					code: success.order_of_service_created.code,
					title: success.order_of_service_created.title,
					data: created_order_of_service,
				}
			};

		} catch(error) {

			return {
				status: 500,
				error: {
					code: errors.internal_server_error.code,
					title: errors.internal_server_error.title,
					description: errors.internal_server_error.description,
					source: {
						pointer: __filename,
						line: getCurrentLine().line
					}
				}
			};

		}
		
	}

};