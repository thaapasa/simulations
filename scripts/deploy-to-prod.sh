#!/bin/bash

pushd . >/dev/null
cd `dirname $0`/..

export REV=`git rev-parse HEAD | cut -c 1-8`

echo "Copying files to production (rev $REV)..."

ssh deployer@pomeranssi.fi "mkdir -p simulations/deploy" || exit -1
scp deploy/simulations-$REV.tar.gz deployer@pomeranssi.fi:~/simulations/deploy || exit -1

echo "Deploying on server..."

ssh deployer@pomeranssi.fi "bash --login -c 'cd ~/simulations && git pull && script/install-prod.sh $REV'"

popd >/dev/null
