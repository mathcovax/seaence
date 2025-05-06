import { endpointUserSchema } from "../schemas/user";
import { useMustBeConnectedBuilder } from "../security/mustBeConnected";

useMustBeConnectedBuilder()
	.createRoute("GET", "/user")
	.handler(
		(pickup) => {
			const { user } = pickup(["user"]);

			return new OkHttpResponse("user.get", user);
		},
		makeResponseContract(OkHttpResponse, "user.get", endpointUserSchema),
	);
