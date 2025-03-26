import { z as zod } from "zod";
import { ValueObject, ValueObjecter, ValueObjectError } from "./valueObject";

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
});
