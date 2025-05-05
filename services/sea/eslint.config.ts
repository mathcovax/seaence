import { eslintConfig } from "./vendors/eslint";

export default eslintConfig.map(
	(config) => ({
		...config,
		rules: {
			...config.rules,
			camelcase: "off",
		},
	}),
);
