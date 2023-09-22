package main

import (
	"kiingma/cmd/chatgpt/routers"
)

func main() {
	router := routers.InitWebRouter()
	_ = router.Run(":3001")
}
