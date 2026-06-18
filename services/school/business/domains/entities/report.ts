import { C, createEnum, DPE } from "@duplojs/utils";
import { baseWarningRules } from "@lib/entity-rules";
import { UserId } from "../common/user";
import { Post } from "./post";
import { Answer } from "./answer";

export namespace Report {

	export const Reason = C.createNewType(
		"ReportReason",
		C.String,
		[
			C.StringMin(baseWarningRules.reason.min),
			C.StringMax(baseWarningRules.reason.max),
		],
	);
	export type Reason = C.GetNewType<typeof Reason>;

	const levelEnum = createEnum([
		"ban",
		"warning",
	]);
	export const Level = C.createNewType("ReportLevel", DPE.literal(levelEnum.toTuple()));
	export type Level = C.GetNewType<typeof Level>;

	export const Entity = C.createEntity(
		"Report",
		({ nullable }) => ({
			userId: UserId,
			postId: Post.Id,
			answerId: nullable(Answer.Id),
			reason: Reason,
			level: Level,
		}),
	);
	export type Entity = C.GetEntity<typeof Entity>;
}
