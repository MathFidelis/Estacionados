import { Request, Response, NextFunction } from "express";
import { errors } from "../api/constants/errors";
import { User } from "../database/entities/User";
import { verify } from "jsonwebtoken";
import getCurrentLine from "get-current-line";

const user = new User;

export const isUserAttendantOrManager = async (req : Request, res : Response, next : NextFunction) => {

	//

};