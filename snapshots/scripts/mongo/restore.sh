#!/bin/bash

# Usage: ./restore.sh <backup_dir>

set -e

BACKUP_DIR="$1"

if [ ! -d "$BACKUP_DIR" ]; then
    echo "Backup directory not found: $BACKUP_DIR"
    exit 1
fi

MONGO_SERVICES=("abys" "school" "bottle" "coral" "beacon")

for service in "${MONGO_SERVICES[@]}"; do
    BACKUP_FILE="$BACKUP_DIR/${service}.archive"
    
    if [ -f "$BACKUP_FILE" ]; then
        CONTAINER="${service}-mongo"
        
        if docker ps -q -f name="$CONTAINER" | grep -q .; then
            docker cp "$BACKUP_FILE" "$CONTAINER:/tmp/${service}_backup.archive"
            docker exec "$CONTAINER" mongorestore --db "$service" --archive="/tmp/${service}_backup.archive" --drop
            docker exec "$CONTAINER" rm -f "/tmp/${service}_backup.archive"
        fi
    fi
done
