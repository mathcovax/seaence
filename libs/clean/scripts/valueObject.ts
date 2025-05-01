import { ZodEnum, type ZodError, type ZodLiteral, ZodType, type ZodTypeDef, type infer as zodInfer, z as zod } from "zod";
import { applyAttributesToZodSchema, type ApplyValueObjecterAttribute, toJSON, toSimpleObject } from "./utils";
import { type EntityClass } from "./entity";

declare module "zod" {
	interface ZodType<
		Output = any,
		Def extends ZodTypeDef = ZodTypeDef,
		Input = Output,
	> {
		createValueObjecter<
			GenericName extends string,
		>(name: GenericName): ValueObjecter<
			GenericName,
			this,
			[]
		> ;
	}
}

ZodType.prototype.createValueObjecter = function<
	GenericName extends string,
>(name: GenericName) {
	return new ValueObjecter(name, this, []);
};

export class ValueObject<
	GenericName extends string = string,
	GenericType extends unknown = any,
> {
	public constructor(
		public readonly _name: GenericName,
		public readonly value: GenericType,
	) {}

	public toJSON() {
		return toJSON(this.value as GenericType extends infer R ? R : never);
	}

	public toSimpleObject() {
		return toSimpleObject<
			GenericType
		>(
			this.value,
		);
	}
}

export class ValueObjectError<
	GenericName extends string = string,
> extends Error {
	public constructor(
		public readonly valueObjectName: GenericName,
		public readonly zodError: ZodError,
	) {
		super(zodError.message);
	}
}

export type ValueObjecterAttribute = "nullable" | "array";

function specifyObjecter(this: ValueObjecter, value: unknown) {
	if (this.zodSchema instanceof ZodEnum) {
		return new ValueObjecter(
			this.name,
			value instanceof Array
				? zod.enum(value as never)
				: zod.literal(value as never),
			this.attributes,
		);
	} else {
		throw new Error("Unsupport specify.");
	}
}

export class ValueObjecter<
	GenericName extends string = string,
	GenericZodSchema extends ZodType = ZodType,
	GenericAttribute extends ValueObjecterAttribute[] = ValueObjecterAttribute[],
> {
	public constructor(
		public readonly name: GenericName,
		public readonly zodSchema: GenericZodSchema,
		public readonly attributes: GenericAttribute,
	) {}

	public declination<
		GenericDeclinationName extends string,
	>(declinationName: GenericDeclinationName) {
		return new ValueObjecter(
			declinationName,
			this.zodSchema,
			this.attributes,
		);
	}

	public unknownCreate(rawData: unknown):
		| ValueObject<GenericName, zodInfer<GenericZodSchema>>
		| ValueObjectError<GenericName> {
		const { success, error, data } = this.zodSchema.safeParse(rawData);

		if (success) {
			return new ValueObject(this.name, data);
		} else {
			return new ValueObjectError(this.name, error);
		}
	}

	public unknownThrowCreate(rawData: unknown): ValueObject<
		GenericName,
		zodInfer<GenericZodSchema>
	> {
		const result = this.create(rawData);

		if (result instanceof ValueObjectError) {
			throw result;
		}

		return result;
	}

	public unknownUnsafeCreate(rawData: unknown): ValueObject<
		GenericName,
		zodInfer<GenericZodSchema>
	> {
		return new ValueObject(this.name, rawData);
	}

	public create(rawData: GenericZodSchema["_input"]) {
		return this.unknownCreate(rawData);
	}

	public throwCreate(rawData: GenericZodSchema["_input"]) {
		return this.unknownThrowCreate(rawData);
	}

	public unsafeCreate(rawData: GenericZodSchema["_input"]) {
		return this.unknownUnsafeCreate(rawData);
	}

	public getZodSchemaWithApplyedAttribute(): ZodType<
		ApplyValueObjecterAttribute<
			zodInfer<GenericZodSchema>,
			GenericAttribute
		>
	> {
		return applyAttributesToZodSchema(
			this.attributes,
			this.zodSchema,
		);
	}

	public toZodSchema(): ZodType<
		ApplyValueObjecterAttribute<
			ValueObject<
				GenericName,
				zodInfer<GenericZodSchema>
			>,
			GenericAttribute
		>
	> {
		return applyAttributesToZodSchema(
			this.attributes,
			this.zodSchema
				.transform(
					(value) => new ValueObject(
						this.name,
						value,
					),
				),
		);
	}

	public nullable() {
		return new ValueObjecter(
			this.name,
			this.zodSchema,
			["nullable", ...this.attributes] as const,
		);
	}

	public array() {
		return new ValueObjecter(
			this.name,
			this.zodSchema,
			["array", ...this.attributes] as const,
		);
	}

	public specify: GenericZodSchema extends ZodEnum<infer InferedValue>
		? <
			GenericEnumValue extends InferedValue[number] | [InferedValue[number], ...InferedValue[number][]],
		>(
			value: GenericEnumValue
		) => ValueObjecter<
			GenericName,
			GenericEnumValue extends [string, ...string[]]
				? ZodEnum<GenericEnumValue>
				: ZodLiteral<GenericEnumValue>,
			GenericAttribute
		>
		: never
		= specifyObjecter as never;
}

export type GetValueObject<
	GenericValueObjecter extends ValueObjecter | EntityObjecter,
> = ReturnType<GenericValueObjecter["unsafeCreate"]>;

export class EntityObjecter<
	GenericName extends string = string,
	GenericEntityClass extends EntityClass<any, any> = EntityClass<any, any>,
	GenericAttribute extends ValueObjecterAttribute[] = ValueObjecterAttribute[],
> extends ValueObjecter<
		GenericName,
		ZodType<InstanceType<GenericEntityClass>>,
		GenericAttribute
	> {
	public constructor(
		name: GenericName,
		public readonly entityClasses: GenericEntityClass[],
		attributes: GenericAttribute,
	) {
		super(
			name,
			zod.union(
				entityClasses.map(
					(entityClass) => zod.instanceof(entityClass),
				) as never,
			),
			attributes,
		);
	}

	public override toZodSchema(): ZodType<
		ApplyValueObjecterAttribute<
			ValueObject<
				GenericName,
				InstanceType<GenericEntityClass>
			>,
			GenericAttribute
		>
	> {
		return applyAttributesToZodSchema(
			this.attributes,
			zod.union(
				this.entityClasses.map(
					(entityClass: EntityClass) => zod
						.object(
							Object
								.entries(entityClass.propertiesDefinition)
								.reduce<Record<string, ZodType>>(
									(pv, [key, value]) => ({
										...pv,
										[key]: value.toZodSchema(),
									}),
									{},
								),
						)
						.transform(
							(entityProperties) => new ValueObject(
								this.name,
								new entityClass(entityProperties),
							),
						),
				) as never,
			),
		);
	}

	public override declination<
		GenericDeclinationName extends string,
	>(declinationName: GenericDeclinationName) {
		return new EntityObjecter(
			declinationName,
			this.entityClasses,
			this.attributes,
		);
	}

	public override nullable() {
		return new EntityObjecter(
			this.name,
			this.entityClasses,
			["nullable", ...this.attributes] as const,
		);
	}

	public override array() {
		return new EntityObjecter(
			this.name,
			this.entityClasses,
			["array", ...this.attributes] as const,
		);
	}
}
