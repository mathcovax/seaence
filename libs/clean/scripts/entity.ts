import { toJSON, type ToJSON } from "./utils";
import { type ValueObject, type ValueObjectError, type ValueObjecter, type ValueObjecterAttribute } from "./valueObject";
import { simpleClone, type UnionToIntersection, type SimplifyObjectTopLevel, type AnyFunction, type IsEqual } from "@duplojs/utils";

export type ApplyValueObjecterAttribute<
	GenericValue extends unknown,
	GenericValueObjecterAttribute extends unknown[],
> = GenericValueObjecterAttribute extends [infer InferedLast, ...unknown[]]
	? InferedLast extends "array"
		? GenericValueObjecterAttribute extends [unknown, ...infer InferedRest]
			? ApplyValueObjecterAttribute<GenericValue[], InferedRest>
			: never
		: InferedLast extends "nullable"
			? GenericValueObjecterAttribute extends [unknown, ...infer InferedRest]
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

export type EntityUpdatedValues<
	GenericPropertiesDefinition extends EntityPropertiesDefinition = EntityPropertiesDefinition,
> = Partial<
	EntityPropertiesToRawProperties<
		GenericPropertiesDefinition
	>
>;

const updatedValuesKey = Symbol("updatedValues");

export interface EntityInstanceMethods<
	GenericPropertiesDefinition extends EntityPropertiesDefinition = EntityPropertiesDefinition,
	GenericProperties extends EntityProperties = EntityProperties,
> {
	update(
		values: SimplifyObjectTopLevel<
			Partial<GenericProperties>
		>
	): this;
	toJSON(): ToJSON<
		SimplifyObjectTopLevel<this>
	>;
	toSimpleObject(): SimplifyObjectTopLevel<
		EntityPropertiesToRawProperties<GenericPropertiesDefinition>
	>;
	getUpdatedValues(): EntityUpdatedValues<GenericPropertiesDefinition>;
}

export type EntityInstance<
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
	GenericProperties extends EntityProperties,
	GenericInheritProperties extends Record<string, AnyFunction>,
> = GenericProperties
	& EntityInstanceMethods<
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

function entityPropertiesToRawProperties(
	properties: object,
	props?: string[],
): Record<string, any> {
	const object = {};
	const eachableProps = props ?? Object.keys(properties);

	for (const prop of eachableProps) {
		setProperty(object, prop, (properties as Record<string, ValueObject>)[prop]?.value ?? null);
	}

	return object;
}

type MybePromise<
	GenericValue extends unknown,
> = GenericValue | GenericValue[];

export function applyAttributes(
	getValue: (rawValue: any) => ValueObject | ValueObjectError,
	valueObjecterName: string,
	rawValue: any,
	attributes: ValueObjecterAttribute[],
): MybePromise<
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
		Parent: GenericEntityParent = (class {}) as any,
	) {
		const propertiesDefinitionKeys = Object.keys(propertiesDefinition);
		const parentPropertiesDefinitionKeys = Object.keys(Parent?.propertiesDefinition ?? {});

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

			public [updatedValuesKey]: EntityUpdatedValues = {};

			public constructor(input: Properties) {
				// eslint-disable-next-line constructor-super
				super(input);

				for (const prop of propertiesDefinitionKeys) {
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
					...entityPropertiesToRawProperties(values),
				};

				return updatedEntity;
			}

			public toJSON() {
				return toJSON({ ...this });
			}

			public toSimpleObject() {
				return {
					...entityPropertiesToRawProperties(this, propertiesDefinitionKeys),
					...entityPropertiesToRawProperties(this, parentPropertiesDefinitionKeys),
				};
			}

			public getUpdatedValues() {
				return simpleClone(this[updatedValuesKey]);
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
		GenericEntity extends EntityClass<any, any>,
	>(
		Entity: GenericEntity,
		rawProperties: EntityPropertiesDefinitionToRawProperties<GenericEntity["propertiesDefinition"]>,
	): InstanceType<GenericEntity> | ValueObjectError | AttributeError {
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
				{} as EntityPropertiesDefinitionToRawProperties<GenericEntity["propertiesDefinition"]> | ValueObjectError | AttributeError,
			);

		if (properties instanceof Error) {
			return properties;
		}

		return new Entity(properties);
	}

	public static throwMapper<
		GenericEntity extends EntityClass<any, any>,
	>(
		Entity: GenericEntity,
		rawProperties: EntityPropertiesDefinitionToRawProperties<GenericEntity["propertiesDefinition"]>,
	): InstanceType<GenericEntity> {
		const result = this.mapper(Entity, rawProperties);

		if (result instanceof Error) {
			throw result;
		}

		return result;
	}

	public static unsafeMapper<
		GenericEntity extends EntityClass<any, any>,
	>(
		Entity: GenericEntity,
		rawProperties: EntityPropertiesDefinitionToRawProperties<GenericEntity["propertiesDefinition"]>,
	): InstanceType<GenericEntity> {
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
				{} as EntityPropertiesDefinitionToRawProperties<GenericEntity["propertiesDefinition"]> | ValueObjectError | AttributeError,
			);

		return new Entity(properties);
	}

	public static instanceof<
		GenericEntity extends EntityClass<any, any>,
	>(
		Entity: GenericEntity,
		entity: EntityInstance<any, any, any>,
	): entity is GenericEntity {
		return entity instanceof Entity;
	}
}

export type GetEntityProperties<
	GenericEntityInstance extends EntityInstance<any, any, any>,
> = SimplifyObjectTopLevel<
	{
		[
		Prop in keyof GenericEntityInstance as
		ValueObject<any, any> extends GenericEntityInstance[Prop]
			? Prop
			: never
		]: GenericEntityInstance[Prop]
	}
>;
