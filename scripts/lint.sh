#!/usr/bin/env sh
npx concurrently --kill-others-on-fail \
	"npm -w libs/design-system run test:lint" \
	"npm -w libs/clean run test:lint" \
	"npm -w libs/fixture run test:lint" \
	"npm -w services/abys run test:lint" \
	"npm -w services/bottle run test:lint" \
	"npm -w services/colossal run test:lint" \
	"npm -w services/harbor run test:lint" \
	"npm -w services/horizon run test:lint" \
	"npm -w services/marine-snow run test:lint" \
	"npm -w services/pilot run test:lint" \
	"npm -w services/school run test:lint" \
	"npm -w services/sea run test:lint" \
	"npm -w services/spotter run test:lint" \
	"npm -w services/tide run test:lint"