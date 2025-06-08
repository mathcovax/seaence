import "./layoutTemplate";
import DSInput from "../components/ui/input/DSInput.vue";
import { createFormField } from "../composables/useFormBuilder";
import CheckboxTemplate from "../components/form/CheckboxTemplate.vue";
import DSTextarea from "../components/ui/textarea/DSTextarea.vue";

export const textformField = createFormField(DSInput, {
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
