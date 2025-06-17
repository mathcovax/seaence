import { type WatchHandle, type Ref, watch, ref } from "vue";

const storageItems: Record<string, Ref> = {};

const watcherStorageItems = new WeakMap<Ref, WatchHandle>();

export function useLocalStorageItem<
	GenericType extends unknown,
>(
	key: string,
	defaultValue: GenericType
): Ref<GenericType>;
export function useLocalStorageItem<
	GenericType extends unknown,
>(
	key: string,
): Ref<GenericType | null>;
export function useLocalStorageItem<
	GenericType extends unknown,
>(
	key: string,
	defaultValue = null,
): Ref<GenericType | null> {
	const itemRef = storageItems[key] ?? ref<GenericType | null>(
		JSON.parse(localStorage.getItem(key) as never) ?? defaultValue,
	);

	if (!storageItems[key]) {
		storageItems[key] = itemRef;
	}

	if (!watcherStorageItems.has(itemRef)) {
		watcherStorageItems.set(
			itemRef,
			watch(
				itemRef,
				(value) => {
					if (!value) {
						localStorage.removeItem(key);
					} else {
						localStorage.setItem(key, JSON.stringify(value));
					}
				},
			),
		);
	}

	return itemRef;
}
