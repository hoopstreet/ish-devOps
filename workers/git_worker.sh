#!/bin/sh

JOB="$1"
PID=$$

echo "$PID | GIT | $JOB | RUN" >> /root/devos/process/table.txt

CMD=$(echo "$JOB" | cut -d: -f2)
REPO=$(echo "$JOB" | cut -d: -f3)

echo "📦 GIT TASK: $CMD on $REPO"

case "$CMD" in
  clone)
    git clone "$REPO" /root/repos/$(date +%s)
    ;;
  pull)
    git -C "$REPO" pull
    ;;
  push)
    git -C "$REPO" add .
    git -C "$REPO" commit -m "devos auto update"
    git -C "$REPO" push
    ;;
  *)
    echo "UNKNOWN GIT CMD"
    ;;
esac

echo "$PID | GIT | $JOB | DONE" >> /root/devos/process/table.txt
