import { type Text, UsecaseHandler, type PositiveInt, type Int } from "@vendors/clean";
import { favoriteEquationRepository } from "../../repositories/favoriteEquation";
import { type UserId } from "@business/domains/common/user";

interface Input {
	userId: UserId;
	partialFavoriteEquationName: Text;
	page: Int;
	quantityPerPage: PositiveInt;
}

export class UserSearchFavoriteEquationUsecase extends UsecaseHandler.create({
	favoriEquationRepository: favoriteEquationRepository,
}) {
	public execute({ partialFavoriteEquationName, page, quantityPerPage, userId }: Input) {
		return this.favoriEquationRepository.searchFavoriteEquations({
			userId,
			partialFavoriteEquationName,
			quantityPerPage,
			page,
		});
	}
}
