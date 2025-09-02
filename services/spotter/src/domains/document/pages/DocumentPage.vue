<script setup lang="ts">
import type { FlexibleDate, BakedDocumentLanguage } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { useDocumentPage } from "../composables/useDocumentPage";
import { bakedDocumentLanguageEnum } from "@/lib/horizon/types/bakedDocument";
import PostRow from "@/domains/forum/components/PostRow.vue";
import { RouterLink } from "vue-router";
import ReportingWrongTranslateDialog from "../components/ReportingWrongTranslateDialog.vue";
import CreateManyDocumentInFolderDialog from "@/domains/folder/components/createManyDocumentInFolderDialog/CreateManyDocumentInFolderDialog.vue";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";

const { t } = useI18n();
const { $pt, params } = documentPage.use();
const router = useRouter();
const { isConnected } = useUserInformation();

const { document, posts } = useDocumentPage(
	computed(() => params.value.id),
	() => {
		router.back();
	},
);

function onLanguageChange(newLanguage: BakedDocumentLanguage | null) {
	if (!newLanguage || !document.value || newLanguage === document.value.language) {
		return;
	}

	const newDocumentId = `${document.value.nodeSameRawDocumentId}_${newLanguage}`;

	void router.replace(documentPage.createTo({
		params: { id: newDocumentId },
	}));
}

function getLanguageLabel(languageCode: BakedDocumentLanguage) {
	return t(`languages.${languageCode}`) ?? languageCode;
}

const allAffiliations = computed(() => {
	if (!document.value) {
		return null;
	}

	const affiliations = document.value.authors.flatMap(
		({ affiliations }) => affiliations ?? [],
	);

	return Array.from(new Set(affiliations));
});

function formatedDate(date: FlexibleDate) {
	const secondIndex = 2;

	if (!date) {
		return "N/A";
	}

	if (date.day !== null && date.month !== null) {
		return `
			${String(date.day).padStart(secondIndex, "0")}/${String(date.month).padStart(secondIndex, "0")}/${date.year}
		`;
	}

	if (date.month !== null) {
		return `${String(date.month).padStart(secondIndex, "0")}/${date.year}`;
	}

	return `${date.year}`;
}
</script>

