import { resolve } from "path";

export const aliasDesignSystem = {
	find: "@design-system",
	replacement: resolve(import.meta.dirname, "..", "src"),
};

export const typeResolverDesignSystem = {
	type: "component",
	resolve(name) {
		if(!name.startsWith("DS")) {
			return
		}

		return {
			name,
			from: '@lib/design-system',
		}
	},
};