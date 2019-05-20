#!/bin/bash

pushd . >/dev/null
cd `dirname $0`/..

export REV=`git rev-parse HEAD | cut -c 1-8`
script/build-prod.sh
script/deploy-to-prod.sh

popd >/dev/null
