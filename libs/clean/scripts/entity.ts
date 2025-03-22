import { type ValueObject, ValueObjectError, type ValueObjecter } from "./valueObject";
import { simpleClone, type UnionToIntersection, type SimplifyObjectTopLevel, type AnyFunction } from "@duplojs/utils";

export type EntityPropertiesDefinition = Record<string, ValueObjecter>;

export type EntityPropertiesDefinitionToEntityProperties<
	GenericPropertiesDefinition extends EntityPropertiesDefinition,
> = {
	[Prop in keyof GenericPropertiesDefinition]: ReturnType<GenericPropertiesDefinition[Prop]["unsafeCreate"]>
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
		[Prop in keyof GenericProperties]: GenericProperties[Prop]["value"]
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
	toJSON(): SimplifyObjectTopLevel<
		EntityPropertiesToRawProperties<GenericProperties>
	>;
	getUpdatedValues(): EntityUpdatedValues<GenericProperties>;
}

export type EntityInstance<
	GenericProperties extends EntityProperties,
	GenericInheritMethod extends Record<string, AnyFunction>,
> = GenericProperties
	& GenericInheritMethod
	& EntityInstanceMethods<GenericProperties>;

export interface EntityClass<
	GenericPropertiesDefinition extends EntityPropertiesDefinition = EntityPropertiesDefinition,
	GenericProperties extends EntityProperties = EntityProperties,
	GenericInheritMethod extends Record<string, AnyFunction> = {},
> {
	new(
		properties: GenericProperties
	): EntityInstance<
		GenericProperties,
		GenericInheritMethod
	>;

	propertiesDefinition: GenericPropertiesDefinition;
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
		setProperty(object, prop, (properties as Record<string, ValueObject>)[prop].value);
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
				return {
					...entityPropertiesToRawProperties(this, propertiesDefinitionKeys),
					...entityPropertiesToRawProperties(this, parentPropertiesDefinitionKeys),
				};
			}

			public getUpdatedValues() {
				return simpleClone(this[updatedValuesKey]);
			}
		}

		type ParentMethods = {
			[
			Prop in Exclude<
				keyof InstanceType<GenericEntityParent>,
					| keyof GenericEntityParent["propertiesDefinition"]
					| keyof EntityInstanceMethods
			>
			]: InstanceType<GenericEntityParent>[Prop]
		};

		return Entity as unknown as EntityClass<
			PropertiesDefinition,
			Properties,
			ParentMethods
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

					return {
						...pv,
						[key]: propertiesDefinition[key].throwCreate(value),
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

					return {
						...pv,
						[key]: propertiesDefinition[key].unsafeCreate(value),
					};
				},
				{} as EntityPropertiesDefinitionToRawProperties<GenericEntity["propertiesDefinition"]>,
			);

		return new Entity(properties);
	}
}

export type GetEntityProperties<
	GenericEntityInstance extends EntityInstance<any, any>,

> = {
	[
	Prop in keyof GenericEntityInstance as
	GenericEntityInstance[Prop] extends ValueObject
		? Prop
		: never
	]: GenericEntityInstance[Prop]
};
