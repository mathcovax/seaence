#!/bin/bash

# Usage: ./restore.sh <nom_snapshot>

set -e

source "$(dirname "$0")/../.env"

SNAPSHOT_NAME="$1"
SNAPSHOT_PATH="$SNAPSHOT_DIR/$SNAPSHOT_NAME"

echo "Restoring: $SNAPSHOT_NAME"

if [ ! -d "$SNAPSHOT_PATH" ]; then
    echo "Snapshot not found: $SNAPSHOT_NAME"
    exit 1
fi

if [ ! -f "$SNAPSHOT_PATH/metadata.json" ]; then
    echo "Missing metadata"
    exit 1
fi

echo "Snapshot info:"
cat "$SNAPSHOT_PATH/metadata.json"

read -p "Restore this snapshot? (y/N): " confirm
if [[ $confirm != [yY] ]]; then
    echo "Restore cancelled"
    exit 0
fi

./mongo/restore.sh "$SNAPSHOT_PATH/mongodb"
./postgres/restore.sh "$SNAPSHOT_PATH/postgres"

echo "Restore completed"