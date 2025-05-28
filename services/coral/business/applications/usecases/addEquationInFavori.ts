import { UsecaseHandler } from "@vendors/clean";
import { favoriEquationRepository } from "../repositories/favoriEquation";
import { type UserId } from "@business/domains/common/user";
import { type Equation } from "@business/domains/common/equation";
import { FavoriEquationEntity, type FavoriEquationName } from "@business/domains/entities/favoriEquation";

interface Input {
	userId: UserId;
	equation: Equation;
	equationName: FavoriEquationName;
}

export class AddEquationInFavoriUsecase extends UsecaseHandler.create({
	favoriEquationRepository,
}) {
	public async execute({ userId, equation, equationName }: Input) {
		const favoriEquation = FavoriEquationEntity.create({
			id: this.favoriEquationRepository.generateFavoriEquationId(),
			userId,
			equation,
			name: equationName,
		});

		await this.favoriEquationRepository.save(favoriEquation);
	}
}
