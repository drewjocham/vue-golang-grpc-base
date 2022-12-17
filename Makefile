PROJ_PATH=${CURDIR}
PROTO_DEST=./src/proto

.PHONY: install-view
build-view: ## install node_modules
	cd view && yarn

.PHONY: build-view
build-view: ## build client for production
	cd view && yarn build

.PHONY: build-api
build-api: ## build api for production
	cd api && go build

.PHONY: docker-build
build: ## start docker compose
	docker-compose build

.PHONY: docker-up
up: ## start docker compose
	docker-compose up -d

.PHONY: docker-down
down: ## start docker compose
	docker-compose down

.PHONY: dockerhub-image
dockerhub-image: ## start docker with dockerhub image
	docker-compose -f docker-compose-deploy.yml up

.PHONY: dockerhub-image-down
dockerhub-image-down: ## stop docker with dockerhub image
	docker-compose -f docker-compose-deploy.yml down

.PHONY: mod-vendor
mod-vendor: ## Download, verify and vendor dependencies
	cd api && go mod tidy && go mod download && go mod verify && go mod vendor

.PHONY: linter
linter: ## Run linter
	cd api && golangci-lint run

# go install \
    github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway@latest \
    github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2@latest

# git submodule add https://github.com/googleapis/googleapis
.PHONY: proto
proto: ## Generate protobuf code
# Compile proto files inside the project.
	protoc api.proto --proto_path=${PROJ_PATH}/proto --go_out=. --go-grpc_out=. \
		   --grpc-gateway_out . \
		   --grpc-gateway_opt generate_unbound_methods=true \
		   --plugin=protoc-gen-grpc-gateway=${GOPATH}/bin/protoc-gen-grpc-gateway \
		   --openapiv2_out ${PROJ_PATH}/api/webapi \
           --openapiv2_opt logtostderr=true \
           --openapiv2_opt generate_unbound_methods=true

	# JavaScript code generation
	cd view && yarn run grpc_tools_node_protoc \
        --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
        --ts_out=grpc_js:${PROTO_DEST} \
        --js_out=import_style=commonjs:${PROTO_DEST} \
        --grpc_out=grpc_js:${PROTO_DEST} \
        -I ${PROJ_PATH}/proto \
        ${PROJ_PATH}/proto/*.proto


