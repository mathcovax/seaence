import { userIdObjecter, type UserEntity } from "@business/domains/entities/user";
import { ZodAccelerator } from "@duplojs/core";
import { envs } from "@interfaces/envs";
import jwt from "jsonwebtoken";

const { JWT_KEY, JWT_TIME } = envs;

export class AccessToken {
	public static readonly payloadSchema = ZodAccelerator.build(
		zod.object({
			userId: userIdObjecter.toZodSchema(),
		}),
	);

	public static generateToken(user: UserEntity) {
		const { id } = user;

		const payload: ReturnType<typeof AccessToken["payloadSchema"]["parse"]> = {
			userId: id,
		};

		return jwt.sign(
			payload,
			JWT_KEY,
			{ expiresIn: JWT_TIME },
		);
	}

	public static checkToken(token: string) {
		try {
			const payload = jwt.verify(
				token,
				JWT_KEY,
			);

			return AccessToken.payloadSchema.parse(payload);
		} catch {
			return null;
		}
	}
}
