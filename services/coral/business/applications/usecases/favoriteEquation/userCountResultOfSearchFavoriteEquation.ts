import { type Text, UsecaseHandler } from "@vendors/clean";
import { favoriteEquationRepository } from "../../repositories/favoriteEquation";
import { type UserId } from "@business/domains/common/user";

interface Input {
	userId: UserId;
	partialFavoriteEquationName: Text;
}

export class UserCountResultOfSearchFavoriteEquationUsecase extends UsecaseHandler.create({
	favoriteEquationRepository,
}) {
	public execute({ partialFavoriteEquationName, userId }: Input) {
		return this.favoriteEquationRepository.countResultOfSearchFavoriteEquation(
			userId,
			partialFavoriteEquationName,
		);
	}
}
