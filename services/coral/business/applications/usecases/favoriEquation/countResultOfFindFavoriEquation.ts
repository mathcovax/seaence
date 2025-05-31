import { type Text, UsecaseHandler } from "@vendors/clean";
import { favoriEquationRepository } from "../../repositories/favoriEquation";
import { type UserId } from "@business/domains/common/user";

interface Input {
	userId: UserId;
	partialsfavoriEquationName: Text;
}

export class CountResultOfFindFavoriEquationUsecase extends UsecaseHandler.create({
	favoriEquationRepository,
}) {
	public execute({ partialsfavoriEquationName, userId }: Input) {
		return this.favoriEquationRepository.countResultOfFindFavoriEquation(
			userId,
			partialsfavoriEquationName,
		);
	}
}
