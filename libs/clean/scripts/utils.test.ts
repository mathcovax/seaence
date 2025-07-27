import { applyAttributes, AttributeError, createAsyncRetry } from "./utils";
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

	it("createAsyncRetry", async() => {
		const fn = vi.fn(() => Promise.resolve(0));

		fn
			.mockImplementationOnce(() => Promise.resolve(1))
			.mockImplementationOnce(() => Promise.resolve(3));

		const functionWithRetry1 = createAsyncRetry(
			fn,
			(result) => result < 2,
			{ maxRetry: 2 },
		);

		expect(await functionWithRetry1()).toBe(3);
		expect(fn).toBeCalledTimes(2);

		fn.mockReset();

		fn
			.mockImplementationOnce(() => Promise.resolve(1))
			.mockImplementationOnce(() => Promise.resolve(2))
			.mockImplementationOnce(() => Promise.resolve(3));

		const functionWithRetry2 = createAsyncRetry(
			fn,
			(result) => result < 2,
			{ maxRetry: 2 },
		);

		expect(await functionWithRetry2()).toBe(2);
		expect(fn).toBeCalledTimes(2);
	});
});
