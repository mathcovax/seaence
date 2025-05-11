import { endpointUserSchema } from "../schemas/user";
import { useMustBeConnectedBuilder } from "../security/mustBeConnected";

useMustBeConnectedBuilder()
	.createRoute("POST", "/me")
	.handler(
		(pickup) => {
			const { user } = pickup(["user"]);

			return new OkHttpResponse("me.info.get", user);
		},
		makeResponseContract(OkHttpResponse, "me.info.get", endpointUserSchema),
	);
