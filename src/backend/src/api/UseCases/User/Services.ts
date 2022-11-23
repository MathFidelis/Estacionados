import { IUser } from "./Interfaces/IUser";
import getCurrentLine from "get-current-line";
import { errors } from "../../constants/errors";
import { success } from "../../constants/success";
import { User } from "../../../database/entities/User";
import { AppDataSource } from "../../../database/data-source";

// Instacing a new user object.
const user = new User;

export const UserService =  {

	async store(data : IUser) {

		try{
	
			// Checking if user is already registered.
			if(await user.isUserAlreadyRegistered(data)) {

				// If user is already registered, returning an error response.
				return {
					status: 400,
					error: {
						code: errors.user_already_registered.code,
						title: errors.user_already_registered.title,
						description: errors.user_already_registered.description,
						source: {
							pointer: __filename,
							line: getCurrentLine().line
						}
					}
				};

			} else {

				// If user isn't already registered, creating the user in database.
				const created_user = await user.store(data);

				// Cleaning up the encripted password from the database response.
				delete created_user.password;

				// Returning the created user with its account confirmation status.
				return {
					status: 201, 
					success: {
						code: success.user_created.code,
						title: success.user_created.title,
						data: created_user,
					}
				};

			}
	
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
	
	}

};