import { z as zod } from "zod";
import { AttributeError, applyAttributes, EntityHandler, type GetEntityProperties } from "./entity";
import { type ExpectType } from "@duplojs/utils";
import { ValueObjectError, type ValueObject } from "./valueObject";

describe("entity", () => {
	const firstNameType = zod
		.string()
		.min(1)
		.createValueObjecter("firstName");

	const lastNameType = zod
		.string()
		.createValueObjecter("lastName");

	const createdAtType = zod
		.date()
		.createValueObjecter("createdAt");

	const firstName = firstNameType.throwCreate("firstName");
	const lastName = lastNameType.throwCreate("lastName");
	const date = new Date();
	const createdAt = createdAtType.throwCreate(date);

	class User extends EntityHandler.create({
		firstName: firstNameType,
		lastName: lastNameType,
		createdAt: createdAtType,
	}) {
		public getName() {
			return this.firstName;
		}
	}

	describe("normal", () => {
		it("properties definition equal", () => {
			type check = ExpectType<
				typeof User.propertiesDefinition,
				{
					firstName: typeof firstNameType;
					lastName: typeof lastNameType;
					createdAt: typeof createdAtType;
				},
				"strict"
			>;

			expect(User.propertiesDefinition).toEqual({
				firstName: firstNameType,
				lastName: lastNameType,
				createdAt: createdAtType,
			});
		});

		it("create entity", () => {
			const user = new User({
				firstName,
				lastName,
				createdAt,
			});

			type check = ExpectType<
				GetEntityProperties<typeof user>,
				{
					firstName: ValueObject<"firstName", string>;
					lastName: ValueObject<"lastName", string>;
					createdAt: ValueObject<"createdAt", Date>;
				},
				"strict"
			>;

			expect(user).toMatchObject(
				{
					firstName,
					lastName,
					createdAt,
				},
			);
		});

		it("update entity", () => {
			const newFirstName = firstNameType.throwCreate("newFirstName");

			const user = new User({
				firstName,
				lastName,
				createdAt,
			});

			const updatedUser1 = user.update(
				{ firstName: newFirstName },
			);

			expect(updatedUser1).toMatchObject(
				{
					firstName: newFirstName,
					lastName,
					createdAt,
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
					createdAt,
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
					createdAt: date,
				},
			);

			expect(user1).toMatchObject(
				{
					firstName,
					lastName,
					createdAt,
				},
			);

			const user2 = EntityHandler.mapper(
				User,
				{
					firstName: "",
					lastName: "lastName",
					createdAt: date,
				},
			);

			expect(user2).instanceOf(ValueObjectError);
		});

		it("throwMapper entity", () => {
			const user = EntityHandler.throwMapper(
				User,
				{
					firstName: "firstName",
					lastName: "lastName",
					createdAt: date,
				},
			);

			expect(user).toMatchObject(
				{
					firstName,
					lastName,
					createdAt,
				},
			);

			expect(
				() => EntityHandler.throwMapper(
					User,
					{
						firstName: "",
						lastName: "lastName",
						createdAt: date,
					},
				),
			).toThrowError(ValueObjectError);
		});

		it("unsafeMapper entity", () => {
			const user = EntityHandler.unsafeMapper(
				User,
				{
					firstName: "",
					lastName: "lastName",
					createdAt: date,
				},
			);

			expect(user).toMatchObject(
				{
					firstName: firstNameType.unsafeCreate(""),
					lastName,
					createdAt,
				},
			);
		});

		it("toSimpleObject", () => {
			const user = new User({
				firstName,
				lastName,
				createdAt,
			});

			const simpleUser = user.toSimpleObject();

			type check = ExpectType<
				typeof simpleUser,
				{
					firstName: string;
					lastName: string;
					createdAt: Date;
				},
				"strict"
			>;

			expect(simpleUser).toEqual(
				{
					firstName: "firstName",
					lastName: "lastName",
					createdAt: date,
				},
			);
		});

		it("toJSON", () => {
			const user = new User({
				firstName,
				lastName,
				createdAt,
			});

			const jsonUser = user.toJSON();

			type check = ExpectType<
				typeof jsonUser,
				{
					firstName: string;
					lastName: string;
					createdAt: string;
				},
				"strict"
			>;

			expect(jsonUser).toEqual(
				{
					firstName: "firstName",
					lastName: "lastName",
					createdAt: date.toJSON(),
				},
			);
		});
	});

	describe("extends", () => {
		const pseudoType = zod
			.string()
			.createValueObjecter("pseudo");
		const pseudo = pseudoType.throwCreate("mathcovax");

		class SubUser extends EntityHandler.create(
			{
				pseudo: pseudoType,
			},
			User,
		) {}

		it("properties definition equal", () => {
			type check = ExpectType<
				typeof SubUser.propertiesDefinition,
				{
					firstName: typeof firstNameType;
					lastName: typeof lastNameType;
					createdAt: typeof createdAtType;
					pseudo: typeof pseudoType;
				},
				"strict"
			>;

			expect(SubUser.propertiesDefinition).toEqual({
				firstName: firstNameType,
				lastName: lastNameType,
				createdAt: createdAtType,
				pseudo: pseudoType,
			});
		});

		it("create entity", () => {
			const user = new SubUser({
				firstName,
				lastName,
				createdAt,
				pseudo,
			});

			type check = ExpectType<
				GetEntityProperties<typeof user>,
				{
					firstName: ValueObject<"firstName", string>;
					lastName: ValueObject<"lastName", string>;
					createdAt: ValueObject<"createdAt", Date>;
					pseudo: ValueObject<"pseudo", string>;
				},
				"strict"
			>;

			expect(user).toEqual(
				new SubUser({
					firstName,
					lastName,
					createdAt,
					pseudo,
				}),
			);
		});

		it("update entity", () => {
			const newFirstName = firstNameType.throwCreate("newFirstName");

			const user = new SubUser({
				firstName,
				lastName,
				createdAt,
				pseudo,
			});

			const updatedUser1 = user.update(
				{ firstName: newFirstName },
			);

			expect(updatedUser1).toMatchObject(
				{
					firstName: newFirstName,
					lastName,
					createdAt,
					pseudo,
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
					createdAt,
					pseudo,
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
				SubUser,
				{
					firstName: "firstName",
					lastName: "lastName",
					createdAt: date,
					pseudo: "mathcovax",
				},
			);

			expect(user1).toMatchObject(
				{
					firstName,
					lastName,
					createdAt,
					pseudo,
				},
			);

			const user2 = EntityHandler.mapper(
				SubUser,
				{
					firstName: "",
					lastName: "lastName",
					createdAt: date,
					pseudo: "mathcovax",
				},
			);

			expect(user2).instanceOf(ValueObjectError);
		});

		it("throwMapper entity", () => {
			const user = EntityHandler.throwMapper(
				SubUser,
				{
					firstName: "firstName",
					lastName: "lastName",
					createdAt: date,
					pseudo: "mathcovax",
				},
			);

			expect(user).toMatchObject(
				{
					firstName,
					lastName,
					createdAt,
					pseudo,
				},
			);

			expect(
				() => EntityHandler.throwMapper(
					SubUser,
					{
						firstName: "",
						lastName: "lastName",
						createdAt: date,
						pseudo: "mathcovax",
					},
				),
			).toThrowError(ValueObjectError);
		});

		it("unsafeMapper entity", () => {
			const user = EntityHandler.unsafeMapper(
				SubUser,
				{
					firstName: "",
					lastName: "lastName",
					createdAt: date,
					pseudo: "mathcovax",
				},
			);

			expect(user).toMatchObject(
				{
					firstName: firstNameType.unsafeCreate(""),
					lastName,
					createdAt,
					pseudo,
				},
			);
		});

		it("toSimpleObject", () => {
			const user = new SubUser({
				firstName,
				lastName,
				createdAt,
				pseudo,
			});

			const simpleUser = user.toSimpleObject();

			type check = ExpectType<
				typeof simpleUser,
				{
					firstName: string;
					lastName: string;
					createdAt: Date;
					pseudo: string;
				},
				"strict"
			>;

			expect(simpleUser).toEqual(
				{
					firstName: "firstName",
					lastName: "lastName",
					createdAt: date,
					pseudo: "mathcovax",
				},
			);
		});

		it("toJSON", () => {
			const user = new SubUser({
				firstName,
				lastName,
				createdAt,
				pseudo,
			});

			const jsonUser = user.toJSON();

			type check = ExpectType<
				typeof jsonUser,
				{
					firstName: string;
					lastName: string;
					createdAt: string;
					pseudo: string;
				},
				"strict"
			>;

			expect(jsonUser).toEqual(
				{
					firstName: "firstName",
					lastName: "lastName",
					createdAt: date.toJSON(),
					pseudo: "mathcovax",
				},
			);
		});
	});

	describe("optional", () => {
		const pseudoType = zod
			.string()
			.createValueObjecter("pseudo").nullable();

		class SubUser extends EntityHandler.create(
			{
				pseudo: pseudoType,
			},
			User,
		) {}

		it("properties definition equal", () => {
			type check = ExpectType<
				typeof SubUser.propertiesDefinition,
				{
					firstName: typeof firstNameType;
					lastName: typeof lastNameType;
					createdAt: typeof createdAtType;
					pseudo: typeof pseudoType;
				},
				"strict"
			>;

			expect(SubUser.propertiesDefinition).toEqual({
				firstName: firstNameType,
				lastName: lastNameType,
				createdAt: createdAtType,
				pseudo: pseudoType,
			});
		});

		it("create entity", () => {
			const user = new SubUser({
				firstName,
				lastName,
				createdAt,
				pseudo: null,
			});

			type check = ExpectType<
				GetEntityProperties<typeof user>,
				{
					firstName: ValueObject<"firstName", string>;
					lastName: ValueObject<"lastName", string>;
					createdAt: ValueObject<"createdAt", Date>;
					pseudo: ValueObject<"pseudo", string> | null;
				},
				"strict"
			>;

			expect(user).toEqual(
				new SubUser({
					firstName,
					lastName,
					createdAt,
					pseudo: null,
				}),
			);
		});

		it("update entity", () => {
			const newFirstName = firstNameType.throwCreate("newFirstName");

			const user = new SubUser({
				firstName,
				lastName,
				createdAt,
				pseudo: null,
			});

			const updatedUser1 = user.update(
				{ firstName: newFirstName },
			);

			expect(updatedUser1).toMatchObject(
				{
					firstName: newFirstName,
					lastName,
					createdAt,
					pseudo: null,
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
					createdAt,
					pseudo: null,
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
				SubUser,
				{
					firstName: "firstName",
					lastName: "lastName",
					createdAt: date,
					pseudo: null,
				},
			);

			expect(user1).toMatchObject(
				{
					firstName,
					lastName,
					createdAt,
					pseudo: null,
				},
			);

			const user2 = EntityHandler.mapper(
				SubUser,
				{
					firstName: "",
					lastName: "lastName",
					createdAt: date,
					pseudo: null,
				},
			);

			expect(user2).instanceOf(ValueObjectError);
		});

		it("throwMapper entity", () => {
			const user = EntityHandler.throwMapper(
				SubUser,
				{
					firstName: "firstName",
					lastName: "lastName",
					createdAt: date,
					pseudo: null,
				},
			);

			expect(user).toMatchObject(
				{
					firstName,
					lastName,
					createdAt,
					pseudo: null,
				},
			);

			expect(
				() => EntityHandler.throwMapper(
					SubUser,
					{
						firstName: "",
						lastName: "lastName",
						createdAt: date,
						pseudo: "toto",
					},
				),
			).toThrowError(ValueObjectError);
		});

		it("unsafeMapper entity", () => {
			const user = EntityHandler.unsafeMapper(
				SubUser,
				{
					firstName: "",
					lastName: "lastName",
					createdAt: date,
					pseudo: null,
				},
			);

			expect(user).toMatchObject(
				{
					firstName: firstNameType.unsafeCreate(""),
					lastName,
					createdAt,
					pseudo: null,
				},
			);
		});

		it("toSimpleObject", () => {
			const user = new SubUser({
				firstName,
				lastName,
				createdAt,
				pseudo: null,
			});

			const simpleUser = user.toSimpleObject();

			type check = ExpectType<
				typeof simpleUser,
				{
					firstName: string;
					lastName: string;
					createdAt: Date;
					pseudo: string | null;
				},
				"strict"
			>;

			expect(simpleUser).toEqual(
				{
					firstName: "firstName",
					lastName: "lastName",
					createdAt: date,
					pseudo: null,
				},
			);
		});

		it("toJSON", () => {
			const user = new SubUser({
				firstName,
				lastName,
				createdAt,
				pseudo: null,
			});

			const jsonUser = user.toJSON();

			type check = ExpectType<
				typeof jsonUser,
				{
					firstName: string;
					lastName: string;
					createdAt: string;
					pseudo: string | null;
				},
				"strict"
			>;

			expect(jsonUser).toEqual(
				{
					firstName: "firstName",
					lastName: "lastName",
					createdAt: date.toJSON(),
					pseudo: null,
				},
			);
		});
	});

	it("applyAttributes", () => {
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
