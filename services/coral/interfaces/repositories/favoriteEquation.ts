import { FavoriteEquationRepository } from "@business/applications/repositories/favoriteEquation";
import { FavoriteEquation } from "@business/domains/entities/favoriteEquation";
import { A, C, D, escapeRegExp, toNative, unwrap, unwrapGroup } from "@duplojs/utils";
import { mongo } from "@interfaces/providers/mongo";
import { uuidv7 } from "uuidv7";

export const favoriteEquationRepository = FavoriteEquationRepository.createImplementation({
	generateId() {
		return FavoriteEquation.Id.createOrThrow(uuidv7());
	},
	async findOneById(id) {
		const result = await mongo.favoriteEquation.findOne({
			id: unwrap(id),
		});

		if (!result) {
			return C.none("favoriteEquation");
		}

		return C.some(FavoriteEquation.Entity.mapOrThrow(result));
	},
	async findMany(params) {
		const { userId, partialFavoriteEquationName, page, quantityPerPage } = unwrapGroup(params);
		const result = await mongo.favoriteEquation
			.find(
				{
					userId,
					name: {
						$regex: new RegExp(escapeRegExp(partialFavoriteEquationName), "i"),
					},
				},
			)
			.sort({ addedAt: -1 })
			.skip(page * quantityPerPage)
			.limit(quantityPerPage)
			.toArray();

		return A.map(
			result,
			FavoriteEquation.Entity.mapOrThrow,
		);
	},
	async findByName(params) {
		const { userId, favoriteEquationName: name } = unwrapGroup(params);

		const result = await mongo.favoriteEquation.findOne({
			userId,
			name,
		});

		if (!result) {
			return C.none("favoriteEquation");
		}

		return C.some(FavoriteEquation.Entity.mapOrThrow(result));
	},
	async remove(favoriteEquation) {
		await mongo.favoriteEquation.deleteOne({
			id: unwrap(favoriteEquation.id),
		});
	},
	async deleteAllByUserId(userId) {
		await mongo.favoriteEquation.deleteMany(
			{
				userId: unwrap(userId),
			},
		);
	},
	async countResultOfFindMany(params) {
		const { userId, partialFavoriteEquationName } = unwrapGroup(params);

		return mongo.favoriteEquation
			.countDocuments(
				{
					userId,
					name: {
						$regex: new RegExp(escapeRegExp(partialFavoriteEquationName), "i"),
					},
				},
			)
			.then(
				C.Int.createOrThrow,
			);
	},
	async save(entity) {
		const simpleEntity = C.unwrapEntity(entity, { transformer: toNative });

		await mongo.favoriteEquation.updateOne(
			{ id: simpleEntity.id },
			{
				$set: {
					...simpleEntity,
					updateAt: D.now(),

				},
			},
			{ upsert: true },
		);

		return entity;
	},
});
