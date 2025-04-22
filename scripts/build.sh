#!/usr/bin/env sh
npx concurrently --kill-others-on-fail \
	"npm -w services/spotter run build" \
	"npm -w services/tide run build" \
	"npm -w services/colossal run build" \
	"npm -w services/pilot run build"