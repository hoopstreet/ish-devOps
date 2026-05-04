#!/bin/sh

JOB="$1"
PID=$$

echo "$PID | AI | $JOB | RUN" >> /root/devos/process/table.txt

TASK=$(echo "$JOB" | cut -d: -f2-)

echo "🧠 AI PROCESSING: $TASK"

sleep 1

echo "$PID | AI | $JOB | DONE" >> /root/devos/process/table.txt
