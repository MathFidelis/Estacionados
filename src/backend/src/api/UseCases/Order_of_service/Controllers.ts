import getCurrentLine from "get-current-line";
import { errors } from "../../constants/errors";
import { Request, Response, NextFunction } from "express";
import { OrderOfServiceService } from "./Services";

export const OrderOfServiceController = {

	async store(req : Request, res : Response, next : NextFunction) {

		try {

			const response = await OrderOfServiceService.store(req.body);

			return res.status(response.status).json(response);


		} catch (error) {

			return res.status(500).json({
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
			});

		}

	},

	async accept(req : Request, res : Response, next : NextFunction) {

		try {

			const response = await OrderOfServiceService.accept(req.user.id, req.params.id);

			return res.status(response.status).json(response);
		
		} catch(error) {

			return res.status(500).json({
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
			});


		}

	},

	async finish(req : Request, res : Response, next : NextFunction) {

		try {

			const response = await OrderOfServiceService.finish(req.params.id);

			return res.status(response.status).json(response);
		
		} catch(error) {

			return res.status(500).json({
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
			});


		}

	},

	async list(req : Request, res : Response, next : NextFunction) {

		// Getting the desired statuses from query params.
		let target_statuses = req.query.status;

		// If no target statuses was provided, then we will list all orders of service.
		if(!target_statuses) {

			target_statuses = "pending,accepted,finished";
			
		}

		// Converting the target statuses to an string object.
		const str_target_statuses = new String(target_statuses);

		// Splitting the target statuses by comma.
		const statuses_list = str_target_statuses.split(",");

		try {
		
			const response = await OrderOfServiceService.list(statuses_list);

			return res.status(response.status).json(response);
		
		} catch (error) {

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

};