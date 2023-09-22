go env -w CGO_ENABLED=0
go env -w GOOS=linux
go build main.go