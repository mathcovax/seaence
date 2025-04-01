import { z as zod, type ZodType } from "zod";
import { toJSON, type ToSimpleObject, type ToJSON, toSimpleObject } from "./utils";
import { EntityObjecter, type ValueObject, type ValueObjectError, type ValueObjecter, type ValueObjecterAttribute } from "./valueObject";
import { type UnionToIntersection, type SimplifyObjectTopLevel, type AnyFunction, type IsEqual } from "@duplojs/utils";

export type ApplyValueObjecterAttribute<
	GenericValue extends unknown,
	GenericValueObjecterAttribute extends unknown[],
> = GenericValueObjecterAttribute extends [...unknown[], infer InferedLast]
	? InferedLast extends "array"
		? GenericValueObjecterAttribute extends [...infer InferedRest, unknown]
			? ApplyValueObjecterAttribute<GenericValue[], InferedRest>
			: never
		: InferedLast extends "nullable"
			? GenericValueObjecterAttribute extends [...infer InferedRest, unknown]
				? ApplyValueObjecterAttribute<null | GenericValue, InferedRest>
				: never
			: never
	: GenericValue;

export type EntityPropertiesDefinition = Record<string, ValueObjecter>;

export type EntityPropertiesDefinitionToEntityProperties<
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
> = {
	[Prop in keyof GenericPropertiesDefinition]: ApplyValueObjecterAttribute<
		ReturnType<GenericPropertiesDefinition[Prop]["unsafeCreate"]>,
		GenericPropertiesDefinition[Prop]["attributes"]
	>
};

export type EntityProperties = EntityPropertiesDefinitionToEntityProperties<EntityPropertiesDefinition>;

export type EntityPropertiesDefinitionToRawProperties<
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
> = EntityPropertiesToRawProperties<
	GenericPropertiesDefinition
>;

export type EntityPropertiesToRawProperties<
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
> = SimplifyObjectTopLevel<
	{
		[Prop in keyof GenericPropertiesDefinition]: ApplyValueObjecterAttribute<
			ReturnType<GenericPropertiesDefinition[Prop]["unsafeCreate"]>["value"],
			GenericPropertiesDefinition[Prop]["attributes"]
		>
	}
>;

const updatedValuesKey = Symbol("updatedValues");

export interface EntityInstanceBase<
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
	GenericProperties extends EntityProperties = EntityProperties,
> {
	update(
		values: SimplifyObjectTopLevel<
			Partial<GenericProperties>
		>
	): this;
	toJSON(): ToJSON<
		SimplifyObjectTopLevel<
			GenericProperties
		>
	>;
	toSimpleObject(): ToSimpleObject<
		GenericProperties
	>;
	getUpdatedValues(): ToSimpleObject<
		Partial<
			EntityPropertiesToRawProperties<
				GenericPropertiesDefinition
			>
		>
	>;
}

export type EntityInstance<
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
	GenericProperties extends EntityProperties = EntityProperties,
	GenericInheritProperties extends Record<string, unknown> = Record<string, unknown>,
> = GenericProperties
	& EntityInstanceBase<
		GenericPropertiesDefinition,
		GenericProperties
	>
	& GenericInheritProperties;

export interface EntityClass<
	GenericPropertiesDefinition extends EntityPropertiesDefinition = EntityPropertiesDefinition,
	GenericProperties extends EntityProperties = EntityProperties,
	GenericInheritProperties extends Record<string, AnyFunction> = {},
> {
	new(
		properties: GenericProperties
	): EntityInstance<
		GenericPropertiesDefinition,
		GenericProperties,
		GenericInheritProperties
	>;

	readonly propertiesDefinition: GenericPropertiesDefinition;
}

export class AttributeError<
	GenericName extends string = string,
> extends Error {
	public constructor(
		public readonly valueObjectName: GenericName,
		public readonly attribute: ValueObjecterAttribute,
	) {
		super(`${attribute} attribute Error on ${valueObjectName} value object.`);
	}
}

type AnyRecord = Record<any, any>;

