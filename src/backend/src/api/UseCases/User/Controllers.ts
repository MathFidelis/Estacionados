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

	}

};