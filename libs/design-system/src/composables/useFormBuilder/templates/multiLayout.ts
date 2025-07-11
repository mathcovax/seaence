
import { type useMultiFieldLayout } from "../layouts/useMultiFieldLayout";
import { type LayoutTemplateItem, type TemplateRender } from "./createLayoutTemplate";

export interface MultiLayoutTemplateProps {
	formKey: string;
}

export type MultiLayoutTemplateItem = LayoutTemplateItem<
	typeof useMultiFieldLayout,
	MultiLayoutTemplateProps
>;

export type MultiLayoutTemplateRender = TemplateRender<
	MultiLayoutTemplateProps
>;
