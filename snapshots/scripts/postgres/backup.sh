#!/bin/bash

# Usage: ./backup.sh <output_dir>

set -e

OUTPUT_DIR="$1"
mkdir -p "$OUTPUT_DIR"

POSTGRES_SERVICES=("harbor" "marine-snow")

for service in "${POSTGRES_SERVICES[@]}"; do
    CONTAINER="${service}-postgres"
    
    if docker ps -q -f name="$CONTAINER" | grep -q .; then
        docker exec "$CONTAINER" pg_dump -U postgres "$service" > "$OUTPUT_DIR/${service}.sql"
    fi
done
