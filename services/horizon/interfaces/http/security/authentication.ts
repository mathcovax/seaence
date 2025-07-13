import { HarborAPI } from "@interfaces/providers/harbor";
import { match, P } from "ts-pattern";
import { IgnoreByTypeCodegenDescription } from "@duplojs/types-codegen";

interface TryAuthenticationProcessOptions {
	unauthorizedBannedUser?: boolean;
}

export const tryAuthenticationProcess = createProcess(
	"authentication",
	{
		options: {} satisfies TryAuthenticationProcessOptions as TryAuthenticationProcessOptions,
	},
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

			const harborResponse = await HarborAPI.findOneUserByAccessToken(
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
	.cut(
		({ pickup, dropper }) => {
			const { options, user } = pickup(["user", "options"]);

			if (options?.unauthorizedBannedUser && user?.banned) {
				return new UnauthorizedHttpResponse("user.banned");
			}

			return dropper(null);
		},
		[],
		makeResponseContract(UnauthorizedHttpResponse, "user.banned"),
	)
	.exportation(["user"]);

export const mustBeConnectedProcess = createProcess(
	"mustBeConnected",
	{
		options: {} satisfies TryAuthenticationProcessOptions as TryAuthenticationProcessOptions,
	},
)
	.execute(
		tryAuthenticationProcess,
		{
			pickup: ["user"],
			options: (pickup) => pickup("options"),
		},
	)
	.cut(
		({ pickup, dropper }) => {
			const { user } = pickup(["user"]);

			if (!user) {
				return new ForbiddenHttpResponse("authentication.required");
			}

			return dropper({ user });
		},
		["user"],
		makeResponseContract(ForbiddenHttpResponse, "authentication.required"),
	)
	.exportation(["user"]);

export function useMustBeConnectedBuilder(options?: TryAuthenticationProcessOptions) {
	return useBuilder()
		.preflight(
			mustBeConnectedProcess,
			{
				pickup: ["user"],
				options,
			},
		);
}
