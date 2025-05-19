#!/usr/bin/env sh
npx concurrently --kill-others-on-fail \
	"npm -w services/spotter run build" \
	"npm -w services/lighthouse run build"