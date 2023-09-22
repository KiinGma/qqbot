go env -w CGO_ENABLED=1
go env -w GOOS=windows
go build -ldflags="-H windowsgui -w -s" main.go