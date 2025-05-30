import { type FavoriEquationName } from "@business/domains/entities/favoriEquation";
import { UsecaseHandler, type PositiveInt } from "@vendors/clean";
import { favoriEquationRepository } from "../../repositories/favoriEquation";
import { type UserId } from "@business/domains/common/user";

interface Input {
	userId: UserId;
	favoriEquationName: FavoriEquationName;
	page: PositiveInt;
	quantityPerPage: PositiveInt;
}

export class SearchFavoriEquationUsecase extends UsecaseHandler.create({
	favoriEquationRepository,
}) {
	public execute({ favoriEquationName, page, quantityPerPage, userId }: Input) {
		return this.favoriEquationRepository.searchFavoriEquationPerPageWhereNameIs({
			userId,
			favoriEquationName,
			quantityPerPage,
			page,
		});
	}
}
