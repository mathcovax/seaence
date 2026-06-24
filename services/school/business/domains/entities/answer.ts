import { C, createEnum, DPE, E, P } from "@duplojs/utils";
import { answerRules } from "@lib/entity-rules";
import { Post } from "./post";
import { UserId, UserName } from "../common/user";

export namespace Answer {
	export const Id = C.createNewType("AnswerId", C.String);
	export type Id = C.GetNewType<typeof Id>;

	export const Content = C.createNewType(
		"AnswerContent",
		C.String,
		[
			C.StringMin(answerRules.content.minLength),
			C.StringMax(answerRules.content.maxLength),
		],
	);
	export type Content = C.GetNewType<typeof Content>;

	export const statusEnum = createEnum([
		"compliant",
		"unprocessed",
		"notCompliant",
	]);

	export const Status = C.createNewType("AnswerStatus", DPE.literal(statusEnum.toTuple()));
	export type Status = C.GetNewType<typeof Status>;

	export const CreatedAt = C.createNewType("AnswerCreatedAt", C.Date);
	export type CreatedAt = C.GetNewType<typeof CreatedAt>;

	export const Entity = C.createEntity(
		"Answer",
		({ nullable }) => ({
			id: Id,
			postId: Post.Id,
			authorId: UserId,
			authorName: nullable(UserName),
			content: Content,
			status: Status,
			createdAt: CreatedAt,
		}),
	);
	export type Entity = C.GetEntity<typeof Entity>;

	const Unprocessed = C.createFlag<Entity, "Unprocessed">("Unprocessed");
	export type Unprocessed = C.GetFlag<typeof Unprocessed>;

	const Compliant = C.createFlag<Entity, "Compliant">("Compliant");
	export type Compliant = C.GetFlag<typeof Compliant>;

	const NotCompliant = C.createFlag<Entity, "NotCompliant">("NotCompliant");
	export type NotCompliant = C.GetFlag<typeof NotCompliant>;

	export function computeStatus(entity: Entity) {
		return C.matchWithString(
			entity.status,
			{
				compliant: () => E.result("answer.compliant", Compliant.append(entity)),
				notCompliant: () => E.result("answer.notCompliant", NotCompliant.append(entity)),
				unprocessed: () => E.result("answer.unprocessed", Unprocessed.append(entity)),
			},
		);
	}

	export type AvailableEntity = (
		| Entity & Unprocessed
		| Entity & Compliant
	);
}
