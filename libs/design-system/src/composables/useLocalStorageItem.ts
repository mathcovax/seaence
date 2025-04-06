import { type WatchHandle, type Ref, watch, ref } from "vue";

const storageItems: Record<string, Ref> = {};

const watcherStorageItems: Record<string, WatchHandle> = {};

export function useLocalStorageItem<
	GenericType extends unknown,
>(
	key: string,
) {
	const itemRef = storageItems[key] ?? ref<GenericType | null>(
		localStorage.getItem(key) as never,
	);

	if (!storageItems[key]) {
		storageItems[key] = itemRef;
	}

	if (!watcherStorageItems[key]) {
		watcherStorageItems[key] = watch(
			itemRef,
			(value) => {
				localStorage.setItem(key, value);
			},
		);
	}

	return itemRef;
}
