#!/bin/sh

## Check if root...

NODESTATS_DIR=/var/lib/nodestats
NODESTATS_USER=nodestats

# Run our logger....
cd $NODESTATS_DIR
su -s /bin/bash -c -l $NODESTATS_USER "cd $NODESTATS_DIR/logger && npm start"

