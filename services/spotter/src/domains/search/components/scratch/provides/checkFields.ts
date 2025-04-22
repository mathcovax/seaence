export const {
	initProvide: initCheckFieldsProvide,
	getProvidedValue: getProvidedCheckFieldsValue,
} = useProvide<Ref<(() => boolean)[]>>();
