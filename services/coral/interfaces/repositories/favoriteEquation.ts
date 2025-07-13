import { uuidv7 } from "uuidv7";
import { favoriteEquationRepository } from "@business/applications/repositories/favoriteEquation";
import { FavoriteEquationEntity, favoriteEquationIdObjecter } from "@business/domains/entities/favoriteEquation";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, intObjecter } from "@vendors/clean";
import { escapeRegExp } from "@duplojs/utils";

favoriteEquationRepository.default = {
	generateFavoriteEquationId() {
		return favoriteEquationIdObjecter.unsafeCreate(uuidv7());
	},
	async save(favoriEquationEntity) {
		const simpleFavoriEquation = favoriEquationEntity.toSimpleObject();

		await mongo.favoriteEquation.updateOne(
			{ id: simpleFavoriEquation.id },
			{ $set: simpleFavoriEquation },
			{ upsert: true },
		);

		return favoriEquationEntity;
	},
	async delete(favoriteEquationEntity) {
		await mongo.favoriteEquation.deleteOne({
			id: favoriteEquationEntity.id.value,
		});
	},
	async findOneFavoriteEquationById(favoriteEquationId) {
		const favoriteEquation = await mongo.favoriteEquation.findOne({
			id: favoriteEquationId.value,
		});

		if (!favoriteEquation) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			FavoriteEquationEntity,
			favoriteEquation,
		);
	},
	async findOneFavoriteEquation(userId, favoriteEquationName) {
		const favoriteEquation = await mongo.favoriteEquation.findOne({
			userId: userId.value,
			name: favoriteEquationName.value,
		});

		if (!favoriteEquation) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			FavoriteEquationEntity,
			favoriteEquation,
		);
	},
	async findManyFavoriteEquation(input) {
		const { userId, partialFavoriteEquationName, page, quantityPerPage } = input;

		const mongoFavoriEquations = await mongo.favoriteEquation
			.find(
				{
					userId: userId.value,
					name: {
						$regex: new RegExp(escapeRegExp(partialFavoriteEquationName.value), "i"),
					},
				},
			)
			.sort({ addedAt: -1 })
			.skip(page.value * quantityPerPage.value)
			.limit(quantityPerPage.value)
			.toArray();

		const favoriEquations = mongoFavoriEquations.map(
			(mongoFavoriEquation) => EntityHandler.unsafeMapper(
				FavoriteEquationEntity,
				mongoFavoriEquation,
			),
		);

		return favoriEquations;
	},
	async countResultOfSearchFavoriteEquation(userId, partialFavoriteEquationName) {
		const numberOfFavoriEquation = await mongo.favoriteEquation
			.countDocuments(
				{
					userId: userId.value,
					name: {
						$regex: new RegExp(escapeRegExp(partialFavoriteEquationName.value), "i"),
					},
				},
			)
			.then(
				(numberOfFavoriEquation) => intObjecter.unsafeCreate(numberOfFavoriEquation),
			);

		return numberOfFavoriEquation;
	},
	async deleteAllByUserId(userId) {
		await mongo.favoriteEquation.deleteMany(
			{
				userId: userId.value,
			},
		);
	},
};
