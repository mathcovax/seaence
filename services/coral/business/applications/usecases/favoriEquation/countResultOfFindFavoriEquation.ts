import { type FavoriEquationName } from "@business/domains/entities/favoriEquation";
import { UsecaseHandler } from "@vendors/clean";
import { favoriEquationRepository } from "../../repositories/favoriEquation";
import { type UserId } from "@business/domains/common/user";

interface Input {
	userId: UserId;
	favoriEquationName: FavoriEquationName;
}

export class CountResultOfFindFavoriEquationUsecase extends UsecaseHandler.create({
	favoriEquationRepository,
}) {
	public execute({ favoriEquationName, userId }: Input) {
		return this.favoriEquationRepository.countResultOfFindFavoriEquation({
			userId,
			favoriEquationName,
		});
	}
}
