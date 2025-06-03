import { HarborAPI } from "@interfaces/providers/harbor";
import { match, P } from "ts-pattern";
import { IgnoreByTypeCodegenDescription } from "@duplojs/types-codegen";

export const optionalAuthenticationProcess = createProcess(
	"optionalAuthentication",
	undefined,
)
	.extract(
		{
			headers: {
				authorization: zod.string().optional(),
			},
		},
		() => new ForbiddenHttpResponse("authorization.missing"),
		new IgnoreByTypeCodegenDescription(),
	)
	.cut(
		async({ pickup, dropper }) => {
			const accessToken = pickup("authorization");

			if (!accessToken) {
				return dropper({ user: null });
			}

			const harborResponse = await HarborAPI.findUser(
				accessToken,
			);

			return match(harborResponse)
				.with(
					{ information: P.union("accessToken.invalid", "user.notfound") },
					() => dropper({ user: null }),
				)
				.with(
					{ information: "user.found" },
					(response) => dropper({ user: response.body }),
				)
				.exhaustive();
		},
		["user"],
	)
	.exportation(["user"]);

export function useOptionalAuthenticationBuilder() {
	return useBuilder()
		.preflight(
			optionalAuthenticationProcess,
			{
				pickup: ["user"],
			},
		);
}
