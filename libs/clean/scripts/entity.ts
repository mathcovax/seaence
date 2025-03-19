import { ValueObjectError, type ValueObjecter } from "./valueObject";
import { type infer as zodInfer } from "zod";
import { getTypedEntries, getTypedKeys, type SimplifyObjectTopLevel } from "@duplojs/utils";

const entityHandlerBrand = Symbol("brand");

export type EntityPropertiesDefinition = Record<string, ValueObjecter>;

export type PropertiesDefinitionToRawType<
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
> = {
	[Prop in keyof GenericPropertiesDefinition]: zodInfer<GenericPropertiesDefinition[Prop]["zodSchema"]>
};

export type PropertiesDefinitionToObjectValue<
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
> = {
	[Prop in keyof GenericPropertiesDefinition]: ReturnType<GenericPropertiesDefinition[Prop]["unsafeCreate"]>
};

export type GetPropertiesDefinitionName<
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
> = {
	[Prop in keyof GenericPropertiesDefinition]: GenericPropertiesDefinition[Prop]["name"]
}[keyof GenericPropertiesDefinition];

export type Patchers<
	GenericPropertiesDefinition extends EntityPropertiesDefinition = EntityPropertiesDefinition,
> = Record<
	string,
	(
		(
			this: PropertiesDefinitionToObjectValue<GenericPropertiesDefinition>,
			input: any
		) => Partial<
			PropertiesDefinitionToObjectValue<GenericPropertiesDefinition>
		>
	)
>;

export type BuildPatchers<
	GenericPatchers extends Patchers<any> = Patchers,
	GenericEntity extends Entity = Entity,
> = {
	[Prop in keyof GenericPatchers]: (
		entity: GenericEntity,
		...args: Parameters<GenericPatchers[Prop]>
	) => GenericEntity
};

export type Entity<
	GenericName extends string = string,
	GenericPropertiesDefinition extends EntityPropertiesDefinition = EntityPropertiesDefinition,
> = SimplifyObjectTopLevel<
	Readonly<
		{
			_entityName: GenericName;
		} & PropertiesDefinitionToObjectValue<
			GenericPropertiesDefinition
		>
	>
>;

export interface EntityInformation<
	GenericPropertiesDefinition extends EntityPropertiesDefinition = EntityPropertiesDefinition,
> {
	isNew: boolean;
	updatedValues?: Partial<
		PropertiesDefinitionToRawType<
			GenericPropertiesDefinition
		>
	>;
}

export interface EntityHandler<
	GenericName extends string = string,
	GenericPropertiesDefinition extends EntityPropertiesDefinition = EntityPropertiesDefinition,
	GenericInputConstructor extends Partial<
		PropertiesDefinitionToObjectValue<GenericPropertiesDefinition>
	> = {},
> {
	name: GenericName;
	propertiesDefinition: GenericPropertiesDefinition;
	[entityHandlerBrand]: true;
	create(
		properties: PropertiesDefinitionToObjectValue<GenericPropertiesDefinition>,
	): Entity<
		GenericName,
		GenericPropertiesDefinition
	>;
	"new"(input: GenericInputConstructor): ReturnType<this["create"]>;
	mapper(
		rawProperties: PropertiesDefinitionToRawType<GenericPropertiesDefinition>
	):
		| ReturnType<this["create"]>
		| ValueObjectError<GetPropertiesDefinitionName<GenericPropertiesDefinition>>;
	throwMapper(
		rawProperties: PropertiesDefinitionToRawType<GenericPropertiesDefinition>
	): ReturnType<this["create"]>;
	unsafeMapper(
		rawProperties: PropertiesDefinitionToRawType<GenericPropertiesDefinition>
	): ReturnType<this["create"]>;
	creatorOf(entity: Entity<any, any>): entity is Entity<
		GenericName,
		GenericPropertiesDefinition
	>;
	update(
		entity: Entity<
			GenericName,
			GenericPropertiesDefinition
		>,
		values: Partial<
			PropertiesDefinitionToObjectValue<GenericPropertiesDefinition>
		>
	): Entity<
		GenericName,
		GenericPropertiesDefinition
	>;
	toJSON(
		entity: Entity<
			GenericName,
			GenericPropertiesDefinition
		>,
	): SimplifyObjectTopLevel<PropertiesDefinitionToRawType<GenericPropertiesDefinition>>;
	informations: WeakMap<
		Entity<
			GenericName,
			GenericPropertiesDefinition
		>,
		EntityInformation<GenericPropertiesDefinition>
	>;
	clearInformation(
		entity: Entity<
			GenericName,
			GenericPropertiesDefinition
		>,
	): Entity<
		GenericName,
		GenericPropertiesDefinition
	>;
}

