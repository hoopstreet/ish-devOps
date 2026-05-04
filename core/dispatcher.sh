#!/bin/sh

QUEUE="/root/devos/jobs/queue.txt"

while true; do
  if [ -s "$QUEUE" ]; then
    JOB=$(head -n 1 "$QUEUE")
    sed -i '1d' "$QUEUE"

    TYPE=$(echo "$JOB" | cut -d: -f1)

    case "$TYPE" in
      ai)   sh /root/devos/workers/ai_worker.sh "$JOB" & ;;
      git)  sh /root/devos/workers/git_worker.sh "$JOB" & ;;
      fix)  sh /root/devos/workers/fix_worker.sh "$JOB" & ;;
      *)    sh /root/devos/workers/generic_worker.sh "$JOB" & ;;
    esac
  fi

  sleep 1
done
