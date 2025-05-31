#!/usr/bin/env sh
npx concurrently --kill-others-on-fail \
	"npm -w libs/design-system run test:types" \
	"npm -w libs/clean run test:types" \
	"npm -w libs/fixture run test:types" \
	"npm -w services/abys run test:types" \
	"npm -w services/bottle run test:types" \
	"npm -w services/bridge run test:types" \
	"npm -w services/harbor run test:types" \
	"npm -w services/horizon run test:types" \
	"npm -w services/marine-snow run test:types" \
	"npm -w services/lighthouse run test:types" \
	"npm -w services/school run test:types" \
	"npm -w services/sea run test:types" \
	"npm -w services/coral run test:types" \
	"npm -w services/spotter run test:types"