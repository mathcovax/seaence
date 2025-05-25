import { HarborAPI } from "@interfaces/providers/harbor";
import { match, P } from "ts-pattern";
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
					{ information: P.union("accessToken.invalid", "user.notfound") },
					() => new ForbiddenHttpResponse("accessToken.invalid"),
				)
				.with(
					{ information: "user.found" },
					(response) => dropper({ user: response.body }),
				)
				.exhaustive();
		},
		["user"],
		makeResponseContract(ForbiddenHttpResponse, "accessToken.invalid"),
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
