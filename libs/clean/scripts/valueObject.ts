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

export interface ValueObjecter<
	GenericName extends string = string,
	GenericZodSchema extends ZodType = ZodType,
> {
	readonly name: GenericName;
	create(data: zodInfer<GenericZodSchema>):
		| ValueObjectError<GenericName>
		| ValueObject<
			GenericName,
			zodInfer<GenericZodSchema>
		>;
	throwCreate(data: zodInfer<GenericZodSchema>):
		| ValueObject<
			GenericName,
			zodInfer<GenericZodSchema>
		>;
	unsafeCreate(data: zodInfer<GenericZodSchema>):
		| ValueObject<
			GenericName,
			zodInfer<GenericZodSchema>
		>;
	toZodSchema():
		| ZodType<
			ValueObject<
				GenericName,
				zodInfer<GenericZodSchema>
			>
		>;
	readonly zodSchema: GenericZodSchema;
	readonly [valueObjecterBrand]: true;
}

export type GetValueObject<
	GenericValueObjecter extends ValueObjecter,
> = ReturnType<GenericValueObjecter["unsafeCreate"]>;

ZodType.prototype.createValueObjecter = function<
	GenericName extends string,
>(name: GenericName) {
	return {
		name,
		create(rawData) {
			const { success, error, data } = this.zodSchema.safeParse(rawData);

			if (success) {
				return new ValueObject(name, data);
			} else {
				return new ValueObjectError(name, error);
			}
		},
		throwCreate(rawData) {
			const result = this.create(rawData);

			if (result instanceof ValueObjectError) {
				throw result;
			}

			return result;
		},
		unsafeCreate(rawData) {
			return new ValueObject(name, rawData);
		},
		toZodSchema() {
			return this.zodSchema
				.transform(
					(value) => new ValueObject(
						this.name,
						value,
					),
				);
		},
		zodSchema: this,
		[valueObjecterBrand]: true,
	};
};
