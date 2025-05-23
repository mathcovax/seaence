import { HarborAPI } from "@interfaces/providers/harbor";
import { match } from "ts-pattern";
import { IgnoreByTypeCodegenDescription } from "@duplojs/types-codegen";

export const mustBeConnectedProcess = createProcess(
	"mustBeConnected",
	undefined,
)
	.extract(
		{
			headers: {
				authorization: zod.string(),
			},
		},
		() => new ForbiddenHttpResponse("authorization.missing"),
		new IgnoreByTypeCodegenDescription(),
	)
	.cut(
		async({ pickup, dropper }) => {
			const accessToken = pickup("authorization");

			const harborResponse = await HarborAPI.findUser(
				accessToken,
			);

			return match(harborResponse)
				.with(
					{ information: "access.token.invalid" },
					() => new ForbiddenHttpResponse("accessToken.invalid"),
				)
				.with(
					{ information: "user.notfound" },
					() => new NotFoundHttpResponse("user.notfound"),
				)
				.with(
					{ information: "user.found" },
					(response) => dropper({ user: response.body }),
				)
				.exhaustive();
		},
		["user"],
		[
			...makeResponseContract(ForbiddenHttpResponse, "accessToken.invalid"),
			...makeResponseContract(NotFoundHttpResponse, "user.notfound"),
		],
	)
	.exportation(["user"]);

export function useMustBeConnectedBuilder() {
	return useBuilder()
		.preflight(
			mustBeConnectedProcess,
			{
				pickup: ["user"],
			},
		);
}
