import type { FindHttpClientRoute } from "@duplojs/http-client";
import type { User, UserLanguage } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

const accessTokenLocalStorageKey = "accessToken";
const user = ref<User | null>(null);

const userNavigatorLanguageMapper: Partial<Record<string, UserLanguage>> = {
	fr: "fr-FR",
	"fr-FR": "fr-FR",
	"fr-CA": "fr-FR",
	"fr-BE": "fr-FR",
	"fr-CH": "fr-FR",
};

const userNavigatorLanguage = useLocalStorageItem<UserLanguage>(
	"userNavigatorLanguage",
	userNavigatorLanguageMapper[navigator.language] ?? "en-US",
);

type RequestInformation = FindHttpClientRoute<HorizonClientRoute, "POST", "/self-user">["response"];
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
			.post(
				"/self-user",
				{ disableAuthenticationRequiredManagement: true },
			)
			.whenInformation(
				"user.self",
				({ body }) => {
					user.value = body;
					userNavigatorLanguage.value = body.language;
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
		userNavigatorLanguage,
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
