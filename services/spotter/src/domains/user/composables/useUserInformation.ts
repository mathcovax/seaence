import type { User } from "@/lib/horizon/types/user";

const accessTokenLocalStorageKey = "accessToken";
const user = ref<User | null>(null);

export function useUserInformation() {
	const accessTokenItem = useLocalStorageItem<string>(accessTokenLocalStorageKey);

	function setAccessToken(accessToken: string) {
		accessTokenItem.value = accessToken;
	}

	function deleteAccessToken() {
		accessTokenItem.value = null;
	}

	const isConnected = computed(() => !!user.value);

	const accessToken = computed(() => accessTokenItem.value);

	function fetchInformation() {
		return window.horizonClient
			.get("/user")
			.whenInformation(
				"user.get",
				({ body }) => {
					user.value = body;
				},
			)
			.whenError(
				() => {
					accessTokenItem.value = null;
				},
			);
	}

	return {
		setAccessToken,
		deleteAccessToken,
		fetchInformation,
		isConnected,
		accessToken,
		user,
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
