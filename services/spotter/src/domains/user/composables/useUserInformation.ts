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
			.post("/me")
			.whenInformation(
				"me.info.get",
				({ body }) => {
					user.value = body;
				},
			)
			.whenRequestError(
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
