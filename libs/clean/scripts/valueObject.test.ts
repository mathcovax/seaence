import { z as zod } from "zod";
import { ValueObject, ValueObjecter, ValueObjectError, EntityObjecter } from "./valueObject";
import { EntityHandler } from "./entity";

describe("valueObject", () => {
	const firstName = zod
		.string()
		.max(4)
		.createValueObjecter("firstName");

	it("create value object", () => {
		expect(
			firstName.create("test"),
		).toMatchObject(new ValueObject("firstName", "test"));

		expect(
			firstName.create("test1"),
		).instanceof(ValueObjectError);
	});

	it("throw create value object", () => {
		expect(
			firstName.throwCreate("test"),
		).toMatchObject(new ValueObject("firstName", "test"));

		expect(
			() => firstName.throwCreate("test1"),
		).toThrow(ValueObjectError);
	});

	it("create value object", () => {
		expect(
			firstName.unsafeCreate("test1111"),
		).toMatchObject(new ValueObject("firstName", "test1111"));
	});

	it("nullable objecter", () => {
		expect(
			firstName.nullable(),
		).toMatchObject(new ValueObjecter("firstName", firstName.zodSchema, ["nullable"]));
	});

	it("array objecter", () => {
		expect(
			firstName.array(),
		).toMatchObject(new ValueObjecter("firstName", firstName.zodSchema, ["array"]));
	});

	it("conbine objecter", () => {
		expect(
			firstName.array().nullable(),
		).toMatchObject(new ValueObjecter("firstName", firstName.zodSchema, ["nullable", "array"]));
	});

	it("EntityObjecter", () => {
		const firstNameType = zod
			.string()
			.min(1)
			.createValueObjecter("firstName");

		const lastNameType = zod
			.string()
			.createValueObjecter("lastName");

		const firstName = firstNameType.throwCreate("firstName");
		const lastName = lastNameType.throwCreate("lastName");

		class User extends EntityHandler.create({
			firstName: firstNameType,
			lastName: lastNameType,
		}) {}

		const entityObjecter = new EntityObjecter(
			"creator",
			[User],
			[],
		);

		const zodSchema = entityObjecter.toZodSchema();

		expect(
			zodSchema.parse(
				{
					firstName: "firstName",
					lastName: "lastName",
				},
			),
		).toEqual(
			new ValueObject(
				"creator",
				new User({
					firstName,
					lastName,
				}),
			),
		);
	});

	it("toZodSchema with attribute", () => {
		const firstName = new ValueObjecter("firstName", zod.string(), ["nullable", "array"] as const);
		const zodSchema = firstName.toZodSchema();

		expect(zodSchema.parse([])).toEqual([]);
		expect(zodSchema.parse(null)).toEqual(null);
		expect(zodSchema.parse(["toto"])).toEqual([new ValueObject("firstName", "toto")]);
	});
});
