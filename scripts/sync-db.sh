#!/bin/bash

# Configuration
REMOTE_USER="root"
REMOTE_HOST="您的服务器IP"
REMOTE_DB_PATH="/path/to/your/project/data/ntet.db"
LOCAL_DB_PATH="./data/ntet.db"

echo "--- STARTING REMOTE DATABASE SYNC ---"
echo "Target: ${REMOTE_HOST}"

# Create backup of local DB before overwriting
if [ -f "$LOCAL_DB_PATH" ]; then
    cp "$LOCAL_DB_PATH" "${LOCAL_DB_PATH}.bak.$(date +%Y%m%d%H%M%S)"
    echo "[BACKUP] Created local database backup."
fi

# Pull from remote
scp "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DB_PATH}" "$LOCAL_DB_PATH"

if [ $? -eq 0 ]; then
    echo "[SUCCESS] Production database synced to local."
else
    echo "[ERROR] Failed to sync database. Please check SSH connection."
fi

echo "--- SYNC COMPLETE ---"
