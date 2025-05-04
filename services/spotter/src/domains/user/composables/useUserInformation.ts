const accessTokenLocalStorageKey = "accessToken";

export function useUserInformation() {
	const accessTokenItem = useLocalStorageItem<string>(accessTokenLocalStorageKey);

	function setAccessToken(accessToken: string) {
		accessTokenItem.value = accessToken;
	}

	function deleteAccessToken() {
		accessTokenItem.value = null;
	}

	const isConnected = computed(() => !!accessTokenItem.value);

	return {
		setAccessToken,
		deleteAccessToken,
		isConnected,
	};
}
