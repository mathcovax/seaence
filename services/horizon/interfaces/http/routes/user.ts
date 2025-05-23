import { HarborAPI } from "@interfaces/providers/harbor";
import { endpointUserSchema } from "../schemas/user";
import { useMustBeConnectedBuilder } from "../security/mustBeConnected";

useMustBeConnectedBuilder()
	.createRoute("POST", "/self-user")
	.handler(
		(pickup) => {
			const { user } = pickup(["user"]);

			return new OkHttpResponse("user.self", user);
		},
		makeResponseContract(OkHttpResponse, "user.self", endpointUserSchema),
	);

useMustBeConnectedBuilder()
	.createRoute("POST", "/self-rename-user")
	.extract({
		body: {
			newUsername: zod.string(),
		},
	})
	.handler(
		async(pickup) => {
			const { user, newUsername } = pickup(["user", "newUsername"]);

			await HarborAPI.renameUser(
				user.id,
				newUsername,
			);

			return new NoContentHttpResponse("user.rename");
		},
		makeResponseContract(NoContentHttpResponse, "user.rename"),
	);
