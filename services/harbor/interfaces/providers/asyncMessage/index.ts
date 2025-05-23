import { envs } from "@interfaces/envs";
import { AsyncMessage } from "@vendors/async-message";

export const asyncMessage = new AsyncMessage({
	currentServiceName: envs.SERVICE_NAME,
	mongoUrl: envs.ASYNC_MESSAGE_MONGO_URL,
});

if (envs.DB_CONNECTION) {
	await asyncMessage.connect();
}
