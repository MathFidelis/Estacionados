// Importing all required libraries.
import { UserService } from "./Services";
import getCurrentLine from "get-current-line";
import { errors } from "../../constants/errors";
import { Request, Response, NextFunction } from "express";

export const UserController = {

	async store(req : Request, res : Response, next : NextFunction) {
		
		try {

			const response = await UserService.store(req.body);

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

	async auth(req : Request, res : Response, next : NextFunction) {

		try {

			const response = await UserService.auth(req.body);

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

		// Getting the desired roles from query params.
		let target_roles = req.query.role;

		// If no target roles was provided, then we will list all roles.
		if(!target_roles) {

			target_roles = "manager,attendant,valet";
			
		}

		// Converting the target roles to an string object.
		const str_target_roles = new String(target_roles);

		// Splitting the target roles by comma.
		const target_roles_ls = str_target_roles.split(",");

		try {
		
			const response = await UserService.list(target_roles_ls);

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