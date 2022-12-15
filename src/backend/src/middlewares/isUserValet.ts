import { Request, Response, NextFunction } from "express";
import { errors } from "../api/constants/errors";
import { User } from "../database/entities/User";
import { verify } from "jsonwebtoken";
import getCurrentLine from "get-current-line";

const user = new User;

export const isUserValet = async (req : Request, res : Response, next : NextFunction) => {

	if(req.user.role == "valet") {

		next();

	} else {

		return res.status(401).json({
			status: 401,
			error: {
				code: errors.your_role_does_not_allow_this_action.code,
				title: errors.your_role_does_not_allow_this_action.title,
				description: errors.your_role_does_not_allow_this_action.description,
				source: {
					pointer: __filename,
					line: getCurrentLine().line
				}
			}
		});

	}

};