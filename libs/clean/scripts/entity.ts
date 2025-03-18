import { ValueObjectError, type ValueObjecter } from "./valueObject";
import { type infer as zodInfer } from "zod";
import { type AnyFunction, getTypedEntries, type SimplifyObjectTopLevel } from "@duplojs/utils";

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
	creatorOf(entity: Entity<any, any>): entity is Entity<
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
		GenericInputConstructor,
		typeof entityBrand
	> {
	const entityBrand = Symbol("brand");

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
					constructor(input),
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
		update(
			entity,
			values,
		) {
			return {
				...entity,
				...values,
				_updatedValues: {
					...entity._updatedValues,
					...values,
				},
			};
		},
	};
}

export type GetEntity<
	GenericEntityHandler extends EntityHandler<any, any>,
> = ReturnType<GenericEntityHandler["create"]>;
