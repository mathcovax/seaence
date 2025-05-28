import { UsecaseHandler } from "@vendors/clean";
import { favoriEquationRepository } from "../repositories/favoriEquation";
import { type FavoriEquationId } from "@business/domains/entities/favoriEquation";

interface Input {
	favoriEquationId: FavoriEquationId;
}

export class FindEquationInFavoriUsecase extends UsecaseHandler.create({
	favoriEquationRepository,
}) {
	public async execute({ favoriEquationId }: Input) {
		return this.favoriEquationRepository.findFavoriEquationById(favoriEquationId);
	}
}
