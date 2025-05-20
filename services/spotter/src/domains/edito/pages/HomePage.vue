<script setup lang="ts">
const { $pt } = homePage.use();
</script>

<template>
	<section
		class="text-center md:text-start mb-12 flex flex-col-reverse md:flex-row gap-7 md:gap-14 justify-between items-center"
	>
		<div class="md:flex-2/3 space-y-6">
			<h1 class="text-4xl font-bold">
				{{ $pt("hero.title.begin") }}
				<span class="text-blue-seaence">{{ $pt("hero.title.spanBlue") }}</span>
				{{ $pt("hero.title.middle") }}
				<span class="text-secondary">{{ $pt("hero.title.spanRed") }}</span>
				{{ $pt("hero.title.end") }}
			</h1>

			<p>
				{{ $pt("hero.subtitle") }}
			</p>

			<DSButtonPrimary as-child>
				<RouterLink :to="simpleSearchPage">
					{{ $t("cta.explore") }}
				</RouterLink>
			</DSButtonPrimary>
		</div>

		<DSImage
			src="/images/edito/hero.png"
			alt="hero"
			class="md:flex-1/3 size-[300px]"
		/>
	</section>

	<section class="text-center md:text-start mb-12 space-y-6">
		<h2 class="text-center text-4xl font-bold">
			{{ $pt("about.title") }}
		</h2>

		<p>{{ $pt("about.content") }}</p>
	</section>

	<section class="text-center md:text-start mb-12 space-y-6">
		<h2 class="text-center text-4xl font-bold">
			{{ $pt("faq.title") }}
		</h2>

		<DSAccordion
			type="multiple"
			collapsible
			class="w-full max-w-3xl mx-auto"
		>
			<DSAccordionItem value="item-1">
				<DSAccordionTrigger>{{ $pt("faq.accordion.item1.question") }}</DSAccordionTrigger>

				<DSAccordionContent>{{ $pt("faq.accordion.item1.answer") }}</DSAccordionContent>
			</DSAccordionItem>

			<DSAccordionItem value="item-2">
				<DSAccordionTrigger>{{ $pt("faq.accordion.item2.question") }}</DSAccordionTrigger>

				<DSAccordionContent>{{ $pt("faq.accordion.item2.answer") }}</DSAccordionContent>
			</DSAccordionItem>
		</DSAccordion>
	</section>
</template>