<template>
	<section class="min-h-screen-nh px-4 md:px-6 lg:px-8">
		<article
			v-if="document && allAffiliations && posts"
			class="flex flex-col gap-12"
		>
			<header class="flex flex-col gap-8 lg:gap-12">
				<div class="flex flex-col gap-2">
					<div class="flex gap-4 items-start">
						<BackButton />

						<div class="flex-1">
							<h1 class="mb-4 text-xl md:text-3xl font-bold text-blue-seaence first-letter:uppercase">
								{{ document.title }}
							</h1>

							<div class="flex items-center gap-2 mb-4">
								<DSIcon
									name="translate"
									class="shrink-0"
								/>

								<DSSelect
									:items="bakedDocumentLanguageEnum.toTuple()"
									:model-value="document.language"
									@update:model-value="onLanguageChange"
									:label="getLanguageLabel"
									placeholder="Choisir une langue"
									size="sm"
									class="w-48"
								/>
							</div>
						</div>
					</div>

					<div
						class="flex items-center gap-2"
					>
						<DSIcon
							name="account"
							class="shrink-0"
						/>

						<ul class="list-none inline">
							<li
								class="inline after:content-[',_'] last:after:content-['']"
								v-for="author in document.authors"
								:key="author.name"
							>
								{{ author.name }}
							</li>
						</ul>
					</div>

					<div class="flex gap-2">
						<div
							v-if="document?.journalPublishDate"
							class="flex items-center gap-2"
						>
							<DSIcon
								name="calendar"
								class="shrink-0"
							/>

							{{ formatedDate(document.journalPublishDate) }}
						</div>

						<div
							v-if="document?.webPublishDate"
							class="flex items-center gap-2"
						>
							<DSIcon
								name="web"
								class="shrink-0"
							/>

							{{ formatedDate(document.webPublishDate) }}
						</div>
					</div>

					<ReportingWrongTranslateDialog
						:baked-document-id="document.id"
					>
						<DSClickableText
							class="self-start"
							:content="$pt('reportingWrongTranslate.cta')"
						/>
					</ReportingWrongTranslateDialog>

					<CreateManyDocumentInFolderDialog
						v-if="isConnected"
						:node-same-raw-document-id="document.nodeSameRawDocumentId"
						:current-document-title="document.title"
					>
						<DSOutlineButton
							icon="plus"
							size="small"
							class="self-start"
						>
							{{ $pt("createManyDocumentInFolderDialog.button.content") }}
						</DSOutlineButton>
					</CreateManyDocumentInFolderDialog>

					<div class="flex flex-col md:flex-row gap-6 md:gap-8">
						<div class="space-y-4">
							<h2 class="text-xl md:text-2xl font-bold">
								{{ $pt("label.ressources") }}
							</h2>

							<ul class="ml-4 list-disc">
								<li
									v-for="(resources, index) in document.resources"
									:key="index"
								>
									<a
										:href="resources.url"
										target="_blank"
										rel="noopener noreferrer"
										class="text-blue-seaence hover:underline"
									>
										{{ resources.resourceProvider }}
									</a>
								</li>
							</ul>
						</div>

						<div class="space-y-4">
							<h2 class="text-xl md:text-2xl font-bold">
								{{ $pt("label.articleType") }}
							</h2>

							<ul class="flex flex-wrap gap-2 list-none">
								<li
									v-for="(type, index) in document.articleTypes"
									:key="index"
								>
									<DSBadge class="bg-green-seaence/10 text-green-seaence">
										{{ $t(`articleType.${type}`) }}
									</DSBadge>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</header>

			<main class="space-y-4">
				<h2 class="text-xl md:text-2xl text-center font-bold">
					{{ $pt("label.abstract") }}
				</h2>

				<section
					v-for="(detail, index) in document.abstractDetails"
					:key="index"
					class="space-y-2"
				>
					<h3 class="text-lg md:text-xl font-semibold first-letter:uppercase">
						{{ detail.label }}
					</h3>

					<p class="first-letter:uppercase">
						{{ detail.content }}
					</p>
				</section>

				<p v-if="!document.abstractDetails">
					{{ document.abstract }}
				</p>
			</main>

			<div class="flex flex-col md:flex-row gap-6 md:gap-8">
				<div class="space-y-4">
					<h2 class="text-xl md:text-2xl font-bold">
						{{ $pt("label.keywords") }}
					</h2>

					<ul class="flex flex-wrap gap-2 list-none">
						<li
							v-for="(keyword, index) in document.keywords"
							:key="index"
						>
							<DSBadge class="bg-blue-seaence/10 text-blue-seaence">
								{{ keyword.value }}
							</DSBadge>
						</li>
					</ul>
				</div>

				<div
					class="space-y-4"
					v-if="allAffiliations.length"
				>
					<h2 class="text-xl md:text-2xl font-bold">
						{{ $pt("label.institutions") }}
					</h2>

					<ul class="flex flex-wrap gap-2 list-none">
						<li
							v-for="(affiliation, index) in allAffiliations"
							:key="index"
							class="max-w-xs sm:max-w-sm md:max-w-md"
						>
							<DSBadge
								class="bg-pink-seaence/10 text-pink-seaence w-full truncate"
								:title="affiliation"
							>
								<span class="truncate block">{{ affiliation }}</span>
							</DSBadge>
						</li>
					</ul>
				</div>
			</div>

			<div class="flex flex-col gap-4">
				<RouterLink
					:to="postListPage.createTo({ params: { documentId: document.id } })"
					class="flex gap-2 self-start hover:underline"
				>
					<h2 class="text-xl md:text-2xl font-bold hover:underline">
						{{ $pt("label.linkedPosts") }}
					</h2>

					<DSIcon name="linkVariant" />
				</RouterLink>

				<template
					v-if="posts.length"
				>
					<PostRow
						v-for="post in posts"
						:key="post.id"
						:post="post"
						:language="document.language"
					/>
				</template>

				<template v-else>
					<i>{{ $pt("noPost") }}</i>

					<DSPrimaryButton
						class="self-start"
						as-child
					>
						<RouterLink :to="postCreatePage.createTo({ params: { documentId: document.id } })">
							{{ $pt("createPost") }}
						</RouterLink>
					</DSPrimaryButton>
				</template>
			</div>
		</article>
	</section>
</template>
