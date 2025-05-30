import { UsecaseHandler } from "@vendors/clean";
import { favoriEquationRepository } from "../../repositories/favoriEquation";
import { type FavoriEquationEntity } from "@business/domains/entities/favoriEquation";

interface Input {
	favoriEquation: FavoriEquationEntity;
}

export class RemoveEquationInFavoriUsecase extends UsecaseHandler.create({
	favoriEquationRepository,
}) {
	public async execute({ favoriEquation }: Input) {
		await this.favoriEquationRepository.deleteFavoriEquation(favoriEquation);
	}
}
