package handler

import (
	"fmt"
	"github.com/imroc/req/v3"
	"github.com/tidwall/gjson"
	"io"
	"os"
	"strconv"
)

//发布静态图片

func (h *WsHandler) FactStatic() {
	for _, v := range h.resp.Data.MessageChain {
		switch {
		case v.Text == "发布文件":
			h.client.SendGroupMessageWithString(h.Gid, h.sendId, " 请发送需要发布的文件")
			SessionTypeMap = map[uint64]int{
				h.Gid: 3,
			}
		case v.Type == "File":
			h.client.GetFileInfo(h.Gid, strconv.FormatInt(v.Id, 10))
			m := <-h.client.Read
			name := v.Name
			u := gjson.GetBytes(m, "data.data.downloadInfo.url").String()
			go DownFile(h, u, name)
			SessionTypeMap[h.Gid] = 0
		}
	}
}

func DownFile(h *WsHandler, url string, name string) {
	r, err := req.Get(url)
	defer r.Body.Close()
	sendIdStr := strconv.FormatUint(h.sendId, 10)
	dir := h.AppConfig.StaticWeb + "/" + sendIdStr
	file, err := os.Create(dir + "/" + name)
	if os.IsNotExist(err) {
		os.MkdirAll(dir, os.ModePerm)
		file, err = os.Create(dir + "/" + name)
	}
	defer file.Close()
	s, err := io.ReadAll(r.Body)

	_, err = file.Write(s)
	if err != nil {
		fmt.Println(err)
	}
	h.client.SendGroupMessageWithString(h.Gid, h.sendId, fmt.Sprintf(" 发布成功,发布地址: http://%v:%v/data/%v/%v", h.AppConfig.APIHost, h.AppConfig.ServerPort, h.sendId, name))
}
