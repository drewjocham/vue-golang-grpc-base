PROJ_PATH=${CURDIR}
PROTO_DEST=./src/proto

.PHONY: mod-vendor
mod-vendor: ## Download, verify and vendor dependencies
	go mod download
	go mod verify
	go mod vendor

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
		   --openapiv2_out . \
           --openapiv2_opt logtostderr=true \
           --openapiv2_opt generate_unbound_methods=true

	# JavaScript code generation
	cd client && yarn run grpc_tools_node_protoc \
        --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
        --ts_out=grpc_js:${PROTO_DEST} \
        --js_out=import_style=commonjs:${PROTO_DEST} \
        --grpc_out=grpc_js:${PROTO_DEST} \
        -I ${PROJ_PATH}/proto \
        ${PROJ_PATH}/proto/*.proto


