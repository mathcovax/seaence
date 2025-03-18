import { z as zod } from "zod";
import { createEntityHandler } from "./entity";
import { type ExpectType } from "@duplojs/utils";
import { type GetValueObject, ValueObjectError, type ValueObject } from "./valueObject";

describe("entity", () => {
	const firstNameType = zod
		.string()
		.min(1)
		.createValueObjecter("firstName");

	const lastNameType = zod
		.string()
		.createValueObjecter("lastName");

	const userEntityHandler = createEntityHandler(
		"user",
		{
			firstName: firstNameType,
			lastName: lastNameType,
		},
	);

	const firstName = firstNameType.throwCreate("firstName");
	const lastName = lastNameType.throwCreate("lastName");

	it("create entity", () => {
		const user = userEntityHandler.create({
			firstName,
			lastName,
		});

		type check = ExpectType<
			Pick<
				typeof user,
				"_entityName" | "_new" | "firstName" | "lastName"
			>,
			{
				readonly _entityName: "user";
				readonly firstName: ValueObject<"firstName", string>;
				readonly lastName: ValueObject<"lastName", string>;
				readonly _new: boolean;
			},
			"strict"
		>;

		expect(user).toMatchObject(
			{
				_entityName: "user",
				firstName,
				lastName,
				_new: false,
			},
		);
	});

	it("update entity", () => {
		const newFirstName = firstNameType.throwCreate("newFirstName");

		const user = userEntityHandler.create({
			firstName,
			lastName,
		});

		const updatedUser1 = userEntityHandler.update(
			user,
			{ firstName: newFirstName },
		);

		expect(updatedUser1).toMatchObject(
			{
				_entityName: "user",
				firstName: newFirstName,
				lastName,
				_new: false,
				_updatedValues: {
					firstName: newFirstName,
				},
			},
		);

		const newLastName = lastNameType.throwCreate("newLastName");

		const updatedUser2 = userEntityHandler.update(
			updatedUser1,
			{ lastName: newLastName },
		);

		expect(updatedUser2).toMatchObject(
			{
				_entityName: "user",
				firstName: newFirstName,
				lastName: newLastName,
				_new: false,
				_updatedValues: {
					firstName: newFirstName,
					lastName: newLastName,
				},
			},
		);
	});

	it("mapper entity", () => {
		const user1 = userEntityHandler.mapper({
			firstName: "firstName",
			lastName: "lastName",
		});

		expect(user1).toMatchObject(
			{
				_entityName: "user",
				firstName,
				lastName,
				_new: false,
			},
		);

		const user2 = userEntityHandler.mapper({
			firstName: "",
			lastName: "lastName",
		});

		expect(user2).instanceOf(ValueObjectError);
	});

	it("throwMapper entity", () => {
		const user1 = userEntityHandler.throwMapper({
			firstName: "firstName",
			lastName: "lastName",
		});

		expect(user1).toMatchObject(
			{
				_entityName: "user",
				firstName,
				lastName,
				_new: false,
			},
		);

		expect(
			() => userEntityHandler.throwMapper({
				firstName: "",
				lastName: "lastName",
			}),
		).toThrowError(ValueObjectError);
	});

	it("unsafeMapper entity", () => {
		const user = userEntityHandler.unsafeMapper({
			firstName: "",
			lastName: "lastName",
		});

		expect(user).toMatchObject(
			{
				_entityName: "user",
				firstName: firstNameType.unsafeCreate(""),
				lastName,
				_new: false,
			},
		);
	});

	it("creatorOf", () => {
		const user = userEntityHandler.create({
			firstName,
			lastName,
		});

		expect(userEntityHandler.creatorOf(user)).toBe(true);
	});

	describe("new entity", () => {
		it("without constructor", () => {
			type check = ExpectType<
				Parameters<
					typeof userEntityHandler.new
				>,
				[
					{
						firstName: GetValueObject<typeof firstNameType>;
						lastName: GetValueObject<typeof lastNameType>;
					},
				],
				"strict"
			>;

			const user = userEntityHandler.new({
				firstName,
				lastName,
			});

			expect(user).toMatchObject(
				{
					_entityName: "user",
					firstName,
					lastName,
					_new: true,
				},
			);
		});

		it("with constructor", () => {
			const createdAtType = zod
				.date()
				.createValueObjecter("createdAt");

			const date = new Date();

			const userEntityHandler = createEntityHandler(
				"user",
				{
					firstName: firstNameType,
					lastName: lastNameType,
					createdAt: createdAtType,
				},
				(
					input: {
						firstName: GetValueObject<typeof firstNameType>;
						lastName: GetValueObject<typeof lastNameType>;
					},
				) => ({
					...input,
					createdAt: createdAtType.unsafeCreate(date),
				}),
			);

			type check = ExpectType<
				Parameters<
					typeof userEntityHandler.new
				>,
				[
					{
						firstName: GetValueObject<typeof firstNameType>;
						lastName: GetValueObject<typeof lastNameType>;
					},
				],
				"strict"
			>;

			const user = userEntityHandler.new({
				firstName,
				lastName,
			});

			expect(user).toMatchObject(
				{
					_entityName: "user",
					firstName,
					lastName,
					createdAt: createdAtType.unsafeCreate(date),
					_new: true,
				},
			);
		});
	});
});
