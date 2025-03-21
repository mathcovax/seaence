import { z as zod } from "zod";
import { EntityHandler } from "./entity";
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

	class User extends EntityHandler.create({
		firstName: firstNameType,
		lastName: lastNameType,
	}) {
		public getName() {
			return this.firstName;
		}
	}

	type check = ExpectType<
		typeof User.propertiesDefinition,
		{
			firstName: typeof firstNameType;
			lastName: typeof lastNameType;
		},
		"strict"
	>;

	expect(User.propertiesDefinition).toEqual({
		firstName: firstNameType,
		lastName: lastNameType,
	});

	const firstName = firstNameType.throwCreate("firstName");
	const lastName = lastNameType.throwCreate("lastName");

	it("create entity", () => {
		const user = new User({
			firstName,
			lastName,
		});

		type check = ExpectType<
			typeof user,
			{
				readonly firstName: ValueObject<"firstName", string>;
				readonly lastName: ValueObject<"lastName", string>;
			},
			"one-extends-two"
		>;

		expect(user).toMatchObject(
			{
				firstName,
				lastName,
			},
		);
	});

	it("update entity", () => {
		const newFirstName = firstNameType.throwCreate("newFirstName");

		const user = new User({
			firstName,
			lastName,
		});

		const updatedUser1 = user.update(
			{ firstName: newFirstName },
		);

		expect(updatedUser1).toMatchObject(
			{
				firstName: newFirstName,
				lastName,
			},
		);

		expect(updatedUser1.getUpdatedValues())
			.toEqual({
				firstName: newFirstName.value,
			});

		const newLastName = lastNameType.throwCreate("newLastName");

		const updatedUser2 = updatedUser1.update(
			{ lastName: newLastName },
		);

		expect(updatedUser2).toMatchObject(
			{
				firstName: newFirstName,
				lastName: newLastName,
			},
		);

		expect(updatedUser2.getUpdatedValues())
			.toEqual({
				firstName: newFirstName.value,
				lastName: newLastName.value,
			});
	});

	it("mapper entity", () => {
		const user1 = EntityHandler.mapper(
			User,
			{
				firstName: "firstName",
				lastName: "lastName",
			},
		);

		expect(user1).toMatchObject(
			{
				firstName,
				lastName,
			},
		);

		const user2 = EntityHandler.mapper(
			User,
			{
				firstName: "",
				lastName: "lastName",
			},
		);

		expect(user2).instanceOf(ValueObjectError);
	});

	it("throwMapper entity", () => {
		const user = EntityHandler.throwMapper(User, {
			firstName: "firstName",
			lastName: "lastName",
		});

		expect(user).toMatchObject(
			{
				firstName,
				lastName,
			},
		);

		expect(
			() => EntityHandler.throwMapper(User, {
				firstName: "",
				lastName: "lastName",
			}),
		).toThrowError(ValueObjectError);
	});

	it("unsafeMapper entity", () => {
		const user = EntityHandler.unsafeMapper(User, {
			firstName: "",
			lastName: "lastName",
		});

		expect(user).toMatchObject(
			{
				firstName: firstNameType.unsafeCreate(""),
				lastName,
			},
		);
	});

	it("toJSON", () => {
		const user = new User({
			firstName,
			lastName,
		});

		const jsonUser = user.toJSON();

		type check = ExpectType<
			typeof jsonUser,
			{
				firstName: string;
				lastName: string;
			},
			"strict"
		>;

		expect(jsonUser).toEqual(
			{
				firstName: "firstName",
				lastName: "lastName",
			},
		);
	});

	it("extends", () => {
		const date = new Date();
		const createdAtType = zod
			.date()
			.createValueObjecter("createdAt");

		class SubUser extends EntityHandler.create(
			{ createdAt: createdAtType },
			User,
		) { }

		type check1 = ExpectType<
			typeof SubUser.propertiesDefinition,
			{
				firstName: typeof firstNameType;
				lastName: typeof lastNameType;
				createdAt: typeof createdAtType;
			},
			"strict"
		>;

		const subUser = new SubUser({
			firstName,
			lastName,
			createdAt: createdAtType.unsafeCreate(date),
		});

		type check = ExpectType<
			typeof subUser,
			{
				readonly firstName: ValueObject<"firstName", string>;
				readonly lastName: ValueObject<"lastName", string>;
				readonly createdAt: ValueObject<"createdAt", Date>;
			},
			"one-extends-two"
		>;

		expect(subUser).toMatchObject(
			{
				firstName,
				lastName,
				createdAt: createdAtType.unsafeCreate(date),
			},
		);

		expect(subUser.getName()).toBe(firstName);

		const jsonUser = subUser.toJSON();

		type check2 = ExpectType<
			typeof jsonUser,
			{
				firstName: string;
				lastName: string;
				createdAt: Date;
			},
			"strict"
		>;

		expect(jsonUser).toEqual(
			{
				firstName: "firstName",
				lastName: "lastName",
				createdAt: date,
			},
		);

		expect(subUser).instanceof(SubUser);
		expect(subUser).instanceof(User);
	});
});
