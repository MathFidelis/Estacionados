import { Request, Response, NextFunction } from "express";
import { errors } from "../api/constants/errors";
import { User } from "../database/entities/User";
import { verify } from "jsonwebtoken";
import getCurrentLine from "get-current-line";

const user = new User;

export const isUserAttendantOrManager = async (req : Request, res : Response, next : NextFunction) => {

	if(req.user.role == "manager" || req.user.role == "attendant") {

		next();

	} else {

		return res.status(401).json({
			status: 401,
			error: {
				code: errors.insufficient_permission_level.code,
				title: errors.insufficient_permission_level.title,
				description: errors.insufficient_permission_level.description,
				source: {
					pointer: __filename,
					line: getCurrentLine().line
				}
			}
		});

	}

};