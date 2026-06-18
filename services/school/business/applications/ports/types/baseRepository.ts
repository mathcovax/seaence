import type { C } from "@duplojs/utils";

export interface BaseRepositoryPort<
	GenericEntity extends C.Entity,
> {
	save<
		GenericSavedEntity extends GenericEntity,
	>(entity: GenericSavedEntity): Promise<GenericSavedEntity>;
}
