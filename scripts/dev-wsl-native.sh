#!/usr/bin/env bash
set -euo pipefail

SOURCE_PATH="${1:-/mnt/d/fc}"
TARGET_PATH="${2:-/root/fc-wsl}"
PORT="${PORT:-3000}"

case "$TARGET_PATH" in
  /root/fc-wsl|/home/*/fc-wsl) ;;
  *)
    echo "Refusing unexpected target path: $TARGET_PATH" >&2
    exit 1
    ;;
esac

mkdir -p "$TARGET_PATH"
touch "$TARGET_PATH/.wsl-native-mirror"

echo "Stopping existing Next dev processes on port $PORT..."
ps -eo pid=,args= |
  awk -v port="$PORT" '$0 ~ /node .*node_modules\/\.bin\/next dev/ && $0 ~ (" -p " port) { print $1 }' |
  xargs -r kill || true
sleep 1

echo "Syncing $SOURCE_PATH -> $TARGET_PATH ..."
rsync -a --delete \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='scratch' \
  --exclude='.chrome-debug-profile' \
  --exclude='tsconfig.tsbuildinfo' \
  "$SOURCE_PATH/" "$TARGET_PATH/"

cd "$TARGET_PATH"

if [ ! -d node_modules ] || [ package-lock.json -nt node_modules/.package-lock.json ]; then
  echo "Installing dependencies in WSL native workspace..."
  npm ci --no-audit --no-fund
fi

mkdir -p scratch
rm -f "scratch/wsl-native-dev-$PORT.out.log" "scratch/wsl-native-dev-$PORT.err.log"

echo "Starting Next dev from $TARGET_PATH on port $PORT..."
setsid -f sh -c "npm run dev > scratch/wsl-native-dev-$PORT.out.log 2> scratch/wsl-native-dev-$PORT.err.log < /dev/null"

for _ in $(seq 1 60); do
  if grep -q 'Ready in' "scratch/wsl-native-dev-$PORT.out.log" 2>/dev/null; then
    echo "Ready: http://localhost:$PORT/"
    exit 0
  fi

  if grep -q 'Failed to start server' "scratch/wsl-native-dev-$PORT.err.log" 2>/dev/null; then
    cat "scratch/wsl-native-dev-$PORT.err.log" >&2
    exit 1
  fi

  sleep 1
done

echo "Timed out waiting for Next dev. Recent logs:" >&2
tail -80 "scratch/wsl-native-dev-$PORT.out.log" >&2 || true
tail -80 "scratch/wsl-native-dev-$PORT.err.log" >&2 || true
exit 1
