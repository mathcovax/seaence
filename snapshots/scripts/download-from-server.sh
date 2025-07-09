#!/bin/bash

# Usage: ./download-from-server.sh <nom_snapshot> <serveur_number>

set -e

source "$(dirname "$0")/../.env"

SNAPSHOT_NAME="$1"
SERVER_NUM="$2"

case $SERVER_NUM in
    1)
        HOST="$BACKUP_SERVER_1_HOST"
        USER="$BACKUP_SERVER_1_USER"
        REMOTE_PATH="$BACKUP_SERVER_1_PATH"
        KEY_PATH="$BACKUP_SERVER_1_KEY_PATH"
        ;;
    2)
        HOST="$BACKUP_SERVER_2_HOST"
        USER="$BACKUP_SERVER_2_USER"
        REMOTE_PATH="$BACKUP_SERVER_2_PATH"
        KEY_PATH="$BACKUP_SERVER_2_KEY_PATH"
        ;;
    *)
        echo "Invalid server number. Use 1 or 2"
        exit 1
        ;;
esac

echo "Downloading from server $SERVER_NUM"

REMOTE_PATH_FULL="$REMOTE_PATH/$SNAPSHOT_NAME"
if ! ssh -i "$KEY_PATH" "$USER@$HOST" "test -d $REMOTE_PATH_FULL"; then
    echo "Snapshot not found: $SNAPSHOT_NAME"
    echo "Available snapshots:"
    ssh -i "$KEY_PATH" "$USER@$HOST" "ls -la $REMOTE_PATH/ 2>/dev/null || echo 'No snapshots found'"
    exit 1
fi

mkdir -p "$SNAPSHOT_DIR"

LOCAL_PATH="$SNAPSHOT_DIR/$SNAPSHOT_NAME"

if [ -d "$LOCAL_PATH" ]; then
    read -p "Snapshot exists. Overwrite? (y/N): " confirm
    if [[ $confirm != [yY] ]]; then
        echo "Download cancelled"
        exit 0
    fi
    rm -rf "$LOCAL_PATH"
fi

scp -i "$KEY_PATH" -r "$USER@$HOST:$REMOTE_PATH_FULL" "$SNAPSHOT_DIR/"

echo "Download completed"
