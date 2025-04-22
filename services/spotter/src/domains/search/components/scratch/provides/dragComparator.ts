import type { Comparator } from "@vendors/scratch-type";

export const {
	initProvide: initDragComparatorProvide,
	getProvidedValue: getProvidedDragComparatorValue,
} = useProvide<Ref<(() => Comparator) | null>>();
