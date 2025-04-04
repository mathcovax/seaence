import { z as zod } from "zod";
import { EntityHandler, type EntityInstance } from "./entity";
import { type SimplifyObjectTopLevel, type ExpectType } from "@duplojs/utils";
import { ValueObject, ValueObjectError } from "./valueObject";

export type GetEntityProperties<
	GenericEntityInstance extends EntityInstance<any, any>,
> = SimplifyObjectTopLevel<
	{
		[
		Prop in keyof GenericEntityInstance as
		GenericEntityInstance[Prop] extends ValueObject<any, any> | null | ValueObject<any, any>[]
			? Prop
			: never
		]: GenericEntityInstance[Prop]
	}
>;

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

			expect(user).toMatchObject({
				firstName,
				lastName,
				createdAt,
			});
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

			const updatedEntity = updatedUser1.getUpdatedValues();

			type check = ExpectType<
				typeof updatedEntity,
				{
					firstName?: string | undefined;
					lastName?: string | undefined;
					createdAt?: Date | undefined;
				},
				"strict"
			>;

			expect(updatedEntity)
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

			expect(user).toMatchObject({
				firstName,
				lastName,
				createdAt,
				pseudo,
			});
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

			const updatedEntity = updatedUser1.getUpdatedValues();

			type check = ExpectType<
				typeof updatedEntity,
				{
					pseudo?: string | undefined;
					firstName?: string | undefined;
					lastName?: string | undefined;
					createdAt?: Date | undefined;
				},
				"strict"
			>;

			expect(updatedEntity)
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
			.createValueObjecter("pseudo")
			.nullable();

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

			expect(user).toMatchObject({
				firstName,
				lastName,
				createdAt,
				pseudo: null,
			});
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

			const updatedEntity = updatedUser1.getUpdatedValues();

			type check = ExpectType<
				typeof updatedEntity,
				{
					pseudo?: string | null | undefined;
					firstName?: string | undefined;
					lastName?: string | undefined;
					createdAt?: Date | undefined;
				},
				"strict"
			>;

			expect(updatedEntity)
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

	describe("array", () => {
		const subNameType = zod
			.string()
			.min(4)
			.createValueObjecter("subName")
			.array();

		const subName = subNameType.throwCreate("math");

		class SubUser extends EntityHandler.create(
			{
				subName: subNameType,
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
					subName: typeof subNameType;
				},
				"strict"
			>;

			expect(SubUser.propertiesDefinition).toEqual({
				firstName: firstNameType,
				lastName: lastNameType,
				createdAt: createdAtType,
				subName: subNameType,
			});
		});

		it("create entity", () => {
			const user = new SubUser({
				firstName,
				lastName,
				createdAt,
				subName: [subName],
			});

			type check = ExpectType<
				GetEntityProperties<typeof user>,
				{
					firstName: ValueObject<"firstName", string>;
					lastName: ValueObject<"lastName", string>;
					createdAt: ValueObject<"createdAt", Date>;
					subName: ValueObject<"subName", string>[];
				},
				"strict"
			>;

			expect(user).toMatchObject({
				firstName,
				lastName,
				createdAt,
				subName: [subName],
			});
		});

		it("update entity", () => {
			const newSubName = subNameType.throwCreate("toto");

			const user = new SubUser({
				firstName,
				lastName,
				createdAt,
				subName: [subName],
			});

			const updatedUser1 = user.update(
				{ subName: [newSubName] },
			);

			expect(updatedUser1).toMatchObject(
				{
					firstName,
					lastName,
					createdAt,
					subName: [newSubName],
				},
			);

			const updatedEntity = updatedUser1.getUpdatedValues();

			type check = ExpectType<
				typeof updatedEntity,
				{
					subName?: string[] | undefined;
					firstName?: string | undefined;
					lastName?: string | undefined;
					createdAt?: Date | undefined;
				},
				"strict"
			>;

			expect(updatedUser1.getUpdatedValues())
				.toEqual({
					subName: [newSubName.value],
				});

			const newLastName = lastNameType.throwCreate("newLastName");

			const updatedUser2 = updatedUser1.update(
				{ lastName: newLastName },
			);

			expect(updatedUser2).toMatchObject(
				{
					firstName,
					lastName: newLastName,
					createdAt,
					subName: [newSubName],
				},
			);

			expect(updatedUser2.getUpdatedValues())
				.toEqual({
					subName: [newSubName.value],
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
					subName: [subName.value],
				},
			);

			expect(user1).toMatchObject(
				{
					firstName,
					lastName,
					createdAt,
					subName: [subName],
				},
			);

			const user2 = EntityHandler.mapper(
				SubUser,
				{
					firstName: "firstName",
					lastName: "lastName",
					createdAt: date,
					subName: ["tot"],
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
					subName: [subName.value],
				},
			);

			expect(user).toMatchObject(
				{
					firstName,
					lastName,
					createdAt,
					subName: [subName],
				},
			);

			expect(
				() => EntityHandler.throwMapper(
					SubUser,
					{
						firstName: "firstName",
						lastName: "lastName",
						createdAt: date,
						subName: ["tot"],
					},
				),
			).toThrowError(ValueObjectError);
		});

		it("unsafeMapper entity", () => {
			const user = EntityHandler.unsafeMapper(
				SubUser,
				{
					firstName: "firstName",
					lastName: "lastName",
					createdAt: date,
					subName: ["tot"],
				},
			);

			expect(user).toMatchObject(
				{
					firstName,
					lastName,
					createdAt,
					subName: [subNameType.unsafeCreate("tot")],
				},
			);
		});

		it("toSimpleObject", () => {
			const user = new SubUser({
				firstName,
				lastName,
				createdAt,
				subName: [subName],
			});

			const simpleUser = user.toSimpleObject();

			type check = ExpectType<
				typeof simpleUser,
				{
					firstName: string;
					lastName: string;
					createdAt: Date;
					subName: string[];
				},
				"strict"
			>;

			expect(simpleUser).toEqual(
				{
					firstName: "firstName",
					lastName: "lastName",
					createdAt: date,
					subName: [subName.value],
				},
			);
		});

		it("toJSON", () => {
			const user = new SubUser({
				firstName,
				lastName,
				createdAt,
				subName: [subName],
			});

			const jsonUser = user.toJSON();

			type check = ExpectType<
				typeof jsonUser,
				{
					firstName: string;
					lastName: string;
					createdAt: string;
					subName: string[];
				},
				"strict"
			>;

			expect(jsonUser).toEqual(
				{
					firstName: "firstName",
					lastName: "lastName",
					createdAt: date.toJSON(),
					subName: [subName.value],
				},
			);
		});
	});

	describe("with author entity", () => {
		const creatorType = zod
			.instanceof(User)
			.createValueObjecter("creator");

		const creator = creatorType.throwCreate(
			new User({
				firstName,
				lastName,
				createdAt,
			}),
		);

		class Post extends EntityHandler.create({
			creator: creatorType,
		}) {}

		it("properties definition equal", () => {
			type check = ExpectType<
				typeof Post.propertiesDefinition,
				{
					creator: typeof creatorType;
				},
				"strict"
			>;

			expect(Post.propertiesDefinition).toEqual({
				creator: creatorType,
			});
		});

		it("create entity", () => {
			const post = new Post({
				creator,
			});

			type check = ExpectType<
				GetEntityProperties<typeof post>,
				{
					creator: ValueObject<"creator", User>;
				},
				"strict"
			>;

			expect(post).toMatchObject({
				creator,
			});
		});

		it("update entity", () => {
			const user = new User({
				firstName: firstNameType.throwCreate("math"),
				lastName,
				createdAt,
			});

			const newCreator = creatorType.throwCreate(user);

			const post = new Post({
				creator,
			});

			const updatedPost = post.update(
				{ creator: newCreator },
			);

			expect(updatedPost).toMatchObject(
				{ creator: newCreator },
			);

			const updatedFields = updatedPost.getUpdatedValues();

			type check = ExpectType<
				typeof updatedFields,
				{
					creator?: {
						firstName: string;
						lastName: string;
						createdAt: Date;
					} | undefined;
				},
				"strict"
			>;

			expect(updatedFields)
				.toEqual({
					creator: {
						firstName: "math",
						lastName: lastName.value,
						createdAt: date,
					},
				});
		});

		it("mapper entity", () => {
			const post1 = EntityHandler.mapper(
				Post,
				{
					creator: creator.value,
				},
			);

			expect(post1).toMatchObject(
				{
					creator,
				},
			);

			const post2 = EntityHandler.mapper(
				Post,
				{
					creator: Date as any,
				},
			);

			expect(post2).instanceOf(ValueObjectError);
		});

		it("throwMapper entity", () => {
			const post = EntityHandler.throwMapper(
				Post,
				{
					creator: creator.value,
				},
			);

			expect(post).toMatchObject(
				{
					creator,
				},
			);

			expect(
				() => EntityHandler.throwMapper(
					Post,
					{
						creator: Date as any,
					},
				),
			).toThrowError(ValueObjectError);
		});

		it("unsafeMapper entity", () => {
			const post = EntityHandler.unsafeMapper(
				Post,
				{
					creator: Date as any,
				},
			);

			expect(post).toMatchObject(
				{
					creator: new ValueObject("creator", Date),
				},
			);
		});

		it("toSimpleObject", () => {
			const post = new Post({
				creator,
			});

			const simplePost = post.toSimpleObject();

			type check = ExpectType<
				typeof simplePost,
				{
					creator: {
						firstName: string;
						lastName: string;
						createdAt: Date;
					};
				},
				"strict"
			>;

			expect(simplePost).toEqual(
				{
					creator: {
						firstName: "firstName",
						lastName: "lastName",
						createdAt: date,
					},
				},
			);
		});

		it("toJSON", () => {
			const post = new Post({
				creator,
			});

			const jsonUser = post.toJSON();

			type check = ExpectType<
				typeof jsonUser,
				{
					creator: {
						firstName: string;
						lastName: string;
						createdAt: string;
					};
				},
				"strict"
			>;

			expect(jsonUser).toEqual(
				{
					creator: {
						firstName: "firstName",
						lastName: "lastName",
						createdAt: date.toJSON(),
					},
				},
			);
		});
	});
});
