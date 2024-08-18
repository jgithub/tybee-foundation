ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
FILENAME := MyTybeeProject-lambda-$(shell date '+%Y%m%d_%H%M').zip

.PHONY: runDev
runDev:
	LOG_DEBUG=1 LOG_INFO=1 LOG_TRACE=1 npx tsx src/server.ts


.PHONY: dist
dist: cleandist
	cd ${ROOT_DIR} && ${MAKE} build
	cd ${ROOT_DIR} && cp -r node_modules dist 
	cd ${ROOT_DIR} && rm -rf dist/node_modules/chai
	cd ${ROOT_DIR} && rm -rf dist/node_modules/mocha
	cd ${ROOT_DIR} && rm -rf dist/node_modules/ts-node 
	cd ${ROOT_DIR} && rm -rf dist/node_modules/typescript
	cd ${ROOT_DIR}/dist && zip -r ../${FILENAME} .

.PHONY: build
build: 
	npm run build

.PHONY: cleandist
cleandist:
	cd ${ROOT_DIR} && rm -f function.zip
	cd ${ROOT_DIR} && rm -rf dist/*

.PHONY: test
test:
	cd ${ROOT_DIR} && TZ='America/Chicago' LOG_DEBUG=1 LOG_TRACE=0 LOG_INFO=1 TS_NODE_COMPILER_OPTIONS='{"module": "commonjs"}' npx mocha 'test/**/*.test.ts'
#	cd ${ROOT_DIR} && npm test

.PHONE: cli
cli:
	cd ${ROOT_DIR} && LOG_DEBUG=1 LOG_TRACE=0 LOG_INFO=1 npx ts-node src/cli.ts
