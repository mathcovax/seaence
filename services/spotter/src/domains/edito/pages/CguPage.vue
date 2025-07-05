<script setup lang="ts">
const { $pt, $gpt } = cguPage.use();

interface Section {
	key: string;
	titleKey: string;
	contentKeys: string[];
	type: "paragraphs" | "list";
}

const sections: Section[] = [
	{
		key: "introduction",
		titleKey: "sections.introduction.title",
		contentKeys: [
			"sections.introduction.content.0",
			"sections.introduction.content.1",
			"sections.introduction.content.2",
		],
		type: "paragraphs",
	},
	{
		key: "definitions",
		titleKey: "sections.definitions.title",
		contentKeys: [
			"sections.definitions.content.0",
			"sections.definitions.content.1",
			"sections.definitions.content.2",
			"sections.definitions.content.3",
		],
		type: "list",
	},
	{
		key: "serviceDescription",
		titleKey: "sections.serviceDescription.title",
		contentKeys: [
			"sections.serviceDescription.content.0",
			"sections.serviceDescription.content.1",
			"sections.serviceDescription.content.2",
		],
		type: "paragraphs",
	},
	{
		key: "userAccount",
		titleKey: "sections.userAccount.title",
		contentKeys: [
			"sections.userAccount.content.0",
			"sections.userAccount.content.1",
			"sections.userAccount.content.2",
			"sections.userAccount.content.3",
		],
		type: "list",
	},
	{
		key: "userConduct",
		titleKey: "sections.userConduct.title",
		contentKeys: [
			"sections.userConduct.content.0",
			"sections.userConduct.content.1",
			"sections.userConduct.content.2",
			"sections.userConduct.content.3",
		],
		type: "list",
	},
	{
		key: "intellectualProperty",
		titleKey: "sections.intellectualProperty.title",
		contentKeys: [
			"sections.intellectualProperty.content.0",
			"sections.intellectualProperty.content.1",
			"sections.intellectualProperty.content.2",
			"sections.intellectualProperty.content.3",
		],
		type: "list",
	},
	{
		key: "dataPrivacy",
		titleKey: "sections.dataPrivacy.title",
		contentKeys: [
			"sections.dataPrivacy.content.0",
			"sections.dataPrivacy.content.1",
			"sections.dataPrivacy.content.2",
			"sections.dataPrivacy.content.3",
		],
		type: "list",
	},
	{
		key: "limitations",
		titleKey: "sections.limitations.title",
		contentKeys: [
			"sections.limitations.content.0",
			"sections.limitations.content.1",
			"sections.limitations.content.2",
			"sections.limitations.content.3",
		],
		type: "list",
	},
	{
		key: "termination",
		titleKey: "sections.termination.title",
		contentKeys: [
			"sections.termination.content.0",
			"sections.termination.content.1",
			"sections.termination.content.2",
			"sections.termination.content.3",
		],
		type: "list",
	},
	{
		key: "modifications",
		titleKey: "sections.modifications.title",
		contentKeys: [
			"sections.modifications.content.0",
			"sections.modifications.content.1",
			"sections.modifications.content.2",
			"sections.modifications.content.3",
		],
		type: "list",
	},
	{
		key: "contact",
		titleKey: "sections.contact.title",
		contentKeys: [
			"sections.contact.content.0",
			"sections.contact.content.1",
			"sections.contact.content.2",
		],
		type: "paragraphs",
	},
];
</script>

<template>
	<div class="mb-8 space-y-2">
		<h1 class="text-2xl md:text-4xl font-bold text-blue-seaence">
			{{ $pt("title") }}
		</h1>

		<p class="text-base md:text-lg text-muted-foreground">
			{{ $pt("subtitle") }}
		</p>
	</div>

	<section
		v-for="section in sections"
		:key="section.key"
		class="mb-8"
	>
		<h2 class="mb-4 pb-2 text-xl md:text-2xl font-semibold border-b border-border">
			{{ $pt(section.titleKey) }}
		</h2>

		<component
			:is="section.type === 'paragraphs' ? 'div' : 'ul'"
			:class="{
				'space-y-3': section.type === 'paragraphs',
				'space-y-2 list-disc list-inside': section.type === 'list',
			}"
		>
			<I18nT
				v-for="contentKey in section.contentKeys"
				:key="contentKey"
				:keypath="$gpt(contentKey)"
				:tag="section.type === 'paragraphs' ? 'p' : 'li'"
				class="leading-relaxed"
			>
				<template #supportEmail>
					<a
						:href="`mailto:${$pt('emailSupport')}`"
						class="text-blue-seaence hover:underline font-medium"
					>
						{{ $pt('emailSupport') }}
					</a>
				</template>
			</I18nT>
		</component>
	</section>

	<div class="mt-12 pt-8 text-center border-t border-border">
		<RouterLink
			:to="homePage"
		>
			<DSPrimaryButton icon="home">
				{{ $t("cta.backHome") }}
			</DSPrimaryButton>
		</RouterLink>
	</div>
</template>
