package handlers

import (
	"fmt"
	"github.com/imroc/req/v3"
	"github.com/tidwall/gjson"
	"io"
	"kiingma/cmd/tiktok/models"
)

//处理粉丝类相关

//根据抖音号搜索是否有该粉丝

func GetFollowerByUniqueId(h *Handler, id string) bool {
	cookie := models.TiktokCookies{}
	err := h.Ds.Common().GetFirst(&cookie)
	if err != nil {
		return false
	}
	resp, err := req.SetHeaders(map[string]string{
		"Cookie":                     cookie.Cookie + ";" + cookie.MsToken,
		"Referer":                    "https://www.douyin.com/user/self",
		"Sec-Fetch-Dest":             "empty",
		"Sec-Fetch-Mode":             "cors",
		"Sec-Fetch-Site":             "same-origin",
		"User-Agent":                 "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) douyin/2.3.1 Chrome/104.0.5112.102 Electron/20.1.0-tt.4.release.douyin.77 TTElectron/20.1.0-tt.4.release.douyin.77 Safari/537.36 awemePcClient/2.3.1 buildId/10433720 osName/Windows",
		"X-AWEME-CLIENTVERSION":      X_AWEME_CLIENTVERSION,
		"X-AWEME-DEVICEMANUFACTURER": "Gigabyte Technology Co. Ltd.",
		"X-AWEME-DEVICEMODEL":        "B760M GAMING DDR4",
		"X-AWEME-DEVICENAME":         "94b0d1a90c469719cdc44ab91ec1b2b3",
		"X-AWEME-DEVICEOS":           "Windows 11",
		"X-AWEME-GUID":               "eebc8607734db209096c75a3e99a0b7eec6a560bf2f0dcf398e862676cd7630d0469c98e22844541d748014bb61159ec",
		"sec-ch-ua":                  "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"104\"",
		"sec-ch-ua-mobile":           "?0",
		"sec-ch-ua-platform":         "\"Windows\"",
	}).Get(h.AppConfig.DouYinFollowerList + fmt.Sprintf("&query=%v", id))
	body, err := io.ReadAll(resp.Body)
	fmt.Println(string(body))
	words := gjson.GetBytes(body, "data.words").Array()
	if len(words) != 0 {
		return true
	}
	return false
}
