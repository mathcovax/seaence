import { tokenRepository } from "@business/applications/repositories/token";
import { TokenEntity, tokenContentObjecter } from "@business/domains/entities/token";
import { envs } from "@interfaces/envs";
import jwt from "jsonwebtoken";

const { JWT_KEY, JWT_TIME } = envs;

tokenRepository.default = {
	generateToken: (user) => {
		const { id, email } = user;
		const payload = { content: `${id.value}${email.value}` };

		const accessToken = jwt.sign(
			payload,
			JWT_KEY,
			{ expiresIn: JWT_TIME },
		);

		return TokenEntity.create({
			content: tokenContentObjecter.unsafeCreate(accessToken),
		});
	},
	checkToken: (token) => {
		const flatToken = token.toSimpleObject();

		try {
			const { value } = jwt.verify(
				flatToken.content,
				JWT_KEY,
			) as jwt.JwtPayload;

			if (!value) {
				throw new Error("Missing value of access token.");
			}

			return token;
		} catch {
			return null;
		}
	},

	save: () => {
		throw new Error("Cannot save token.");
	},
};
