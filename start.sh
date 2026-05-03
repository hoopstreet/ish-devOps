#!/bin/sh

echo "🚀 DEVOS v14 STARTING MULTI-PROCESS ENGINE"

sh /root/devos/core/dispatcher.sh &
sh /root/devos/sys/status.sh
