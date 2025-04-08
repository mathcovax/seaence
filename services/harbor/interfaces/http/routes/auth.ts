import { tokenRepository } from "@business/applications/repositories/token";
import { userRepository } from "@business/applications/repositories/user";
import { userUsernameObjecter } from "@business/domains/entities/user";
import { IWantFirebaseTokenValid } from "@interfaces/http/checkers/token";
import { endpointAuthSchema } from "@interfaces/http/schemas/auth";
import { createUserUsecase } from "@interfaces/usecases";

const EMAIL_USERNAME_PART_INDEX = 0;

useBuilder()
	.createRoute("POST", "/auth")
	.extract({
		body: zod.string(),
	})
	.presetCheck(
		IWantFirebaseTokenValid,
		(pickup) => pickup("body"),
	)
	.cut(
		async({ pickup, dropper }) => {
			const { email } = pickup("firebaseToken");

			let user = await userRepository.use.findOneByEmail(email);

			if (!user) {
				user = await createUserUsecase.execute({
					email,
					username: userUsernameObjecter.unsafeCreate(
						email.value.split("@")[EMAIL_USERNAME_PART_INDEX],
					),
				});
			}

			return dropper({ user });
		},
		["user"],
	)
	.handler(
		(pickup) => {
			const user = pickup("user");

			const { content } = tokenRepository.use.generateToken(user);

			return new CreatedHttpResponse(
				"user.logged",
				{ accessToken: content.value },
			);
		},
		makeResponseContract(CreatedHttpResponse, "user.logged", endpointAuthSchema),
	);
