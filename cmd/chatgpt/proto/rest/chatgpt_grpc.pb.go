// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v4.22.3
// source: chatgpt.proto

package rest

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// ChatGptServiceClient is the client API for ChatGptService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ChatGptServiceClient interface {
	GetChat(ctx context.Context, in *ChatGptRequest, opts ...grpc.CallOption) (*ChatGptResponse, error)
}

type chatGptServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewChatGptServiceClient(cc grpc.ClientConnInterface) ChatGptServiceClient {
	return &chatGptServiceClient{cc}
}

func (c *chatGptServiceClient) GetChat(ctx context.Context, in *ChatGptRequest, opts ...grpc.CallOption) (*ChatGptResponse, error) {
	out := new(ChatGptResponse)
	err := c.cc.Invoke(ctx, "/rest.ChatGptService/GetChat", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ChatGptServiceServer is the server API for ChatGptService service.
// All implementations should embed UnimplementedChatGptServiceServer
// for forward compatibility
type ChatGptServiceServer interface {
	GetChat(context.Context, *ChatGptRequest) (*ChatGptResponse, error)
}

// UnimplementedChatGptServiceServer should be embedded to have forward compatible implementations.
type UnimplementedChatGptServiceServer struct {
}

func (UnimplementedChatGptServiceServer) GetChat(context.Context, *ChatGptRequest) (*ChatGptResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetChat not implemented")
}

// UnsafeChatGptServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ChatGptServiceServer will
// result in compilation errors.
type UnsafeChatGptServiceServer interface {
	mustEmbedUnimplementedChatGptServiceServer()
}

func RegisterChatGptServiceServer(s grpc.ServiceRegistrar, srv ChatGptServiceServer) {
	s.RegisterService(&ChatGptService_ServiceDesc, srv)
}

func _ChatGptService_GetChat_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ChatGptRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ChatGptServiceServer).GetChat(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/rest.ChatGptService/GetChat",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ChatGptServiceServer).GetChat(ctx, req.(*ChatGptRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// ChatGptService_ServiceDesc is the grpc.ServiceDesc for ChatGptService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var ChatGptService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "rest.ChatGptService",
	HandlerType: (*ChatGptServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetChat",
			Handler:    _ChatGptService_GetChat_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "chatgpt.proto",
}