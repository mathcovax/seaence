import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { favoriEquationRepository } from "../../repositories/favoriEquation";
import { type UserId } from "@business/domains/common/user";
import { type Equation } from "@business/domains/common/equation";
import { FavoriEquationEntity, type FavoriEquationName } from "@business/domains/entities/favoriEquation";
import { FindFavoriEquationUsecase } from "./findFavoriEquation";

interface Input {
	userId: UserId;
	equation: Equation;
	favoriEquationName: FavoriEquationName;
}

export class CreateFavoriEquationUsecase extends UsecaseHandler.create({
	favoriEquationRepository,
	findFavoriEquationUsecase: FindFavoriEquationUsecase,
}) {
	public async execute({ userId, equation, favoriEquationName }: Input) {
		const findedFavoriEquation = await this.findFavoriEquationUsecase({
			userId,
			favoriEquationName,
		});

		if (findedFavoriEquation) {
			return new UsecaseError("favori-equation-name-already-use", { findedFavoriEquation });
		}

		const favoriEquation = FavoriEquationEntity.create({
			id: this.favoriEquationRepository.generateFavoriEquationId(),
			userId,
			equation,
			name: favoriEquationName,
		});

		await this.favoriEquationRepository.save(favoriEquation);

		return favoriEquation;
	}
}
