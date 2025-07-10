#!/bin/bash

# Usage: ./restore.sh <backup_dir>

set -e

BACKUP_DIR="$1"

if [ ! -d "$BACKUP_DIR" ]; then
    echo "Backup directory not found: $BACKUP_DIR"
    exit 1
fi

POSTGRES_SERVICES=("harbor" "marine-snow")

for service in "${POSTGRES_SERVICES[@]}"; do
    BACKUP_FILE="$BACKUP_DIR/${service}.sql"
    
    if [ -f "$BACKUP_FILE" ]; then
        CONTAINER="${service}-postgres"
        
        if docker ps -q -f name="$CONTAINER" | grep -q .; then
            docker exec "$CONTAINER" psql -U postgres -c "DROP DATABASE IF EXISTS $service;"
            docker exec "$CONTAINER" psql -U postgres -c "CREATE DATABASE $service;"
            docker exec -i "$CONTAINER" psql -U postgres "$service" < "$BACKUP_FILE"
        fi
    fi
done
