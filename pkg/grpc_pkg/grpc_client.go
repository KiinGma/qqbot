package grpc_pkg

import (
	"context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/connectivity"
	"google.golang.org/grpc/credentials/insecure"
	"log"
	"time"
)

var GrpcConn *GrpcPkg

func GetGrpcConn(addr string) *GrpcPkg {
	if GrpcConn != nil {
		return GrpcConn
	} else {
		_, _ = NewClient(addr)
		return GrpcConn
	}
}

type GrpcPkg struct {
	Conn *grpc.ClientConn
}

func NewClient(addr string) (*grpc.ClientConn, error) {
	var opts []grpc.DialOption
	opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))
	// 创建gRPC连接
	conn, err := grpc.Dial(addr, opts...)
	if err != nil {
		log.Fatalf("Failed to connect to gRPC server: %v", err)
	}
	// 监听连接状态
	go func() {
		for {
			if conn.WaitForStateChange(context.Background(), conn.GetState()) {
				if conn.GetState() == connectivity.Connecting {
					log.Println("Connection lost. Reconnecting...")
					// 连接断开，尝试重新建立连接
					for {
						conn.ResetConnectBackoff()
						ok := conn.WaitForStateChange(context.Background(), connectivity.Connecting)
						if !ok {
							log.Printf("Failed to wait for state change: %v", err)
							time.Sleep(1 * time.Second)
							continue
						}
						change := conn.WaitForStateChange(context.Background(), connectivity.Ready)
						if !change {
							log.Printf("Failed to wait for state change: %v", err)
							time.Sleep(1 * time.Second)
							continue
						}
						break
					}
					log.Println("Connection reestablished.")
				}
			}
		}
	}()
	GrpcConn = &GrpcPkg{
		Conn: conn,
	}
	return conn, nil
}
