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

			const {
				deleteId,
				...formatedUser
			} = user.toSimpleObject();

			return new OkHttpResponse(
				"user.found",
				formatedUser,
			);
		},
		makeResponseContract(OkHttpResponse, "user.found", endpointUserSchema),
	);
