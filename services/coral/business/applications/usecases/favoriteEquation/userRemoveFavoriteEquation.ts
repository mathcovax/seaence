import { UsecaseHandler } from "@vendors/clean";
import { favoriteEquationRepository } from "../../repositories/favoriteEquation";
import { type UserFavoriteEquation } from "./userFindFavoriteEquationById";

interface Input {
	userFavoriteEquation: UserFavoriteEquation;
}

export class UserRemoveFavoriteEquationUsecase extends UsecaseHandler.create({
	favoriEquationRepository: favoriteEquationRepository,
}) {
	public async execute({ userFavoriteEquation }: Input) {
		await this.favoriEquationRepository.delete(userFavoriteEquation.value);
	}
}
