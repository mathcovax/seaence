import { duplojsEslintBase, duplojsEslintOpen, duplojsEslintTest } from "@duplojs/eslint";

export const eslintConfig = [
	{
		...duplojsEslintTest,
		files: ["**/*.test.ts"],
	},
	{
		...duplojsEslintBase,
		files: ["**/*.ts"],
		ignores: ["**/*.test.ts", "vendors/**"],
		rules: {
			...duplojsEslintBase.rules,
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-namespace": "off",
		},
	},
];

export const eslintConfigOpen = [
	{
		...duplojsEslintTest,
		files: ["**/*.test.ts"],
	},
	{
		...duplojsEslintOpen,
		files: ["**/*.ts"],
		ignores: ["**/*.test.ts", "vendors/**"],
	},
];
