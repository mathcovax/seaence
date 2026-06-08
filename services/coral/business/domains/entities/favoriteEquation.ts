import { C, D, DPE } from "@duplojs/utils";
import { favoriteEquationRules } from "@vendors/entity-rules";
import { UserId } from "../common/user";
import { operatorContentSchema } from "../common/typesAdvancedQuery/operator";

export namespace FavoriteEquation {
	export const Id = C.createNewType("favoriteEquationId", DPE.string());
	export type Id = C.GetNewType<typeof Id>;

	export const Name = C.createNewType(
		"favoriteEquationName",
		DPE.string(),
		[
			C.StringMin(favoriteEquationRules.name.minLength),
			C.StringMax(favoriteEquationRules.name.maxLength),
		],
	);
	export type Name = C.GetNewType<typeof Name>;

	export const Equation = C.createNewType("equation", operatorContentSchema);
	export type Equation = C.GetNewType<typeof Equation>;

	export const AddedAt = C.createNewType("documentFolderAddedAt", DPE.date());
	export type AddedAt = C.GetNewType<typeof AddedAt>;

	export const Entity = C.createEntity("favoriteEquation", () => ({
		id: Id,
		name: Name,
		userId: UserId,
		equation: Equation,
		addedAt: AddedAt,
	}));
	export type Entity = C.GetEntity<typeof Entity>;

	export function create(
		params: Omit<
			C.EntityProperties<typeof Entity.propertiesDefinition>,
			"addedAt"
		>,
	) {
		return Entity.new({
			...params,
			addedAt: AddedAt.createOrThrow(D.now()),
		});
	}

	export function updateEquation(
		entity: Entity,
		equation: Equation,
	) {
		return Entity.update(entity, { equation });
	}

	export const WithCheckedOwner = C.createFlag<
		Entity,
		"favoriteEquationWithCheckedOwner"
	>("favoriteEquationWithCheckedOwner");
	export type WithCheckedOwner = C.GetFlag<typeof WithCheckedOwner>;
}
