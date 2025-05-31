import { type Text, UsecaseHandler, type PositiveInt } from "@vendors/clean";
import { favoriEquationRepository } from "../../repositories/favoriEquation";
import { type UserId } from "@business/domains/common/user";

interface Input {
	userId: UserId;
	partialFavoriEquationName: Text;
	page: PositiveInt;
	quantityPerPage: PositiveInt;
}

export class SearchFavoriEquationUsecase extends UsecaseHandler.create({
	favoriEquationRepository,
}) {
	public execute({ partialFavoriEquationName, page, quantityPerPage, userId }: Input) {
		return this.favoriEquationRepository.findFavoriEquations({
			userId,
			partialFavoriEquationName,
			quantityPerPage,
			page,
		});
	}
}
