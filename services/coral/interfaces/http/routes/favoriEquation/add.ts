import { equationObjecter } from "@business/domains/common/equation";
import { userIdObjecter } from "@business/domains/common/user";
import { favoriEquatioonNameObjecter } from "@business/domains/entities/favoriEquation";
import { addEquationInFavoriUsecase } from "@interfaces/usecase";

useBuilder()
	.createRoute("POST", "/add-equation-to-favorite")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			equation: equationObjecter.toZodSchema(),
			equationName: favoriEquatioonNameObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, equation, equationName } = pickup("body");

			await addEquationInFavoriUsecase.execute({
				userId,
				equation,
				equationName,
			});

			return new OkHttpResponse("eqaution.added-to-favorite");
		},
		makeResponseContract(OkHttpResponse, "eqaution.added-to-favorite"),
	);
