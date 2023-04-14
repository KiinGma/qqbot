protoc --go_out=./rest --go_opt=paths=source_relative  --go-grpc_out=./rest --go-grpc_opt=require_unimplemented_servers=false --go-grpc_opt=paths=source_relative  *.proto
