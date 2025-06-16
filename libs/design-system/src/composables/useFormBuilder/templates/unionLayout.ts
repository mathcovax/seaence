
import { type useUnionLayout } from "../layouts/useUnionLayout";
import { type LayoutTemplateItem, type TemplateRender } from "./createLayoutTemplate";

export interface UnionLayoutTemplateProps {
	types: string[];
	"onUpdate:modelValue"(value: string): void;
	modelValue: string;
}

export type UnionLayoutTemplateItem = LayoutTemplateItem<
	typeof useUnionLayout,
	UnionLayoutTemplateProps
>;

export type UnionLayoutTemplateRender = TemplateRender<
	UnionLayoutTemplateProps
>;
