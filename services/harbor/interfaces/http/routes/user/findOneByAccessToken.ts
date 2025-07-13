import { findUserWithAccessTokenProcess } from "@interfaces/http/processes/findUserWithAccessToken";
import { endpointUserSchema } from "@interfaces/http/schemas/user";

useBuilder()
	.createRoute("POST", "/user/find-one-by-access-token")
	.execute(
		findUserWithAccessTokenProcess,
		{ pickup: ["user"] },
	)
	.handler(
		(pickup) => {
			const { user } = pickup(["user"]);

			return new OkHttpResponse(
				"user.found",
				user.toSimpleObject(),
			);
		},
		makeResponseContract(OkHttpResponse, "user.found", endpointUserSchema),
	);
