import { horizonClient } from "@/lib/horizon";
import { zod } from "@vendors/clean";

const formInputRules = {
	topic: {
		minLength: 15,
		maxLength: 100,
	},
	content: {
		minLength: 30,
		maxLength: 5000,
	},
};

const errorFirstIndex = 0;

export function useCreatePost(
	documentId: Ref<string>,
) {
	const { t } = useI18n();

	const formInputSchema = zod.object({
		topic: zod.string()
			.min(
				formInputRules.topic.minLength,
				{
					message: t("formMessage.minLength", { value: formInputRules.topic.minLength }),
				},
			)
			.max(
				formInputRules.topic.maxLength,
				{
					message: t("formMessage.maxLength", { value: formInputRules.topic.maxLength }),
				},
			),
		content: zod.string()
			.min(
				formInputRules.content.minLength,
				{
					message: t("formMessage.minLength", { value: formInputRules.content.minLength }),
				},
			)
			.max(
				formInputRules.content.maxLength,
				{
					message: t("formMessage.maxLength", { value: formInputRules.content.maxLength }),
				},
			),
	});

	const formInputs = reactive<zod.infer<typeof formInputSchema>>({
		topic: "",
		content: "",
	});
	const formErrors = reactive({
		topic: "",
		content: "",
	});
	function createPost() {
		const { success, error } = formInputSchema.safeParse(formInputs);

		if (!success) {
			formErrors.topic = error.format().topic?._errors[errorFirstIndex] || "";
			formErrors.content = error.format().content?._errors[errorFirstIndex] || "";

			return;
		}

		return horizonClient
			.post(
				"/create-post",
				{
					body: {
						topic: formInputs.topic,
						content: formInputs.content,
						documentId: documentId.value,
					},
				},
			)
			.whenInformation(
				"post.created",
				({ body }) => {
					formErrors.topic = "";
					formErrors.content = "";
				},
			);
	}

	return {
		createPost,
		formInputs,
		formErrors,
		formInputRules,
	};
}
