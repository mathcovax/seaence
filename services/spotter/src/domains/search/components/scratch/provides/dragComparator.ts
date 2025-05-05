import type { Comparator } from "@vendors/types-advanced-query";

export const {
	initProvide: initDragComparatorProvide,
	getProvidedValue: getProvidedDragComparatorValue,
} = useProvide<Ref<(() => Comparator) | null>>();
