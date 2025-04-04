import { applyAttributes, AttributeError } from "./utils";
import { z as zod } from "zod";
import "./valueObject";

describe("utils", () => {
	it("applyAttributes", () => {
		const firstNameType = zod
			.string()
			.min(1)
			.createValueObjecter("firstName");

		expect(
			applyAttributes(
				(value) => firstNameType.create(value),
				firstNameType.name,
				"test",
				[],
			),
		)
			.toEqual(firstNameType.create("test"));

		expect(
			applyAttributes(
				(value) => firstNameType.create(value),
				firstNameType.name,
				"test",
				["nullable"],
			),
		)
			.toEqual(firstNameType.create("test"));

		expect(
			applyAttributes(
				(value) => firstNameType.create(value),
				firstNameType.name,
				null,
				["nullable"],
			),
		)
			.toEqual(null);

		expect(
			applyAttributes(
				(value) => firstNameType.create(value),
				firstNameType.name,
				["test"],
				["array"],
			),
		)
			.toEqual([firstNameType.create("test")]);

		expect(
			applyAttributes(
				(value) => firstNameType.create(value),
				firstNameType.name,
				null,
				["nullable", "array"],
			),
		)
			.toEqual(null);

		expect(
			applyAttributes(
				(value) => firstNameType.create(value),
				firstNameType.name,
				null,
				["nullable", "array"],
			),
		)
			.toEqual(null);

		expect(
			applyAttributes(
				(value) => firstNameType.create(value),
				firstNameType.name,
				[],
				["nullable", "array"],
			),
		)
			.toEqual([]);

		expect(
			applyAttributes(
				(value) => firstNameType.create(value),
				firstNameType.name,
				"toto",
				["array"],
			),
		)
			.toEqual(new AttributeError("firstName", "array"));
	});
});
