import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

export function usePageTranslate() {
	const route = useRoute();
	const { t: $t } = useI18n();

	function pt(path: string, rest?: Record<string, unknown>) {
		return $t(`page.${route.name?.toString()}.${path}`, rest || {});
	}

	return { pt };
}
