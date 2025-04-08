import { tokenRepository } from "@business/applications/repositories/token";
import { tokenObjecter } from "@business/domains/entities/token";
import { envs } from "@interfaces/envs";
import jwt from "jsonwebtoken";

const { JWT_KEY, JWT_TIME } = envs;

tokenRepository.default = {
	generateToken(user) {
		const { id, email } = user;
		const payload = { content: `${id.value}${email.value}` };

		const accessToken = jwt.sign(
			payload,
			JWT_KEY,
			{ expiresIn: JWT_TIME },
		);

		return tokenObjecter.unsafeCreate(accessToken);
	},
	checkToken(token) {
		try {
			const { value: content } = jwt.verify(
				token.value,
				JWT_KEY,
			) as jwt.JwtPayload;

			if (!content) {
				throw new Error("Missing content of access token.");
			}

			return token;
		} catch {
			return null;
		}
	},

	save() {
		throw new Error("Cannot save token.");
	},
};
