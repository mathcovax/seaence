<script setup lang="ts">
const { $pt, $gpt } = homePage.use();
</script>

<template>
	<section
		data-testid="home-page"
		class="mb-12 flex flex-col-reverse md:flex-row gap-7 md:gap-14 justify-between items-center"
	>
		<div class="md:flex-2/3 space-y-6">
			<I18nT
				class="text-4xl font-bold"
				:keypath="$gpt('hero.title.base')"
				tag="h1"
			>
				<template #one>
					<span class="text-blue-seaence capitalize">{{ $pt("hero.title.one") }}</span>
				</template>

				<template #two>
					<span class="text-secondary capitalize">{{ $pt("hero.title.two") }}</span>
				</template>

				<template #three>
					<span class="text-secondary capitalize">{{ $pt("hero.title.three") }}</span>
				</template>
			</I18nT>

			<p class="text-lg text-muted-foreground">
				{{ $pt("hero.subtitle") }}
			</p>

			<div class="flex flex-wrap gap-4">
				<RouterLink :to="simpleSearchPage">
					<DSPrimaryButton icon="magnify">
						{{ $t("cta.explore") }}
					</DSPrimaryButton>
				</RouterLink>

				<RouterLink :to="advancedSearchPage">
					<DSOutlineButton icon="magnifyPlus">
						Recherche avancée
					</DSOutlineButton>
				</RouterLink>
			</div>
		</div>

		<DSImage
			src="/images/edito/hero.png"
			alt="hero"
			class="md:flex-1/3 size-[300px]"
		/>
	</section>

	<section class="mb-12 space-y-6">
		<h2 class="text-4xl font-bold">
			{{ $pt("about.title") }}
		</h2>

		<p>
			{{ $pt("about.content") }}
		</p>
	</section>

	<section class="mb-12">
		<h2 class="mb-8 text-3xl font-bold">
			{{ $pt("features.title") }}
		</h2>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<DSCard>
				<div class="mb-4 flex justify-center">
					<div class="p-3 bg-blue-seaence/10 rounded-lg">
						<DSIcon
							name="magnifyPlus"
							class="text-blue-seaence"
						/>
					</div>
				</div>

				<h3 class="mb-2 font-semibold text-center">
					{{ $pt("features.items.search.title") }}
				</h3>

				<p class="text-sm text-muted-foreground">
					{{ $pt("features.items.search.description") }}
				</p>
			</DSCard>

			<DSCard>
				<div class="mb-4 flex justify-center">
					<div class="p-3 bg-secondary/10 rounded-lg">
						<DSIcon
							name="forum"
							class="text-secondary"
						/>
					</div>
				</div>

				<h3 class="mb-2 font-semibold text-center">
					{{ $pt("features.items.forum.title") }}
				</h3>

				<p class="text-sm text-muted-foreground">
					{{ $pt("features.items.forum.description") }}
				</p>
			</DSCard>

			<DSCard>
				<div class="mb-4 flex justify-center">
					<div class="p-3 bg-green-seaence/10 rounded-lg">
						<DSIcon
							name="folder"
							class="text-green-seaence"
						/>
					</div>
				</div>

				<h3 class="mb-2 font-semibold text-center">
					{{ $pt("features.items.organization.title") }}
				</h3>

				<p class="text-sm text-muted-foreground">
					{{ $pt("features.items.organization.description") }}
				</p>
			</DSCard>
		</div>
	</section>

	<section class="mb-12 space-y-6">
		<h2 class=" text-4xl font-bold">
			{{ $pt("faq.title") }}
		</h2>

		<DSAccordion
			type="multiple"
			collapsible
		>
			<DSAccordionItem value="item-1">
				<DSAccordionTrigger>
					{{ $pt("faq.accordion.item1.question") }}
				</DSAccordionTrigger>

				<DSAccordionContent>{{ $pt("faq.accordion.item1.answer") }}</DSAccordionContent>
			</DSAccordionItem>

			<DSAccordionItem value="item-2">
				<DSAccordionTrigger>
					{{ $pt("faq.accordion.item2.question") }}
				</DSAccordionTrigger>

				<DSAccordionContent>{{ $pt("faq.accordion.item2.answer") }}</DSAccordionContent>
			</DSAccordionItem>

			<DSAccordionItem value="item-3">
				<DSAccordionTrigger>
					{{ $pt("faq.accordion.item3.question") }}
				</DSAccordionTrigger>

				<DSAccordionContent>{{ $pt("faq.accordion.item3.answer") }}</DSAccordionContent>
			</DSAccordionItem>

			<DSAccordionItem value="item-4">
				<DSAccordionTrigger>
					{{ $pt("faq.accordion.item4.question") }}
				</DSAccordionTrigger>

				<DSAccordionContent>{{ $pt("faq.accordion.item4.answer") }}</DSAccordionContent>
			</DSAccordionItem>
		</DSAccordion>
	</section>
</template>
