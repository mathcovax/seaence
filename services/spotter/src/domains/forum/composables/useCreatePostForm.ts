import { horizonClient } from "@/lib/horizon";
import type { DocumentId } from "@/lib/horizon/types/document";
import type { PostContent, PostTopic } from "@/lib/horizon/types/post";
import { zod } from "@vendors/clean";

//a voir avec mathcovax comment je fais car peut pas importer i18n dans une composable
//car pas de setup dans la balise <script>
//const { t } = useI18n();

interface InputCreatePost {
	topic: PostTopic;
	content: PostContent;
}
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

const formInputSchema = zod.object({
	topic: zod.string()
		.min(
			formInputRules.topic.minLength,
			{
				message: "waiting mathcovax",
				//message: t("formMessage.minLength", { value: formInputRules.topic.minLength }),
			},
		)
		.max(
			formInputRules.topic.maxLength,
			{
				message: "waiting mathcovax",
				//message: t("formMessage.maxLength", { value: formInputRules.topic.maxLength }),
			},
		),
	content: zod.string()
		.min(
			formInputRules.content.minLength,
			{
				message: "waiting mathcovax",
				//message: t("formMessage.minLength", { value: formInputRules.content.minLength }),
			},
		)
		.max(
			formInputRules.content.maxLength,
			{
				message: "waiting mathcovax",
				//message: t("formMessage.maxLength", { value: formInputRules.content.maxLength }),
			},
		),
});

const errorFirstIndex = 0;

export function useCreatePostForm(
	documentId: Ref<DocumentId>,
	whenFindError: () => void,
) {
	const formInputs = reactive<zod.infer<typeof formInputSchema>>({
		topic: "",
		content: "",
	});
	const formErrors = reactive({
		topic: "",
		content: "",
	});
	function createPost(params: InputCreatePost) {
		const { success, error } = formInputSchema.safeParse(formInputs);

		if (!success) {
			formErrors.topic = error.format().topic?._errors[errorFirstIndex] || "";
			formErrors.content = error.format().content?._errors[errorFirstIndex] || "";
			return;
		}

		formErrors.topic = "";
		formErrors.content = "";

		return horizonClient
			.post(
				"/create-post",
				{
					body: {
						topic: params.topic,
						content: params.content,
						documentId: documentId.value,
					},
				},
			)
			.whenRequestError(
				whenFindError,
			)
			.iWantExpectedResponse();
	}

	return {
		createPost,
		formInputs,
		formErrors,
	};
}
