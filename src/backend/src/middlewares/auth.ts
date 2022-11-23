import { Request, Response, NextFunction } from "express";
import { errors } from "../api/constants/errors";
import getCurrentLine from "get-current-line";
import { verify } from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {

	const auth_header = req.headers.authorization;

	if(!auth_header) {
		
		return res.status(401).json({
			status: 401,
			error: {
				code: errors.no_token_provided.code,
				title: errors.no_token_provided.title,
				description: errors.no_token_provided.description,
				source: {
					pointer: __filename,
					line: getCurrentLine().line
				}
			}
		});
	
	}

	const parts = auth_header.split(" ");

	if(parts.length != 2) {

		return res.status(401).json({
			status: 401,
			error: {
				code: errors.invalid_token_format.code,
				title: errors.invalid_token_format.title,
				description: errors.invalid_token_format.description,
				source: {
					pointer: __filename,
					line: getCurrentLine().line
				}
			}
		});
	
	}

	const [schema, token] = parts;

	if(schema != "Bearer"){

		return res.status(401).json({
			status: 401,
			error: {
				code: errors.invalid_token_schema.code,
				title: errors.invalid_token_schema.title,
				description: errors.invalid_token_schema.description,
				source: {
					pointer: __filename,
					line: getCurrentLine().line
				}
			}
		});
	
	}

	verify(token, process.env.JWT_SECRET, (err, decoded : { id : string, email : string}) => {

		if(err){

			return res.status(401).json({
				status: 401,
				error: {
					code: errors.invalid_or_expired_token.code,
					title: errors.invalid_or_expired_token.title,
					description: errors.invalid_or_expired_token.description,
					source: {
						pointer: __filename,
						line: getCurrentLine().line
					}
				}
			});
		
		}

		req.user = {
			id: decoded.id,
			email: decoded.email,
		};

		next();
	
	});

};