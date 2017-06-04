#!/bin/sh

## Check if root...

NODESTATS_DIR=/var/lib/nodestats
NODESTATS_USER=nodestats

# First, create our new nodestats user...
adduser --system --gecos "NodeStats Service (auto-managed)" --disabled-password --home $NODESTATS_DIR $NODESTATS_USER

# Next make sure we have a profile to pollute
su -s /bin/bash -c -l $NODESTATS_USER "touch $NODESTATS_DIR/.profile"

# Download the NVM shell script from github, not checking for certs because
#  GitHub doesn't actually have a valid cert on very old versions of Debian..
su -s /bin/bash -c -l $NODESTATS_USER "wget -qO- --no-check-certificate https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash" 

# Now download and install the Long-Term-Support version of node for this $ARCH
su -s /bin/bash -c -l $NODESTATS_USER "nvm install --lts"

# Download, only the latest, via git, our shiny new logger tool
su -s /bin/bash -c -l $NODESTATS_USER "cd $NODESTATS_DIR && git clone --depth 1 https://github.com/nodestats/nodestats-logger.git logger"

# We next need to be sure that node has all its dependancies...
su -s /bin/bash -c -l $NODESTATS_USER "cd $NODESTATS_DIR/logger && npm i"

# Run our logger....
su -s /bin/bash -c -l $NODESTATS_USER "cd $NODESTATS_DIR/logger && npm start"

