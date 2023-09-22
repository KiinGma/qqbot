protoc --go_out=./rest --go_opt=paths=source_relative  --go-grpc_out=./rest --go-grpc_opt=require_unimplemented_servers=false --go-grpc_opt=paths=source_relative  *.proto


注释:
1.检查protoc是否安装
2.检查go bin目录下是否有protoc gen