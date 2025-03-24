<script setup lang="ts">
const { REGISTER_PAGE, LOGIN_PAGE } = routerPageName;
</script>

<template>
	<section
		class="text-center md:text-start mb-12 flex flex-col-reverse md:flex-row gap-7 md:gap-14 justify-between items-center">
		<div class="space-y-6">
			<h1 class="text-4xl font-bold">
				{{ $t("page.home.hero.title.begin") }}
				<span class="text-blue-seaence">{{ $t("page.home.hero.title.spanBlue") }}</span>
				{{ $t("page.home.hero.title.middle") }}
				<span class="text-secondary">{{ $t("page.home.hero.title.spanRed") }}</span>
				{{ $t("page.home.hero.title.end") }}
			</h1>

			<p>
				{{ $t("page.home.hero.subtitle") }}
			</p>

			<div class="space-x-2">
				<DSButtonOutline as-child>
					<RouterLink :to="{ name: REGISTER_PAGE }">{{ $t("cta.register") }}</RouterLink>
				</DSButtonOutline>
				<DSButtonPrimary as-child>
					<RouterLink :to="{ name: LOGIN_PAGE }">{{ $t("cta.login") }}</RouterLink>
				</DSButtonPrimary>
			</div>
		</div>

		<img src="/images/edito/hero.png" alt="hero" class="w-full max-w-96 aspect-square" />
	</section>

	<section class="text-center md:text-start mb-12 space-y-6">
		<h2 class="text-center text-4xl font-bold">{{ $t("page.home.about.title") }}</h2>

		<p>{{ $t("page.home.about.content") }}</p>
	</section>

	<section class="text-center md:text-start mb-12 space-y-6">
		<h2 class="text-center text-4xl font-bold">{{ $t("page.home.faq.title") }}</h2>

		<DSAccordion type="multiple" collapsible class="w-full max-w-3xl mx-auto">
			<DSAccordionItem value="item-1">
				<DSAccordionTrigger>{{ $t("page.home.faq.accordion.item1.question") }}</DSAccordionTrigger>
				<DSAccordionContent>{{ $t("page.home.faq.accordion.item1.answer") }}</DSAccordionContent>
			</DSAccordionItem>

			<DSAccordionItem value="item-2">
				<DSAccordionTrigger>{{ $t("page.home.faq.accordion.item2.question") }}</DSAccordionTrigger>
				<DSAccordionContent>{{ $t("page.home.faq.accordion.item2.answer") }}</DSAccordionContent>
			</DSAccordionItem>
		</DSAccordion>
	</section>
</template>
