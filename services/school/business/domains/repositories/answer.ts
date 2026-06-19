import type { C } from "@duplojs/utils";
import type { Answer } from "../entities/answer";
import type { Post } from "@domains/entities/post";

interface FindManyAvailableByAvailablePostParams {
	post: Post.AvailableEntity;
	page: C.PositiveInt;
	quantityPerPage: C.StrictPositiveInt;
}

export interface AnswerRepository {
	generateId(): Answer.Id & C.Evidence<"generated">;
	findOldestUnprocessed(): Promise<
		C.Maybe<Answer.Entity & Answer.Unprocessed> & C.Evidence<"oldest-unprocessed">
	>;
	findManyAvailableByAvailablePost(params: FindManyAvailableByAvailablePostParams): Promise<
		{ answers: Answer.AvailableEntity[] } & C.Evidence<"many-available">
	>;
}
