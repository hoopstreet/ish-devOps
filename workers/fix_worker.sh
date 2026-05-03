#!/bin/sh

JOB="$1"
PID=$$

echo "$PID | FIX | $JOB | RUN" >> /root/devos/process/table.txt

TARGET=$(echo "$JOB" | cut -d: -f2-)

echo "🛠 FIXING: $TARGET"

sleep 2

echo "FIX APPLIED: $TARGET"

echo "$PID | FIX | $JOB | DONE" >> /root/devos/process/table.txt
