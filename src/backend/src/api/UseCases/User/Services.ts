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
	
	},

	async auth(data : {email : string, password : string}) {
		
		try {

			// Getting the user by its email address.
			const user_found = await AppDataSource.getRepository(User).findOneBy({email: data.email});

			// Checking if user exists.
			if(!user_found) {

				// If user doesn't exists, returning an error response.
				return {
					status: 404,
					error: {
						code: errors.user_not_found.code,
						title: errors.user_not_found.title,
						description: errors.user_not_found.description,
						source: {
							pointer: __filename,
							line: getCurrentLine().line
						}
					}
				};

			} else {

				// If user exists, checking if the received password is the same as the user password.
				if(!await user_found.checkPassword(data.password)) {

					// If the received password isn't the same as the user password, returning an error response.
					return {
						status: 401,
						error: {
							code: errors.invalid_password.code,
							title: errors.invalid_password.title,
							description: errors.invalid_password.description,
							source: {
								pointer: __filename,
								line: getCurrentLine().line
							}
						}
					};

				} else {

					// Deleting user found password from the response.
					delete user_found.password;

					// Generating a new token for the user.
					const token = await user_found.generateToken();

					// If the received password is the same as the user password, returning the user with the generated token.
					return {
						status: 200,
						success: {
							code: success.user_authenticated.code,
							title: success.user_authenticated.title,
							data: {
								id: user_found.id,
								email: user_found.email,
								role: user_found.role,
								token: token,
							}
						}
					};

				}

			}

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

	async list(target_roles : string[]) {

		try {

			// Getting all orders of service from database.
			const users = await user.list(target_roles);

			// Returning all orders of services.
			return {
				status: 201, 
				success: {
					code: success.users_got.code,
					title: success.users_got.title,
					data: users,
				}
			};
	


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

	async listOneById(user_id : string) {

		try {

			// Getting the order of service from database.
			const target_user = await user.getUserById({id: user_id});

			// Checking if the order of service exists.
			if(!target_user) {
				
				return {
					status: 404,
					error: {
						code: errors.user_not_found.code,
						title: errors.user_not_found.title,
						description: errors.user_not_found.description,
						source: {
							pointer: __filename,
							line: getCurrentLine().line
						}
					}
				};

			}

			// Returning the order of service.
			return {
				status: 201, 
				success: {
					code: success.user_got.code,
					title: success.user_got.title,
					data: target_user,
				}
			};

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

	async setRFID(user_id : string, rfid : string) {

		if(!user_id) {

			return {
				status: 400,
				error: {
					code: errors.no_user_id_provided.code,
					title: errors.no_user_id_provided.title,
					description: errors.no_user_id_provided.description,
					source: {
						pointer: __filename,
						line: getCurrentLine().line
					}
				}
			};
		
		}

		if (!rfid) {

			return {
				status: 400,
				error: {
					code: errors.no_rfid_provided.code,
					title: errors.no_rfid_provided.title,
					description: errors.no_rfid_provided.description,
					source: {
						pointer: __filename,
						line: getCurrentLine().line
					}
				}
			};
		
		}

		try {

			// Getting the user from database.
			const target_user = await user.getUserById({id: user_id});

			// Checking if the user exists.
			if(!target_user) {
				
				return {
					status: 404,
					error: {
						code: errors.user_not_found.code,
						title: errors.user_not_found.title,
						description: errors.user_not_found.description,
						source: {
							pointer: __filename,
							line: getCurrentLine().line
						}
					}
				};

			}

			// Updating the user rfid.
			const updatedUser = await user.setRFID(user_id, rfid);

			// Returning the updated user.
			return {
				status: 200, 
				success: {
					code: success.rfid_set.code,
					title: success.rfid_set.title,
					data: updatedUser,
				}
			};

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