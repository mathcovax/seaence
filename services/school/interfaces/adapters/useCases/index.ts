import { C } from "@duplojs/utils";

import * as Ports from "../ports";

import * as PostUseCases from "@applications/useCases/post";
import * as AnswerUseCases from "@applications/useCases/answer";
import * as AuthorUseCases from "@applications/useCases/author";

export const useCases = C.useCaseInstances(
	{
		...PostUseCases,
		...AnswerUseCases,
		...AuthorUseCases,
	},
	Ports,
);
