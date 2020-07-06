#!/bin/bash

pushd . >/dev/null
cd `dirname $0`/..

HOST=simulaatiot.pomeranssi.fi

export REV=`git rev-parse HEAD | cut -c 1-8`

echo "Copying files to production (rev $REV)..."

ssh deployer@$HOST "mkdir -p simulations/deploy" || exit -1
scp deploy/simulations-$REV.tar.gz deployer@$HOST:~/simulations/deploy || exit -1

echo "Deploying on server..."

ssh deployer@$HOST "bash --login -c 'cd ~/simulations && git pull && script/install-prod.sh $REV'"

popd >/dev/null