export type EntityConstructor<
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
	GenericInputConstructor extends object,
> = ((input: GenericInputConstructor) => PropertiesDefinitionToObjectValue<
	GenericPropertiesDefinition
>);

export function createEntityHandler<
	GenericName extends string,
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
	GenericInputConstructor extends object = SimplifyObjectTopLevel<
		PropertiesDefinitionToObjectValue<GenericPropertiesDefinition>
	>,
>(
	name: GenericName,
	propertiesDefinition: GenericPropertiesDefinition,
	constructor: EntityConstructor<
		GenericPropertiesDefinition,
		GenericInputConstructor
	> = ((input: any) => input),
): EntityHandler<
		GenericName,
		GenericPropertiesDefinition,
		GenericInputConstructor
	> {
	type CurrentEntity = Entity<
		GenericName,
		GenericPropertiesDefinition
	>;

	const entitiesInformations = new WeakMap<
		CurrentEntity,
		EntityInformation<GenericPropertiesDefinition>
	>();

	return {
		name,
		propertiesDefinition,
		[entityHandlerBrand]: true,
		create(properties) {
			const entity = {
				_entityName: name,
				...properties,
			} as CurrentEntity;

			entitiesInformations.set(entity, {
				isNew: false,
			});

			return entity;
		},
		new(input) {
			const entity = this.create(
				constructor(input),
			);

			entitiesInformations.set(entity, {
				isNew: true,
			});

			return entity;
		},
		mapper(rawProperties) {
			const properties = getTypedEntries(rawProperties)
				.reduce(
					(pv, [key, value]) => {
						if (pv instanceof ValueObjectError) {
							return pv;
						}

						const valueObject = propertiesDefinition[key].create(value);

						if (valueObject instanceof ValueObjectError) {
							return valueObject;
						}

						return {
							...pv,
							[key]: valueObject,
						};
					},
					{} as PropertiesDefinitionToObjectValue<GenericPropertiesDefinition> | ValueObjectError,
				);

			if (properties instanceof ValueObjectError) {
				return properties;
			}

			return this.create(properties);
		},
		throwMapper(rawProperties) {
			const properties = getTypedEntries(rawProperties)
				.reduce(
					(pv, [key, value]) => ({
						...pv,
						[key]: propertiesDefinition[key].throwCreate(value),
					}),
					{} as PropertiesDefinitionToObjectValue<GenericPropertiesDefinition>,
				);

			return this.create(properties);
		},
		unsafeMapper(rawProperties) {
			const properties = getTypedEntries(rawProperties)
				.reduce(
					(pv, [key, value]) => ({
						...pv,
						[key]: propertiesDefinition[key].unsafeCreate(value),
					}),
					{} as PropertiesDefinitionToObjectValue<GenericPropertiesDefinition>,
				);

			return this.create(properties);
		},
		creatorOf(entity): entity is never {
			return !!entitiesInformations.has(entity as never);
		},
		update(
			entity,
			values,
		) {
			const informationsEntity = entitiesInformations.get(entity);

			const newEntity = {
				...entity,
				...values,
			};

			entitiesInformations.set(
				newEntity,
				{
					isNew: false,
					...informationsEntity,
					updatedValues: {
						...informationsEntity?.updatedValues,
						...getTypedKeys(values)
							.reduce(
								(pv, key) => ({
									...pv,
									[key]: values?.[key]?.value,
								}),
								{} as any,
							),
					},
				},
			);

			return newEntity;
		},
		toJSON(entity) {
			return getTypedKeys(propertiesDefinition)
				.reduce(
					(pv, key) => ({
						...pv,
						[key]: entity[key].value,
					}),
					{} as any,
				);
		},
		informations: entitiesInformations,
		clearInformation(entity) {
			entitiesInformations.set(entity, { isNew: false });

			return entity;
		},
	};
}

export type GetEntity<
	GenericEntityHandler extends EntityHandler<any, any>,
> = ReturnType<GenericEntityHandler["create"]>;
