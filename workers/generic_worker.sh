#!/bin/sh

JOB="$1"
PID=$$

echo "$PID | GEN | $JOB | RUN" >> /root/devos/process/table.txt

echo "⚙️ EXEC: $JOB"

sleep 1

echo "$PID | GEN | $JOB | DONE" >> /root/devos/process/table.txt
