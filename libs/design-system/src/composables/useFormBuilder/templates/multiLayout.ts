/* eslint-disable @typescript-eslint/no-empty-object-type */
import { type useMultiFieldLayout } from "../layouts/useMultiFieldLayout";
import { type LayoutTemplateItem, type TemplateRender } from "./createLayoutTemplate";

export interface MultiLayoutTemplateProps {

}

export type MultiLayoutTemplateItem = LayoutTemplateItem<
	typeof useMultiFieldLayout,
	MultiLayoutTemplateProps
>;

export type MultiLayoutTemplateRender = TemplateRender<
	MultiLayoutTemplateProps
>;
