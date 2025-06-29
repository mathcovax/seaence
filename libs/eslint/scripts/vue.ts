import { duplojsEslintBase } from "@duplojs/eslint";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";

export const eslintConfigVue = [
	...pluginVue.configs["flat/strongly-recommended"],
	{
		...duplojsEslintBase,
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tseslint.parser,
				globals: globals.browser,
				sourceType: "module",
				projectService: true,
				extraFileExtensions: [".vue"],
			},
		},
		rules: {
			...duplojsEslintBase.rules,
			"vue/require-default-prop": "off",
			"vue/html-indent": ["error", "tab"],
			"no-undef": "off",
			"max-len": "off",
			"vue/max-len": [
				"error",
				{
					code: 120,
					template: 1000,
				},
			],
			"vue/padding-line-between-tags": [
				"error",
				[
					{
						blankLine: "always",
						prev: "*",
						next: "*",
					},
				],
			],
			"vue/block-order": [
				"error",
				{
					order: [["script", "template"], "style"],
				},
			],
			"@stylistic/js/max-len": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-declaration-merging": "off",
			"@typescript-eslint/no-unsafe-enum-comparison": "off",
			"@typescript-eslint/no-unsafe-function-type": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-unary-minus": "off",
			"@typescript-eslint/no-redundant-type-constituents": "off",
			"@typescript-eslint/no-use-before-define": "off",
			"id-length": [
				"error",
				{
					min: 2,
					exceptions: ["t"],
				},
			],
		},
		files: ["**/*.vue", "**/*.ts"],
		ignores: ["**/*.test.ts", "vendors/**"],
	},
];
