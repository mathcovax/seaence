import "./layoutTemplate";
import DSInput from "../components/ui/input/DSInput.vue";
import { createFormField } from "../composables/useFormBuilder";
import CheckboxTemplate from "../components/form/CheckboxTemplate.vue";
import DSTextarea from "../components/ui/textarea/DSTextarea.vue";
import SelectTemplate, { type SelectItem } from "../components/form/SelectTemplate.vue";
import SelectStringTemplate from "../components/form/SelectStringTemplate.vue";
import MultiComboboxTemplate, { type MultiComboboxItem } from "../components/form/MultiComboboxTemplate.vue";

export const textFormField = createFormField(DSInput, {
	defaultValue: "",
	props: {},
});

export const booleanFormField = createFormField(CheckboxTemplate, {
	defaultValue: false,
	props: { label: "" },
});

export const textareaFormField = createFormField(DSTextarea, {
	defaultValue: "",
	props: {},
});

export const selectFormField = createFormField(SelectTemplate, {
	defaultValue: null as SelectItem | null,
	props: {
		items: [],
		placeholder: "",
	},
});

export const selectStringFormField = createFormField(SelectStringTemplate, {
	defaultValue: null as string | null,
	props: {
		items: [],
		placeholder: "",
	},
});

export const multiComboBoxFormField = createFormField(MultiComboboxTemplate, {
	defaultValue: [] as MultiComboboxItem[],
	props: {
		placeholder: "",
		emptyLabel: "",
		items: [],
	},
});
