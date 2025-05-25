import { horizonClient } from "@/lib/horizon";
import { zod } from "@vendors/clean";
import { postRules } from "@vendors/entity-rules";

const errorFirstIndex = 0;

export function useCreatePost(
	documentId: Ref<string>,
) {
	const { t } = useI18n();

	const formInputSchema = zod.object({
		topic: zod.string()
			.trim()
			.min(
				postRules.topic.minLength,
				{ message: t("formMessage.minLength", { value: postRules.topic.minLength }) },
			)
			.max(
				postRules.topic.maxLength,
				{ message: t("formMessage.maxLength", { value: postRules.topic.maxLength }) },
			),
		content: zod.string()
			.trim()
			.min(
				postRules.content.minLength,
				{ message: t("formMessage.minLength", { value: postRules.content.minLength }) },
			)
			.max(
				postRules.content.maxLength,
				{ message: t("formMessage.maxLength", { value: postRules.content.maxLength }) },
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
				() => {
					formErrors.topic = "";
					formErrors.content = "";
				},
			);
	}

	return {
		createPost,
		formInputs,
		formErrors,
	};
}
