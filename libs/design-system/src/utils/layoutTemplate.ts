import { useCheckLayout, useFormBuilder } from "../composables/useFormBuilder";
import BaseLayoutTemplate from "../components/form/BaseLayoutTemplate.vue";
import { useBaseLayout } from "../composables/useFormBuilder/layouts/useBaseLayout";
import { createLayoutTemplate } from "../composables/useFormBuilder/templates/createLayoutTemplate";
import CheckLayoutTemplate from "../components/form/CheckLayoutTemplate.vue";
import { useMultiFieldLayout } from "../composables/useFormBuilder/layouts/useMultiFieldLayout";
import MultiLayoutTemplate from "../components/form/MultiLayoutTemplate.vue";
import FormTemplate from "../components/form/FormTemplate.vue";
import { useTextLayout } from "../composables/useFormBuilder/layouts/useTextLayout";
import TextLayoutTemplate from "../components/form/TextLayoutTemplate.vue";
import { useUnionLayout } from "../composables/useFormBuilder/layouts/useUnionLayout";
import UnionSelectLessLayoutTemplate from "../components/form/UnionSelectLessLayoutTemplate.vue";
import InlineFormTemplate from "../components/form/InlineFormTemplate.vue";

export const baseLayoutTemplateGridCols = createLayoutTemplate(
	useBaseLayout,
	BaseLayoutTemplate,
);
useBaseLayout.defaultTemplate = baseLayoutTemplateGridCols({ cols: 12 });

export const checkLayoutTemplateGridCols = createLayoutTemplate(
	useCheckLayout,
	CheckLayoutTemplate,
);
useCheckLayout.defaultTemplate = checkLayoutTemplateGridCols({ cols: 12 });

export const multiLayoutTemplateGridCols = createLayoutTemplate(
	useMultiFieldLayout,
	MultiLayoutTemplate,
);
useMultiFieldLayout.defaultTemplate = multiLayoutTemplateGridCols({ cols: 12 });

export const formTemplate = createLayoutTemplate(
	useFormBuilder,
	FormTemplate,
);
useFormBuilder.defaultTemplate = formTemplate({ align: "auto" });

export const textLayoutTemplateGridCols = createLayoutTemplate(
	useTextLayout,
	TextLayoutTemplate,
);
useTextLayout.defaultTemplate = textLayoutTemplateGridCols({ cols: 12 });

export const unionSelectLessLayoutTemplate = createLayoutTemplate(
	useUnionLayout,
	UnionSelectLessLayoutTemplate,
);

export const inlineFormTemplate = createLayoutTemplate(
	useFormBuilder,
	InlineFormTemplate,
);
