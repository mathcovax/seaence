import "./layoutTemplate";
import DSInput from "../components/ui/input/DSInput.vue";
import { createFormField } from "../composables/useFormBuilder";
import CheckboxTemplate from "../components/form/CheckboxTemplate.vue";

export const textformField = createFormField(DSInput, {
	defaultValue: "",
	props: {},
});

export const booleanFormField = createFormField(CheckboxTemplate, {
	defaultValue: false,
	props: { label: "" },
});
