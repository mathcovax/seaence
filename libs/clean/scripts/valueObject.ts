import { type ZodEffects, type ZodError, ZodType, type ZodTypeDef, type infer as zodInfer } from "zod";
import { toJSON } from "./utils";

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
			ZodType<
				Output
			>,
			[]
		> ;
	}
}

export class ValueObject<
	GenericName extends string = string,
	GenericType extends unknown = any,
> {
	public constructor(
		public readonly _name: GenericName,
		public readonly value: GenericType,
	) {}

	public toJSON() {
		return toJSON<
			GenericType extends infer R ? R : never
		>(this.value as never);
	}

	public toSimpleObject() {
		return this.value;
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

	public toZodSchema() {
		return this.zodSchema
			.transform(
				(value) => new ValueObject<
					GenericName,
					zodInfer<GenericZodSchema>
				>(
					this.name,
					value as never,
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
}

export type GetValueObject<
	GenericValueObjecter extends ValueObjecter,
> = | ReturnType<GenericValueObjecter["unsafeCreate"]>;

ZodType.prototype.createValueObjecter = function<
	GenericName extends string,
>(name: GenericName) {
	return new ValueObjecter(name, this, []);
};
