#!/usr/bin/env sh
npx concurrently --kill-others-on-fail "npm -w services/school run generate-types"