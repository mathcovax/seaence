#!/usr/bin/env sh
npx concurrently --kill-others-on-fail \
	--names "design-system,clean,fixture,types-query,abys,bottle,bridge,harbor,horizon,marine-snow,lighthouse,school,sea,coral,spotter,beacon" \
	"npm -w libs/design-system run test:lint" \
	"npm -w libs/clean run test:lint" \
	"npm -w libs/fixture run test:lint" \
	"npm -w libs/types-advanced-query run test:lint" \
	"npm -w services/abys run test:lint" \
	"npm -w services/bottle run test:lint" \
	"npm -w services/bridge run test:lint" \
	"npm -w services/harbor run test:lint" \
	"npm -w services/horizon run test:lint" \
	"npm -w services/marine-snow run test:lint" \
	"npm -w services/lighthouse run test:lint" \
	"npm -w services/school run test:lint" \
	"npm -w services/sea run test:lint" \
	"npm -w services/coral run test:lint" \
	"npm -w services/spotter run test:lint" \
	"npm -w services/beacon run test:lint"
