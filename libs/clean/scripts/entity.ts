import { toJSON, type ToJSON } from "./utils";
import { NullableValueObjecter, type ValueObject, ValueObjectError, type ValueObjecter } from "./valueObject";
import { simpleClone, type UnionToIntersection, type SimplifyObjectTopLevel, type AnyFunction, type IsEqual } from "@duplojs/utils";

export type EntityPropertiesDefinition = Record<string, ValueObjecter | NullableValueObjecter>;

export type EntityPropertiesDefinitionToEntityProperties<
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
> = {
	[Prop in keyof GenericPropertiesDefinition]: GenericPropertiesDefinition[Prop] extends NullableValueObjecter
		? ReturnType<GenericPropertiesDefinition[Prop]["unsafeCreate"]> | null
		: ReturnType<GenericPropertiesDefinition[Prop]["unsafeCreate"]>
};

export type EntityProperties = EntityPropertiesDefinitionToEntityProperties<EntityPropertiesDefinition>;

export type EntityPropertiesDefinitionToRawProperties<
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
> = EntityPropertiesToRawProperties<
	EntityPropertiesDefinitionToEntityProperties<
		GenericPropertiesDefinition
	>
>;

export type EntityPropertiesToRawProperties<
	GenericProperties extends EntityProperties,
> = SimplifyObjectTopLevel<
	{
		[Prop in keyof GenericProperties]: null extends GenericProperties[Prop]
			? Extract<GenericProperties[Prop], ValueObject>["value"] | null
			: GenericProperties[Prop]["value"]
	}
>;

export type EntityUpdatedValues<
	GenericProperties extends EntityProperties= EntityProperties,
> = Partial<
	EntityPropertiesToRawProperties<
		GenericProperties
	>
>;

const updatedValuesKey = Symbol("updatedValues");

export interface EntityInstanceMethods<
	GenericProperties extends EntityProperties = EntityProperties,
> {
	update(
		values: SimplifyObjectTopLevel<
			Partial<GenericProperties>
		>
	): this;
	toJSON(): ToJSON<
		EntityPropertiesToRawProperties<GenericProperties>
	>;
	toSimpleObject(): SimplifyObjectTopLevel<
		EntityPropertiesToRawProperties<GenericProperties>
	>;
	getUpdatedValues(): EntityUpdatedValues<GenericProperties>;
}

export type EntityInstance<
	GenericProperties extends EntityProperties,
	GenericInheritProperties extends Record<string, AnyFunction>,
> = GenericProperties
	& EntityInstanceMethods<GenericProperties>
	& GenericInheritProperties;

export interface EntityClass<
	GenericPropertiesDefinition extends EntityPropertiesDefinition = EntityPropertiesDefinition,
	GenericProperties extends EntityProperties = EntityProperties,
	GenericInheritProperties extends Record<string, AnyFunction> = {},
> {
	new(
		properties: GenericProperties
	): EntityInstance<
		GenericProperties,
		GenericInheritProperties
	>;

	readonly propertiesDefinition: GenericPropertiesDefinition;
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
				return toJSON(this.toSimpleObject());
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
	): InstanceType<GenericEntity> | ValueObjectError {
		const properties = Object.entries(rawProperties)
			.reduce(
				(pv, [key, value]) => {
					if (pv instanceof ValueObjectError) {
						return pv;
					}

					const propertiesDefinition: EntityPropertiesDefinition = Entity.propertiesDefinition;
					const propertyDefinition = propertiesDefinition[key];

					if (propertyDefinition instanceof NullableValueObjecter && value === null) {
						return {
							...pv,
							[key]: null,
						};
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
				{} as EntityPropertiesDefinitionToRawProperties<GenericEntity["propertiesDefinition"]> | ValueObjectError,
			);

		if (properties instanceof ValueObjectError) {
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
		const properties = Object.entries(rawProperties)
			.reduce(
				(pv, [key, value]) => {
					const propertiesDefinition: EntityPropertiesDefinition = Entity.propertiesDefinition;
					const propertyDefinition = propertiesDefinition[key];

					return {
						...pv,
						[key]: propertyDefinition instanceof NullableValueObjecter && value === null
							? null
							: propertiesDefinition[key].throwCreate(value),
					};
				},
				{} as EntityPropertiesDefinitionToRawProperties<GenericEntity["propertiesDefinition"]>,
			);

		return new Entity(properties);
	}

	public static unsafeMapper<
		GenericEntity extends EntityClass<any, any>,
	>(
		Entity: GenericEntity,
		rawProperties: EntityPropertiesDefinitionToRawProperties<GenericEntity["propertiesDefinition"]>,
	): InstanceType<GenericEntity> {
		const properties = Object.entries(rawProperties)
			.reduce(
				(pv, [key, value]) => {
					const propertiesDefinition: EntityPropertiesDefinition = Entity.propertiesDefinition;
					const propertyDefinition = propertiesDefinition[key];

					return {
						...pv,
						[key]: propertyDefinition instanceof NullableValueObjecter && value === null
							? null
							: propertyDefinition.unsafeCreate(value),
					};
				},
				{} as EntityPropertiesDefinitionToRawProperties<GenericEntity["propertiesDefinition"]>,
			);

		return new Entity(properties);
	}

	public static instanceof<
		GenericEntity extends EntityClass<any, any>,
	>(
		Entity: GenericEntity,
		entity: EntityInstance<any, any>,
	): entity is GenericEntity {
		return entity instanceof Entity;
	}
}

export type GetEntityProperties<
	GenericEntityInstance extends EntityInstance<any, any>,
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
