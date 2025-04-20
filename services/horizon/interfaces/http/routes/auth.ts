import { HarborAPI } from "@interfaces/providers/harbor";
import { match } from "ts-pattern";
import { endpointAuthSchema } from "../schemas/auth";

useBuilder()
	.createRoute("POST", "/authentication")
	.extract({
		body: zod.string(),
	})
	.cut(
		async({ pickup, dropper }) => {
			const harborResponse = await HarborAPI.auth(
				pickup("body"),
			);

			return match(harborResponse)
				.with(
					{ information: "firebase.token.invalid" },
					() => new UnauthorizedHttpResponse("credential.invalid"),
				)
				.with(
					{ information: "user.logged" },
					(response) => dropper({ accessToken: response.body }),
				)
				.exhaustive();
		},
		["accessToken"],
		makeResponseContract(UnauthorizedHttpResponse, "credential.invalid"),
	)
	.handler(
		(pickup) => {
			const accessToken = pickup("accessToken");

			return new OkHttpResponse("user.logged", accessToken);
		},
		makeResponseContract(OkHttpResponse, "user.logged", endpointAuthSchema),
	);
