go env -w GOOS=linux
go env -w CGO_ENABLED=0
go build main.go