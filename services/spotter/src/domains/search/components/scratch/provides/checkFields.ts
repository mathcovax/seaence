export const {
	initProvide: initCheckFieldsProvide,
	getProvidedValue: getProvidedCheckFieldsValue,
} = useProvide<Ref<((disabledHint: boolean) => boolean)[]>>();