function setProperty(object: any, prop: string, value: any) {
	(object as AnyRecord)[prop] = value;
}

type MybeArray<
	GenericValue extends unknown,
> = GenericValue | GenericValue[];

export function applyAttributes(
	getValue: (rawValue: any) => ValueObject | ValueObjectError,
	valueObjecterName: string,
	rawValue: any,
	attributes: ValueObjecterAttribute[],
): MybeArray<
	| ValueObject
	| AttributeError
	| ValueObjectError
	| null
	> {
	const [currentAttribute, ...restAttributes] = attributes;

	if (currentAttribute === undefined) {
		return getValue(rawValue);
	} else if (currentAttribute === "nullable") {
		return rawValue === null
			? null
			: applyAttributes(
				getValue,
				valueObjecterName,
				rawValue,
				restAttributes,
			);
	} else if (currentAttribute === "array") {
		if (!Array.isArray(rawValue)) {
			return new AttributeError(
				valueObjecterName,
				currentAttribute,
			);
		}

		const results = rawValue.map(
			(mappedRawValue) => applyAttributes(
				getValue,
				valueObjecterName,
				mappedRawValue,
				restAttributes,
			),
		);

		return results.find((result) => result instanceof Error) ?? results as never;
	} else {
		return new AttributeError(
			valueObjecterName,
			currentAttribute,
		);
	}
}

export class EntityHandler {
	public static create<
		GenericPropertiesDefinition extends EntityPropertiesDefinition,
		GenericEntityParent extends EntityClass<{}, any> = never,
	>(
		propertiesDefinition: GenericPropertiesDefinition,
		Parent: GenericEntityParent = (EntityHandler) as any,
	) {
		type PropertiesDefinition = SimplifyObjectTopLevel<
			UnionToIntersection<
				| GenericPropertiesDefinition
				| GenericEntityParent["propertiesDefinition"]
			> & {}
		>;

		type Properties = SimplifyObjectTopLevel<
			UnionToIntersection<
				| EntityPropertiesDefinitionToEntityProperties<GenericPropertiesDefinition>
				| EntityPropertiesDefinitionToEntityProperties<
					GenericEntityParent["propertiesDefinition"]
				>
			> & {}
		>;

		class Entity extends (Parent as new(arg: any) => any) {
			public static propertiesDefinition = {
				...Parent?.propertiesDefinition,
				...propertiesDefinition,
			};

			public [updatedValuesKey] = {};

			public constructor(input: Properties) {
				// eslint-disable-next-line constructor-super
				super({});

				for (const prop in Entity.propertiesDefinition) {
					setProperty(this, prop, (input as AnyRecord)[prop]);
				}
			}

			public update(values: Properties) {
				const constructor = this.constructor as typeof Entity;
				const updatedEntity = new constructor({
					...this,
					...values,
				});

				updatedEntity[updatedValuesKey] = {
					...this[updatedValuesKey],
					...values,
				};

				return updatedEntity;
			}

			public toJSON() {
				return toJSON(
					Object.keys(Entity.propertiesDefinition)
						.reduce(
							(pv, key) => ({
								...pv,
								[key]: this[key],
							}),
							{},
						),
				);
			}

			public toSimpleObject() {
				return toSimpleObject(
					Object.keys(Entity.propertiesDefinition)
						.reduce(
							(pv, key) => ({
								...pv,
								[key]: this[key],
							}),
							{},
						),
				);
			}

			public getUpdatedValues() {
				return toSimpleObject(this[updatedValuesKey]);
			}
		}

		return Entity as unknown as EntityClass<
			PropertiesDefinition,
			Properties,
			true extends IsEqual<never, GenericEntityParent>
				? {}
				: InstanceType<GenericEntityParent>
		>;
	}

