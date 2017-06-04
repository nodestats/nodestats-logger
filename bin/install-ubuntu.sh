#!/bin/sh

## Check if root...

NODESTATS_DIR=/var/lib/nodestats
NODESTATS_USER=nodestats

# First, create our new nodestats user...
adduser --system --gecos "NodeStats Service" --disabled-password --group --home $NODESTATS_DIR $NODESTATS_USER

sudo su - $NODESTATS_USER wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
