import { C, createEnum, DPE, E, P } from "@duplojs/utils";
import { postRules } from "@lib/entity-rules";
import { UserId, UserName } from "../common/user";

export namespace Post {

	export const Id = C.createNewType("PostId", C.String);
	export type Id = C.GetNewType<typeof Id>;

	export const Topic = C.createNewType(
		"PostTopic",
		C.String,
		[
			C.StringMin(postRules.topic.minLength),
			C.StringMax(postRules.topic.maxLength),
		],
	);
	export type Topic = C.GetNewType<typeof Topic>;

	export const Content = C.createNewType(
		"PostContent",
		C.String,
		[
			C.StringMin(postRules.content.minLength),
			C.StringMax(postRules.content.maxLength),
		],
	);
	export type Content = C.GetNewType<typeof Content>;

	export const NodeSameRawDocumentId = C.createNewType("NodeSameRawDocumentId", C.String);
	export type NodeSameRawDocumentId = C.GetNewType<typeof NodeSameRawDocumentId>;

	export const AnswerCount = C.createNewType("PostAnswerCount", C.Number, C.PositiveInt);
	export type AnswerCount = C.GetNewType<typeof AnswerCount>;

	const statusEnum = createEnum([
		"compliant",
		"unprocessed",
		"notCompliant",
	]);

	export const Status = C.createNewType("PostStatus", DPE.literal(statusEnum.toTuple()));
	export type Status = C.GetNewType<typeof Status>;

	export const CreatedAt = C.createNewType("PostCreatedAt", C.Date);
	export type CreatedAt = C.GetNewType<typeof CreatedAt>;

	export const Entity = C.createEntity(
		"Post",
		({ nullable }) => ({
			id: Id,
			topic: Topic,
			content: Content,
			nodeSameRawDocumentId: NodeSameRawDocumentId,
			answerCount: AnswerCount,
			authorId: UserId,
			authorName: nullable(UserName),
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
				compliant: () => E.result("post.compliant", Compliant.append(entity)),
				notCompliant: () => E.result("post.notCompliant", NotCompliant.append(entity)),
				unprocessed: () => E.result("post.unprocessed", Unprocessed.append(entity)),
			},
		);
	}

	export type AvailableEntity = (
		| Entity & Unprocessed
		| Entity & Compliant
	);
}
