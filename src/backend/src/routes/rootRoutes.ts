import { Router } from "express";
import { success } from "../api/constants/success";

const router = Router();

router.get("/", (req, res) => {

	  res.status(200).json({

		status: 200, 
		success: {
			code: success.server_info.code,
			title: success.server_info.title,
			jsonapi: {
				name: process.env.APP_NAME as string,
				host: process.env.APP_HOST as string,
				port: process.env.APP_PORT as unknown as number,
				version: process.env.APP_VERSION as unknown as number,
				environment: process.env.APP_ENVIRONMENT as string,
			}
		}

	  });
	  
});

export default router;