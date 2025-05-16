import { endpointUserSchema } from "../schemas/user";
import { useMustBeConnectedBuilder } from "../security/mustBeConnected";

useMustBeConnectedBuilder()
	.createRoute("POST", "/user")
	.handler(
		(pickup) => {
			const { user } = pickup(["user"]);

			return new OkHttpResponse("user.self", user);
		},
		makeResponseContract(OkHttpResponse, "user.self", endpointUserSchema),
	);
