import { type useRepeatLayout } from "../layouts/useRepeatLayout";
import { type LayoutTemplateItem, type TemplateRender } from "./createLayoutTemplate";
import { type FormFieldInstance } from "../formField";

export interface RepeatLayoutTemplateProps {
	maxItems: number;
	"onAddItem"(): void;
	"onRemoveItem"(index: number): void;
	items: FormFieldInstance["getVNode"][];
}

export type RepeatLayoutTemplateItem = LayoutTemplateItem<
	typeof useRepeatLayout,
	RepeatLayoutTemplateProps
>;

export type RepeatLayoutTemplateRender = TemplateRender<
	RepeatLayoutTemplateProps
>;
