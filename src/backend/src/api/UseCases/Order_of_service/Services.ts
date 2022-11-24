import getCurrentLine from "get-current-line";
import { errors } from "../../constants/errors";
import { success } from "../../constants/success";
import { User } from "../../../database/entities/User";
import { AppDataSource } from "../../../database/data-source";
import { IOrder_of_service } from "./Interfaces/IOrder_of_service";
import { Order_of_service } from "../../../database/entities/Order_of_service";


// Instacing a new order of service object.
const order_of_service = new Order_of_service;
const user = new User;

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
		
	},

	async accept(user_id : string, order_of_service_id : string) {

		try {

			// Getting the order of service from database.
			let target_order_of_service = await order_of_service.getOrderOfServiceById({id: order_of_service_id});

			// Checking if the order of service exists.
			if(!target_order_of_service) {
				
				return {
					status: 404,
					error: {
						code: errors.order_of_service_not_found.code,
						title: errors.order_of_service_not_found.title,
						description: errors.order_of_service_not_found.description,
						source: {
							pointer: __filename,
							line: getCurrentLine().line
						}
					}
				};

			}

			// Checking if the order of service is already accepted.
			if (target_order_of_service.status != "pending") {
			
				return {
					status: 400,
					error: {
						code: errors.order_of_service_already_accepted.code,
						title: errors.order_of_service_already_accepted.title,
						description: errors.order_of_service_already_accepted.description,
						source: {
							pointer: __filename,
							line: getCurrentLine().line
						}
					}
				};


			}

			// Getting the user from database and associating it to the order of service.
			target_order_of_service.user = await user.getUserById({id: user_id});

			// Deleting the user password from response.
			delete target_order_of_service.user.password;

			// Setting the accepted date.
			target_order_of_service.accepted_at = new Date();

			// Updating the order of service status.
			target_order_of_service.status = "accepted";

			// Saving the modified order of service in database.
			target_order_of_service = await AppDataSource.getRepository(Order_of_service).save(target_order_of_service);

			// Returning the updated order of service.
			return {
				status: 201, 
				success: {
					code: success.order_of_service_accepted.code,
					title: success.order_of_service_accepted.title,
					data: target_order_of_service,
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
	
	},

	async finish(user_id : string, order_of_service_id : string) {

		try {

			// Getting the order of service from database.
			let target_order_of_service = await order_of_service.getOrderOfServiceById({id: order_of_service_id});

			// Checking if the order of service exists.
			if(!target_order_of_service) {
				
				return {
					status: 404,
					error: {
						code: errors.order_of_service_not_found.code,
						title: errors.order_of_service_not_found.title,
						description: errors.order_of_service_not_found.description,
						source: {
							pointer: __filename,
							line: getCurrentLine().line
						}
					}
				};

			}

			// Checking if the order of service still not accepted.
			if (target_order_of_service.status == "pending") {
			
				return {
					status: 400,
					error: {
						code: errors.order_of_service_still_not_accepted.code,
						title: errors.order_of_service_still_not_accepted.title,
						description: errors.order_of_service_still_not_accepted.description,
						source: {
							pointer: __filename,
							line: getCurrentLine().line
						}
					}
				};


			}

			// Checking if the order of service is already finished.
			if (target_order_of_service.status == "finished") {
			
				return {
					status: 400,
					error: {
						code: errors.order_of_service_already_finished.code,
						title: errors.order_of_service_already_finished.title,
						description: errors.order_of_service_already_finished.description,
						source: {
							pointer: __filename,
							line: getCurrentLine().line
						}
					}
				};


			}

			// Getting the user from database and associating it to the order of service.
			target_order_of_service.user = await user.getUserById({id: user_id});

			// Deleting the user password from response.
			delete target_order_of_service.user.password;

			// Setting the accepted date.
			target_order_of_service.finished_at = new Date();

			// Updating the order of service status.
			target_order_of_service.status = "finished";

			// Saving the modified order of service in database.
			target_order_of_service = await AppDataSource.getRepository(Order_of_service).save(target_order_of_service);

			// Returning the updated order of service.
			return {
				status: 201, 
				success: {
					code: success.order_of_service_finished.code,
					title: success.order_of_service_finished.title,
					data: target_order_of_service,
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