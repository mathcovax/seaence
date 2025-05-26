
import { type useCheckLayout } from "../layouts";
import { type TemplateRender, type LayoutTemplateItem } from "./createLayoutTemplate";

export interface CheckLayoutTemplateProps {
	errorMessage: string;
}

export type CheckLayoutTemplateItem = LayoutTemplateItem<
	typeof useCheckLayout,
	CheckLayoutTemplateProps
>;

export type CheckLayoutTemplateRender = TemplateRender<
	CheckLayoutTemplateProps
>;
