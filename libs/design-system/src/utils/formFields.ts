import "./layoutTemplate";
import DSInput from "../components/ui/input/DSInput.vue";
import { createFormField } from "../composables/useFormBuilder";

export const textformField = createFormField(DSInput, {
	defaultValue: "",
	props: {},
});
