#!/bin/bash

set -e

ARGUMENTS="$@"

eslint --quiet $ARGUMENTS business/

eslint --quiet $ARGUMENTS interfaces/