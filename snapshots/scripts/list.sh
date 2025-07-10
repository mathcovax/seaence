#!/bin/bash

# Usage: ./list.sh [local|server1|server2]

set -e

source "$(dirname "$0")/../.env"

TARGET="${1:-local}"

case $TARGET in
    local)
        echo "Local snapshots in $SNAPSHOT_DIR:"
        if [ -d "$SNAPSHOT_DIR" ]; then
            cd "$SNAPSHOT_DIR"
            for item in *; do
                if [ -d "$item" ] && [ -f "$item/metadata.json" ]; then
                    SIZE=$(du -sh "$item" | cut -f1)
                    CREATED=$(jq -r '.created_at' "$item/metadata.json" 2>/dev/null || echo "Unknown")
                    echo "  $item ($SIZE) - $CREATED"
                fi
            done
        else
            echo "Snapshots directory not found"
        fi
        ;;
    server1)
        echo "Server 1 snapshots ($BACKUP_SERVER_1_HOST):"
        ssh -i "$BACKUP_SERVER_1_KEY_PATH" "$BACKUP_SERVER_1_USER@$BACKUP_SERVER_1_HOST" "ls -lah $BACKUP_SERVER_1_PATH/ 2>/dev/null | grep '^d' | awk '{print \"  \" \$9}' || echo '  No snapshots found'"
        ;;
    server2)
        echo "Server 2 snapshots ($BACKUP_SERVER_2_HOST):"
        ssh -i "$BACKUP_SERVER_2_KEY_PATH" "$BACKUP_SERVER_2_USER@$BACKUP_SERVER_2_HOST" "ls -lah $BACKUP_SERVER_2_PATH/ 2>/dev/null | grep '^d' | awk '{print \"  \" \$9}' || echo '  No snapshots found'"
        ;;
    *)
        echo "Usage: $0 [local|server1|server2]"
        exit 1
        ;;
esac
