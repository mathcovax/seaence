import { type useTextLayout } from "../layouts/useTextLayout";
import { type TemplateRender, type LayoutTemplateItem } from "./createLayoutTemplate";

export interface TextLayoutTemplateProps {
	content: string;
	formKey: string;
}

export type TextLayoutTemplateItem = LayoutTemplateItem<
	typeof useTextLayout,
	TextLayoutTemplateProps
>;

export type TextLayoutTemplateRender = TemplateRender<
	TextLayoutTemplateProps
>;

