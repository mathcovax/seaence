import type { FindHttpClientRoute } from "@duplojs/http-client";
import type { User, UserLanguage } from "@vendors/clients-type/horizon/duplojsTypesCodegen";

const accessTokenLocalStorageKey = "accessToken";
const lastSeeNotificationsLocalStorageKey = "lastSeeNotifications";
const user = ref<User | null>(null);
const lastDateOfNotification = ref<Date | null>(null);

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

type RequestLastDateOfNoticaton = FindHttpClientRoute<
	HorizonClientRoute,
	"POST",
	"/notification-last-date-find"
>["response"];
const externalPromisedRequestLastDateOfNoticaton = ref(
	createExternalPromise<RequestLastDateOfNoticaton>(),
);

const { refresh } = useWindow();

export function useUserInformation() {
	const accessTokenItem = useLocalStorageItem<string>(accessTokenLocalStorageKey);

	const lastSeeNotificationsItem = useLocalStorageItem<number>(
		lastSeeNotificationsLocalStorageKey,
		Date.now(),
	);

	function seeNotifications() {
		lastSeeNotificationsItem.value = Date.now();
	}

	function setAccessToken(accessToken: string) {
		accessTokenItem.value = accessToken;
	}

	function disconect() {
		accessTokenItem.value = null;
		refresh();
	}

	const isConnected = computed(() => !!user.value);

	const accessToken = computed(() => accessTokenItem.value);

	const hasNewNotifications = computed(() => {
		if (!lastDateOfNotification.value) {
			return false;
		}

		return lastDateOfNotification.value.getTime() > lastSeeNotificationsItem.value;
	});

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

	function fetchLastDateOfNotification() {
		const externalPromise = createExternalPromise<RequestLastDateOfNoticaton>();

		externalPromisedRequestLastDateOfNoticaton.value.resolve(externalPromise.promise);
		externalPromisedRequestLastDateOfNoticaton.value = externalPromise;

		const result = window.horizonClient
			.post(
				"/notification-last-date-find",
				{ disableAuthenticationRequiredManagement: true },
			)
			.whenInformation(
				"notification.lastDate",
				({ body }) => {
					lastDateOfNotification.value = new Date(body.dateOfLastNotification);
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
		fetchLastDateOfNotification,
		isConnected,
		accessToken,
		user,
		hasNewNotifications,
		promisedRequestInformation: computed(
			() => externalPromisedRequestInformation.value.promise,
		),
		lastSeeNotifications: computed(
			() => lastSeeNotificationsItem.value,
		),
		seeNotifications,
	};
}

const { accessToken, fetchInformation, fetchLastDateOfNotification } = useUserInformation();

watch(
	accessToken,
	(value) => {
		if (value) {
			void fetchInformation();
			void fetchLastDateOfNotification();
		}
	},
);

void Promise
	.resolve()
	.then(() => {
		void fetchInformation();
		void fetchLastDateOfNotification();
	});
