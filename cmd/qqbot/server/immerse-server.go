package server

import (
	"flag"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"log"
	"net/http"
	"net/url"
	"os"
	"qqbot/cmd/datastore"
	"qqbot/cmd/qqbot/handler"
	openapi "qqbot/cmd/qqbot/swagger/rest"
	"qqbot/cmd/qqbot/wsclient"
	"qqbot/pkg/appconfig"
	"strconv"
)

type DSBServer struct {
	server *echo.Echo
}

func NewServer(ds datastore.DataStore, config *appconfig.Config) *DSBServer {
	var addr = flag.String("addr", config.APIHost+":"+config.APIPort, "http service address")
	u := url.URL{Scheme: "ws", Host: *addr, Path: "/all"}
	requestHeader := http.Header{}
	requestHeader.Add("verifyKey", config.VerifyKey)
	requestHeader.Add("qq", strconv.FormatUint(config.BindQ, 10))
	go wsclient.WSClient(u.String(), requestHeader)
	c := wsclient.GetClient()
	wsClient := handler.NewWsClient(config, c, ds)

	go wsClient.ReadMessage()
	// ----------------
	//   bot client
	// ----------------

	// ----------------
	//   swagger specs
	// ----------------
	spec, err := openapi.GetSwagger()
	if err != nil {
		log.Fatalf("failed to load api swagger specs: %s", err)
		return nil
	}
	spec.Servers = nil

	s := echo.New()
	s.Use(middleware.Logger())
	s.Use(middleware.Recover())

	// ----------------
	// static
	// ----------------
	has, err := PathExists(config.StaticCategoryImages)
	if !has {
		os.MkdirAll(config.StaticCategoryImages, os.ModePerm)
	}
	s.Static("/image", config.StaticCategoryImages)
	s.Static("/data", config.StaticWeb)
	openapi.RegisterHandlers(s, wsClient)
	/*//websocket 服务
	wsHub := wsservice.NewHub()
	go wsHub.Run()

	//handler 注册
	wsHandler := handler.NewWSHandler(wsHub)
	h := handler.NewHandler(ds, config, wsHub)
	openapi.RegisterHandlers(s, h)
	s.GET("/ws/message", wsHandler.WSMessage)*/

	s.POST("/alipay/notify", wsClient.AlipayNotify)
	s.GET("/alipay/return", wsClient.AlipayReturn)
	s.GET("/pay/:id", wsClient.GetPayLink)
	//注册首页
	//s.File("/", config.StaticWeb+`/index.html`)

	/*jwtCustomClaims := middlewares.JwtCustomClaims{}
	jwtConfig := middleware.JWTConfig{
		ErrorHandlerWithContext: middlewares.ErrorHandlerWithContext,
		Skipper:                 middlewares.Skipper,
		Claims:                  &jwtCustomClaims,
		SigningKey:              []byte("secret"),
	}
	s.Use(middleware.JWTWithConfig(jwtConfig))*/

	//s.Logger = logger.New(os.Stdout)

	s.Logger.Info("server start")

	return &DSBServer{
		server: s,
	}
}

func (d *DSBServer) Run(port string) error {

	d.server.Logger.Debug(d.server.Start(":" + port))
	return nil
}

func PathExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}
