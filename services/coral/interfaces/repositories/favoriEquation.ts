import { uuidv7 } from "uuidv7";
import { favoriEquationRepository } from "@business/applications/repositories/favoriEquation";
import { FavoriEquationEntity, favoriEquationIdObjecter } from "@business/domains/entities/favoriEquation";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, intObjecter } from "@vendors/clean";

const one = 1;

favoriEquationRepository.default = {
	generateFavoriEquationId() {
		return favoriEquationIdObjecter.unsafeCreate(uuidv7());
	},
	async save(favoriEquationEntity) {
		const simpleFavoriEquation = favoriEquationEntity.toSimpleObject();

		await mongo.favoriEquation.updateOne(
			{
				id: simpleFavoriEquation.id,
			},
			{
				$set: {
					...simpleFavoriEquation,
					createdAt: new Date(),
				},
			},
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
	async searchFavoriEquationPerPageWhereNameIs(input) {
		const { userId, favoriEquationName, page, quantityPerPage } = input;

		const query = {
			userId,
			name: favoriEquationName,
		};

		const numberOfEqation = await mongo.favoriEquation
			.countDocuments(query)
			.then(
				(numberOfEqation) => intObjecter.unsafeCreate(numberOfEqation),
			);

		const mongoFavoriEquations = await mongo.favoriEquation
			.find(query)
			.skip((page.value - one) * quantityPerPage.value)
			.limit(quantityPerPage.value)
			.toArray();

		const favoriEquations = mongoFavoriEquations.map(
			(mongoFavoriEquation) => EntityHandler.unsafeMapper(
				FavoriEquationEntity,
				mongoFavoriEquation,
			),
		);

		return {
			favoriEquations,
			numberOfEqation,
		};
	},
};
