/* eslint-disable @typescript-eslint/no-empty-object-type */
import { type useFormBuilder } from "..";
import { type TemplateSlotNode, type LayoutTemplateItem, type TemplateRender } from "./createLayoutTemplate";

export interface FormTemplateProps {

}

export type FormTemplateRender = TemplateRender<
	FormTemplateProps,
	{
		formField(): TemplateSlotNode;
		default(): TemplateSlotNode;
	}
>;

export type FormTemplateItem = LayoutTemplateItem<
	typeof useFormBuilder,
	FormTemplateProps,
	FormTemplateRender
>;
