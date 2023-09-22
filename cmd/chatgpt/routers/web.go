package routers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"kiingma/cmd/chatgpt/datastore"
	"kiingma/cmd/chatgpt/handlers"
	"kiingma/cmd/chatgpt/middleware/cors"
	"kiingma/cmd/chatgpt/proto/rest"
	"kiingma/pkg/appconfig"
	"kiingma/pkg/grpc_pkg"
	"time"
)

// 该路由主要设置 后台管理系统等后端应用路由

func InitWebRouter() *gin.Engine {
	router := gin.Default()
	router.Use(cors.Next())
	router.Static("_next", `./out/_next`)
	router.StaticFile("/", "./out/index.html")
	router.StaticFile("/index", "./out/index.html")
	router.StaticFile("/paySuccess", "./out/paySuccess.html")
	router.StaticFile("/site.webmanifest", "./out/site.webmanifest")
	router.StaticFile("/prompts.json", "./out/prompts.json")
	router.StaticFile("/android-chrome-192x192.png", "./out/android-chrome-192x192.png")
	router.StaticFile("/android-chrome-512x512.png", "./out/android-chrome-512x512.png")
	router.StaticFile("/apple-touch-icon.png", "./out/apple-touch-icon.png")
	router.StaticFile("/favicon-16x16.png", "./out/favicon-16x16.png")
	router.StaticFile("/favicon-32x32.png", "./out/favicon-32x32.png")
	router.StaticFile("/serviceWorker.js", "./out/serviceWorker.js")
	router.StaticFile("/404.html", "./out/404.html")
	router.StaticFile("/serviceWorkerRegister.js", "./out//serviceWorkerRegister.js")
	router.StaticFile("/favicon.ico", "./out/favicon.ico")
	router.StaticFile("/google-fonts/css2", "./out/css2")

	appConfig := appconfig.LoadConfig()
	ds, err := datastore.NewStore(appConfig)
	if err != nil {
		fmt.Println(err)
		println("数据库加载失败")
		return nil
	}

	address := appConfig.ChatGptRpcHost + ":" + appConfig.ChatGptRpcPort
	client := rest.NewChatGptServiceClient(grpc_pkg.GetGrpcConn(address).Conn)
	authH := handlers.NewAuthHandler(ds)
	userH := handlers.NewUserHandler(ds)
	uiH := handlers.NewUserIntegrateHandler(ds)
	LOLH := handlers.NewLOLHandler(ds, appConfig, uiH)
	chatH := handlers.NewChatHandler(ds, client, uiH, LOLH)
	configH := handlers.NewConfigHandler(ds)
	router.POST("/stream", streamHandler)
	router.POST("/register", userH.UserRegister)
	router.POST("/notify", uiH.Notify)
	router.GET("/return", uiH.Return)
	router.POST("/config", configH.GetConfig)
	router.GET("/deposit/:externalID/:amount/:time", uiH.Deposit)

	auth := router.Group("/auth")
	{
		auth.POST("/get", authH.AuthCreate)
	}

	api := router.Group("/api")
	api.Use(authH.CheckTokenAuthWithRefresh())
	{
		api.POST("/token", authH.AuthCheck)
		api.POST("/chat", chatH.Chat)
		api.POST("/balance", uiH.GetBalance)
	}

	return router
}

type SteamRequest struct {
	Msg   string `form:"msg" binding:"required"`
	Chats string `form:"chats" binding:"required"`
}

func streamHandler(c *gin.Context) {
	c.Header("Content-Type", "text/event-stream")
	chanStream := make(chan string, 100)
	go generateData(chanStream)
	c.Stream(func(w io.Writer) bool {
		if msg, ok := <-chanStream; ok {
			if msg == "<!finish>" {
				fmt.Println("结束")
				c.SSEvent("stop", "finish")
				return ok
			}
			if msg == "<!error>" {
				c.SSEvent("stop", "error")
				return ok
			}
			c.SSEvent("message", msg)
			fmt.Printf("message: %v\n", msg)
			return true
		}
		return false
	})
}
func streamHandler2(c *gin.Context) {
	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")
	dataChan := make(chan string)
	go generateData(dataChan)
	defer close(dataChan)
	for {
		select {
		case data := <-dataChan:
			c.String(200, "data: "+data+"\n\n")
			/*_, err := io.WriteString(c.Writer, "data: "+data+"\n\n")
			if err != nil {
				fmt.Println(err)
			}*/
			fmt.Println("写入")
			// 强制刷新HTTP响应
		case <-time.After(6 * time.Second):
			// 在10秒内没有接收到数据，则发送一条注释，避免浏览器超时
			_, err := io.WriteString(c.Writer, "[DONE]")
			if err != nil {
				fmt.Println(err)
			}
			fmt.Println("完成")
			goto End
		}
	}
End:
}

func generateData(dataChan chan string) {
	data := `{
  "id": "chatcmpl-7jNX0W2RxluWcxGxtbRvWl7yFeRcv",
  "object": "chat.completion",
  "created": 1691049570,
  "model": "gpt-3.5-turbo-0613",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "%v"    
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 79,
    "completion_tokens": 55,
    "total_tokens": 134
  }
}
`
	// 模拟生成数据的过程，将数据写入通道中
	for i := 0; i < 10; i++ {
		data := fmt.Sprintf(data, i)
		// 将数据写入通道中
		dataChan <- data
		time.Sleep(1 * time.Second)
	}
	dataChan <- "<!finish>"
}
