import { UsecaseHandler } from "@vendors/clean";
import { favoriEquationRepository } from "../../repositories/favoriEquation";
import { type UserId } from "@business/domains/common/user";
import { type FavoriEquationName } from "@business/domains/entities/favoriEquation";

interface Input {
	userId: UserId;
	favoriEquationName: FavoriEquationName;
}

export class FindFavoriEquationUsecase extends UsecaseHandler.create({
	favoriEquationRepository,
}) {
	public async execute({ userId, favoriEquationName }: Input) {
		return this.favoriEquationRepository.findFavoriEquation(userId, favoriEquationName);
	}
}
