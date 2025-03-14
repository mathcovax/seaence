import { duplojsEslintBase, duplojsEslintTest } from "@duplojs/eslint";

export const eslintConfig = [
	{
		...duplojsEslintTest,
		files: ["**/*.test.ts"],
	},
	{
		...duplojsEslintBase,
		files: ["**/*.ts"],
		ignores: ["**/*.test.ts"],
	},
];
