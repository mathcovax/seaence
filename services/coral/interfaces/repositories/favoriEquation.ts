import { uuidv7 } from "uuidv7";
import { favoriEquationRepository } from "@business/applications/repositories/favoriEquation";
import { FavoriEquationEntity, favoriEquationIdObjecter } from "@business/domains/entities/favoriEquation";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, intObjecter } from "@vendors/clean";
import { escapeRegExp } from "@duplojs/utils";

const one = 1;

favoriEquationRepository.default = {
	generateFavoriEquationId() {
		return favoriEquationIdObjecter.unsafeCreate(uuidv7());
	},
	async save(favoriEquationEntity) {
		const simpleFavoriEquation = favoriEquationEntity.toSimpleObject();

		await mongo.favoriEquation.updateOne(
			{ id: simpleFavoriEquation.id },
			{ $set: simpleFavoriEquation },
			{ upsert: true },
		);

		return favoriEquationEntity;
	},
	async deleteFavoriEquation(favoriEquationEntity) {
		const { id } = favoriEquationEntity.toSimpleObject();

		await mongo.favoriEquation.deleteOne({
			id,
		});
	},
	async findFavoriEquationById(favoriEquationId) {
		const favoriEquation = await mongo.favoriEquation.findOne({
			id: favoriEquationId,
		});

		if (!favoriEquation) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			FavoriEquationEntity,
			favoriEquation,
		);
	},
	async findFavoriEquations(input) {
		const { userId, favoriEquationName, page, quantityPerPage } = input;

		const mongoFavoriEquations = await mongo.favoriEquation
			.find(
				{
					userId,
					name: {
						$regex: escapeRegExp(favoriEquationName.value),
						options: "i",
					},
				},
			)
			.sort({ addedAt: -1 })
			.skip((page.value - one) * quantityPerPage.value)
			.limit(quantityPerPage.value)
			.toArray();

		const favoriEquations = mongoFavoriEquations.map(
			(mongoFavoriEquation) => EntityHandler.unsafeMapper(
				FavoriEquationEntity,
				mongoFavoriEquation,
			),
		);

		return favoriEquations;
	},
	async countResultOfFindFavoriEquation(input) {
		const { userId, favoriEquationName } = input;

		const numberOfFavoriEquation = await mongo.favoriEquation
			.countDocuments(
				{
					userId,
					name: {
						$regex: escapeRegExp(favoriEquationName.value),
						options: "i",
					},
				},
			)
			.then(
				(numberOfFavoriEquation) => intObjecter.unsafeCreate(numberOfFavoriEquation),
			);

		return numberOfFavoriEquation;
	},
};
