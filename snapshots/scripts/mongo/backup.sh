#!/bin/bash

# Usage: ./backup.sh <output_dir>

set -e

OUTPUT_DIR="$1"
mkdir -p "$OUTPUT_DIR"

MONGO_SERVICES=("abys" "school" "bottle" "coral" "beacon")

for service in "${MONGO_SERVICES[@]}"; do
    CONTAINER="${service}-mongo"
    
    if docker ps -q -f name="$CONTAINER" | grep -q .; then
        docker exec "$CONTAINER" mongodump --db "$service" --archive="/tmp/${service}_backup.archive"
        docker cp "$CONTAINER:/tmp/${service}_backup.archive" "$OUTPUT_DIR/${service}.archive"
        docker exec "$CONTAINER" rm -f "/tmp/${service}_backup.archive"
    fi
done
