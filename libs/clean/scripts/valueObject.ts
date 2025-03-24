import { type ZodError, ZodType, type infer as zodInfer } from "zod";

declare module "zod" {
	interface ZodType {
		createValueObjecter<
			GenericName extends string,
		>(name: GenericName): ValueObjecter<GenericName, this>;
	}
}

const valueObjectBrand = Symbol("brand");

export class ValueObject<
	GenericName extends string = string,
	GenericType extends unknown = unknown,
> {
	public constructor(
		public readonly _name: GenericName,
		public readonly value: GenericType,
	) {}

	public readonly [valueObjectBrand] = true;
}

const valueObjectErrorBrand = Symbol("brand");

export class ValueObjectError<
	GenericName extends string = string,
> extends Error {
	public constructor(
		public readonly valueObjectName: GenericName,
		public readonly zodError: ZodError,
	) {
		super(zodError.message);
	}

	public readonly [valueObjectErrorBrand] = true;
}

const valueObjecterBrand = Symbol("brand");

export class ValueObjecter<
	GenericName extends string = string,
	GenericZodSchema extends ZodType = ZodType,
> {
	public readonly [valueObjecterBrand] = true;

	public constructor(
		public readonly name: GenericName,
		public readonly zodSchema: GenericZodSchema,

	) {}

	public create(rawData: zodInfer<GenericZodSchema>):
		| ValueObjectError<GenericName>
		| ValueObject<
			GenericName,
			zodInfer<GenericZodSchema>
		> {
		const { success, error, data } = this.zodSchema.safeParse(rawData);

		if (success) {
			return new ValueObject(this.name, data);
		} else {
			return new ValueObjectError(this.name, error);
		}
	}

	public throwCreate(rawData: zodInfer<GenericZodSchema>):
		| ValueObject<
			GenericName,
			zodInfer<GenericZodSchema>
		> {
		const result = this.create(rawData);

		if (result instanceof ValueObjectError) {
			throw result;
		}

		return result;
	}

	public unsafeCreate(rawData: zodInfer<GenericZodSchema>):
		| ValueObject<
			GenericName,
			zodInfer<GenericZodSchema>
		> {
		return new ValueObject(this.name, rawData);
	}

	public toZodSchema():
		| ZodType<
			ValueObject<
				GenericName,
				zodInfer<GenericZodSchema>
			>
		> {
		return this.zodSchema
			.transform(
				(value) => new ValueObject(
					this.name,
					value,
				),
			);
	}

	public nullable(): NullableValueObjecter<
		GenericName,
		GenericZodSchema
	> {
		return new NullableValueObjecter(this.name, this.zodSchema);
	}
}

const nullableValueObjecterBrand = Symbol("brand");

export class NullableValueObjecter<
	GenericName extends string = string,
	GenericZodSchema extends ZodType = ZodType,
> extends ValueObjecter<
		GenericName,
		GenericZodSchema
	> {
	public readonly [nullableValueObjecterBrand] = true;
}

export type GetValueObject<
	GenericValueObjecter extends ValueObjecter,
> = ReturnType<GenericValueObjecter["unsafeCreate"]>;

ZodType.prototype.createValueObjecter = function<
	GenericName extends string,
>(name: GenericName) {
	return new ValueObjecter(name, this);
};
