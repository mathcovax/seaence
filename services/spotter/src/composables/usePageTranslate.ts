export function usePageTranslate() {
	const route = useRoute();

	function $pt(path?: string, rest?: Record<string, unknown>) {
		return i18n.global.t(`page.${route.name as string}.${path}`, rest || {});
	}

	return $pt;
}
