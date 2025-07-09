#!/bin/bash
set -e

# Usage: ./create.sh <snapshot_name> 

source "$(dirname "$0")/../.env"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SNAPSHOT_NAME="${1:-snapshot_$TIMESTAMP}"
SNAPSHOT_PATH="$SNAPSHOT_DIR/$SNAPSHOT_NAME"

echo "Creating: $SNAPSHOT_NAME"

mkdir -p "$SNAPSHOT_PATH"

./mongo/backup.sh "$SNAPSHOT_PATH/mongodb"
./postgres/backup.sh "$SNAPSHOT_PATH/postgres"
cat > "$SNAPSHOT_PATH/metadata.json" << EOF
{
  "name": "$SNAPSHOT_NAME",
  "created_at": "$(date -Iseconds)",
  "version": "1.0",
  "services": ["abys", "school", "bottle", "coral", "beacon", "harbor", "marine-snow"]
}
EOF

echo "Created: $SNAPSHOT_PATH"
echo "Snapshot completed"