import type { User } from "@/lib/horizon/types/user";
import type { FindHttpClientRoute } from "@duplojs/http-client";

const accessTokenLocalStorageKey = "accessToken";
const user = ref<User | null>(null);

type RequestInformation = FindHttpClientRoute<HorizonClientRoute, "POST", "/user">["response"];
const externalPromisedRequestInformation = ref(createExternalPromise<RequestInformation>());

const { refresh } = useWindow();

export function useUserInformation() {
	const accessTokenItem = useLocalStorageItem<string>(accessTokenLocalStorageKey);

	function setAccessToken(accessToken: string) {
		accessTokenItem.value = accessToken;
	}

	function disconect() {
		accessTokenItem.value = null;
		refresh();
	}

	const isConnected = computed(() => !!user.value);

	const accessToken = computed(() => accessTokenItem.value);

	function fetchInformation() {
		const externalPromise = createExternalPromise<RequestInformation>();

		externalPromisedRequestInformation.value.resolve(externalPromise.promise);
		externalPromisedRequestInformation.value = externalPromise;

		const result = window.horizonClient
			.post("/user")
			.whenInformation(
				"user.self",
				({ body }) => {
					user.value = body;
				},
			)
			.whenRequestError(
				() => {
					accessTokenItem.value = null;
				},
			);

		externalPromise.resolve(result);

		return result;
	}

	return {
		setAccessToken,
		disconect,
		fetchInformation,
		isConnected,
		accessToken,
		user,
		promisedRequestInformation: computed(
			() => externalPromisedRequestInformation.value.promise,
		),
	};
}

const { accessToken, fetchInformation } = useUserInformation();

watch(
	accessToken,
	(value) => {
		if (value) {
			void fetchInformation();
		}
	},
);

void Promise
	.resolve()
	.then(
		fetchInformation,
	);