	public static mapper<
		GenericEntityClass extends EntityClass<any, any>,
	>(
		Entity: GenericEntityClass,
		rawProperties: EntityPropertiesDefinitionToRawProperties<GenericEntityClass["propertiesDefinition"]>,
	): InstanceType<GenericEntityClass> | ValueObjectError | AttributeError {
		const properties = Object.entries(Entity.propertiesDefinition as EntityPropertiesDefinition)
			.reduce(
				(pv, [key, propertyDefinition]) => {
					if (pv instanceof Error) {
						return pv;
					}

					const value = rawProperties[key];

					const result = applyAttributes(
						(value) => propertyDefinition.create(value),
						propertyDefinition.name,
						value,
						propertyDefinition.attributes,
					);

					if (result instanceof Error) {
						return result;
					}

					return {
						...pv,
						[key]: result,
					};
				},
				{} as EntityPropertiesDefinitionToRawProperties<GenericEntityClass["propertiesDefinition"]> | ValueObjectError | AttributeError,
			);

		if (properties instanceof Error) {
			return properties;
		}

		return new Entity(properties);
	}

	public static throwMapper<
		GenericEntityClass extends EntityClass<any, any>,
	>(
		Entity: GenericEntityClass,
		rawProperties: EntityPropertiesDefinitionToRawProperties<GenericEntityClass["propertiesDefinition"]>,
	): InstanceType<GenericEntityClass> {
		const result = this.mapper(Entity, rawProperties);

		if (result instanceof Error) {
			throw result;
		}

		return result;
	}

	public static unsafeMapper<
		GenericEntityClass extends EntityClass<any, any>,
	>(
		Entity: GenericEntityClass,
		rawProperties: EntityPropertiesDefinitionToRawProperties<GenericEntityClass["propertiesDefinition"]>,
	): InstanceType<GenericEntityClass> {
		const properties = Object.entries(Entity.propertiesDefinition as EntityPropertiesDefinition)
			.reduce(
				(pv, [key, propertyDefinition]) => {
					if (pv instanceof Error) {
						return pv;
					}

					const value = rawProperties[key];

					const result = applyAttributes(
						(value) => propertyDefinition.unsafeCreate(value),
						propertyDefinition.name,
						value,
						propertyDefinition.attributes,
					);

					if (result instanceof Error) {
						return result;
					}

					return {
						...pv,
						[key]: result,
					};
				},
				{} as EntityPropertiesDefinitionToRawProperties<GenericEntityClass["propertiesDefinition"]> | ValueObjectError | AttributeError,
			);

		return new Entity(properties);
	}

	public static instanceof<
		GenericEntityClass extends EntityClass<any, any>,
	>(
		Entity: GenericEntityClass,
		entity: EntityInstance<any, any>,
	): entity is InstanceType<GenericEntityClass> {
		return entity instanceof Entity;
	}

	public static createEntityObjecter<
		GenericName extends string,
		GenericEntityClass extends EntityClass<any, any>,
	>(
		name: GenericName,
		entityClasses: GenericEntityClass | GenericEntityClass[],
	) {
		return new EntityObjecter(
			name,
			entityClasses instanceof Array
				? entityClasses
				: [entityClasses],
			[],
		);
	}

	public static makeZodSchema<
		GenericEntityClass extends EntityClass<any, any>,
	>(Entity: GenericEntityClass): ZodType<InstanceType<GenericEntityClass>> {
		return zod
			.object(
				Object
					.entries(Entity.propertiesDefinition as EntityPropertiesDefinition)
					.reduce<Record<string, ZodType>>(
						(pv, [key, value]) => ({
							...pv,
							[key]: value.toZodSchema(),
						}),
						{},
					),
			)
			.transform(
				(entityProperties) => new Entity(entityProperties),
			) as never;
	}
}

export type GetEntityProperties<
	GenericEntityInstance extends EntityClass<any, any, any>,
> = GenericEntityInstance extends EntityClass<infer InferedEntityPropertiesDefinition, any, any>
	? SimplifyObjectTopLevel<
		EntityPropertiesDefinitionToEntityProperties<
			InferedEntityPropertiesDefinition
		>
	>
	: never;

export type EntityToSimpleObject<
	GenericEntityInstance extends EntityClass<any, any, any>,
> = ToSimpleObject<
	GetEntityProperties<
		GenericEntityInstance
	>
>;
