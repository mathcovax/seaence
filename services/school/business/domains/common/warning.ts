import { C } from "@duplojs/utils";
import { baseWarningRules } from "@lib/entity-rules";

export const WarningReason = C.createNewType(
	"WarningReason",
	C.String,
	[
		C.StringMin(baseWarningRules.reason.min),
		C.StringMax(baseWarningRules.reason.max),
	],
);
export type WarningReason = C.GetNewType<typeof WarningReason>;

export const WarningMakeUserBan = C.createNewType("WarningMakeUserBan", C.Boolean);
export type WarningMakeUserBan = C.GetNewType<typeof WarningMakeUserBan>;
