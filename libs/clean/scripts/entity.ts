import { ValueObjectError, type ValueObjecter } from "./valueObject";
import { type infer as zodInfer } from "zod";
import { getTypedEntries, type SimplifyObjectTopLevel } from "@duplojs/utils";

const entityHandlerBrand = Symbol("brand");

export type EntityPropertiesDefinition = Record<string, ValueObjecter>;

export type PropertiesDefinitionToRawType<
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
> = {
	[Prop in keyof GenericPropertiesDefinition]: zodInfer<GenericPropertiesDefinition[Prop]["zodSchema"]>
};

export type PropertiesDefinitionToObjectValue<
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
> = SimplifyObjectTopLevel<
	{
		[Prop in keyof GenericPropertiesDefinition]: ReturnType<GenericPropertiesDefinition[Prop]["unsafeCreate"]>
	}
>;

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
	GenericSymbol extends symbol = symbol,
> = SimplifyObjectTopLevel<
	Readonly<
		{
			_entityName: GenericName;
		} & PropertiesDefinitionToObjectValue<
			GenericPropertiesDefinition
		> & {
			[Prop in GenericSymbol]: true;
		} & {
			_new: boolean;
			_updatedValues?: Readonly<
				PropertiesDefinitionToObjectValue<
					GenericPropertiesDefinition
				>
			>;
		}
	>
>;

export interface EntityHandler<
	GenericName extends string = string,
	GenericPropertiesDefinition extends EntityPropertiesDefinition = EntityPropertiesDefinition,
	GenericInputConstructor extends Partial<
		PropertiesDefinitionToObjectValue<GenericPropertiesDefinition>
	> = {},
	GenericPatchers extends Patchers<GenericPropertiesDefinition> = {},
	GenericSymbol extends symbol = symbol,
> {
	name: GenericName;
	propertiesDefinition: GenericPropertiesDefinition;
	[entityHandlerBrand]: true;
	create(
		properties: PropertiesDefinitionToObjectValue<GenericPropertiesDefinition>,
	): Entity<
		GenericName,
		GenericPropertiesDefinition,
		GenericSymbol
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
	creatorOf(entity: Entity): entity is Entity<
		GenericName,
		GenericPropertiesDefinition,
		GenericSymbol
	>;
	update(
		entity: Entity<
			GenericName,
			GenericPropertiesDefinition,
			GenericSymbol
		>,
		values: Partial<
			PropertiesDefinitionToObjectValue<GenericPropertiesDefinition>
		>
	): Entity<
		GenericName,
		GenericPropertiesDefinition,
		GenericSymbol
	>;
	patchers: BuildPatchers<
		GenericPatchers,
		Entity<
			GenericName,
			GenericPropertiesDefinition,
			GenericSymbol
		>
	>;
}

export type EntityConstructor<
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
	GenericInputConstructor extends object,
> = (input: GenericInputConstructor) => PropertiesDefinitionToObjectValue<
	GenericPropertiesDefinition
>;

export interface EntityHandlerParams<
	GenericPropertiesDefinition extends EntityPropertiesDefinition = EntityPropertiesDefinition,
	GenericInputConstructor extends object = PropertiesDefinitionToObjectValue<GenericPropertiesDefinition>,
	GenericPatchers extends Patchers<GenericPropertiesDefinition> = {},
> {
	constructor: EntityConstructor<
		GenericPropertiesDefinition,
		GenericInputConstructor
	>;
	patchers: GenericPatchers;
}

export function createEntityHandler<
	GenericName extends string,
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
	GenericInputConstructor extends object = SimplifyObjectTopLevel<
		PropertiesDefinitionToObjectValue<GenericPropertiesDefinition>
	>,
	GenericPatchers extends Patchers<GenericPropertiesDefinition> = {},
>(
	name: GenericName,
	propertiesDefinition: GenericPropertiesDefinition,
	rawParams: Partial<
		EntityHandlerParams<
			GenericPropertiesDefinition,
			GenericInputConstructor,
			GenericPatchers
		>
	> = {},
): EntityHandler<
		GenericName,
		GenericPropertiesDefinition,
		GenericInputConstructor,
		GenericPatchers,
		typeof entityBrand
	> {
	const params: EntityHandlerParams<
		GenericPropertiesDefinition,
		GenericInputConstructor,
		GenericPatchers
	> = {
		constructor: rawParams.constructor ?? ((input: any) => input),
		patchers: rawParams.patchers ?? {} as never,
	};
	const entityBrand = Symbol("brand");

	function update(
		entity: Entity<
			GenericName,
			GenericPropertiesDefinition,
			typeof entityBrand
		>,
		values: Partial<
			PropertiesDefinitionToObjectValue<GenericPropertiesDefinition>
		>,
	) {
		return {
			...entity,
			...values,
			_updatedValues: {
				...entity._updatedValues,
				...values,
			},
		};
	}

	return {
		name,
		propertiesDefinition,
		[entityHandlerBrand]: true,
		create(properties) {
			return {
				_entityName: name,
				[entityBrand]: true,
				...properties,
				_new: false,
			} as Entity<
				GenericName,
				GenericPropertiesDefinition,
				typeof entityBrand
			>;
		},
		new(input) {
			return {
				...this.create(
					params.constructor(input),
				),
				_new: true,
			};
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
			return entityBrand in entity;
		},
		update,
		patchers: getTypedEntries(params.patchers)
			.reduce(
				(pv, [key, patcher]) => ({
					...pv,
					[key]: (entity: Entity, ...args: [any]) => {
						const patchedValues = patcher.call(
							entity as never,
							...args,
						);

						return update(
							entity as never,
							patchedValues,
						);
					},
				}),
				{},
			) as never,
	};
}

export type GetEntity<
	GenericEntityHandler extends EntityHandler<any, any>,
> = ReturnType<GenericEntityHandler["create"]>;
