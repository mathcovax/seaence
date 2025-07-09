#!/bin/bash

# Usage: ./push-on-server.sh <nom_snapshot> <serveur_numero>

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

if [ -d "$SNAPSHOT_DIR/$SNAPSHOT_NAME" ]; then
    LOCAL_PATH="$SNAPSHOT_DIR/$SNAPSHOT_NAME"
else
    echo "Snapshot not found: $SNAPSHOT_NAME"
    exit 1
fi

echo "Uploading to server $SERVER_NUM"

ssh -i "$KEY_PATH" "$USER@$HOST" "mkdir -p $REMOTE_PATH"

scp -i "$KEY_PATH" -r "$LOCAL_PATH" "$USER@$HOST:$REMOTE_PATH/"

echo "Upload completed"