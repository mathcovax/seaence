import { type useBaseLayout } from "../layouts/useBaseLayout";
import { type TemplateRender, type LayoutTemplateItem } from "./createLayoutTemplate";

export interface BaseLayoutTemplateProps {
	label?: string;
	formKey: string;
}

export type BaseLayoutTemplateItem = LayoutTemplateItem<
	typeof useBaseLayout,
	BaseLayoutTemplateProps
>;

export type BaseLayoutTemplateRender = TemplateRender<
	BaseLayoutTemplateProps
>;

