package handlers

import (
	"fmt"
	"github.com/imroc/req/v3"
	"kiingma/cmd/tiktok/models"
	"net/http"
	"strings"
)

//x-secsdk-csrf-token

func GetSecsdkCsrfToken(h *Handler) {
	cookie := models.TiktokCookies{}
	err := h.Ds.Common().GetFirst(&cookie)
	if err != nil {
		fmt.Println("cookie无效")
		return
	}
	Coo = cookie
	return
	resp, err := req.SetHeaders(map[string]string{
		"Accept-Language":            "zh-CN",
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
		"x-secsdk-csrf-request":      "1",
		"x-secsdk-csrf-version":      "1.2.10",
	}).Head(fmt.Sprintf(`https://www.douyin.com/aweme/v1/web/history/write/`))
	if resp.GetHeader("Set-Cookie") != "" {
		cs := strings.Split(resp.GetHeader("Set-Cookie"), ";")
		if len(cs) > 0 {
			css := strings.Split(cs[0], "=")
			if len(css) == 2 {
				if css[0] == "csrf_session_id" {
					cookie.Cookie = parseStringCookies(cookie.Cookie, css[0], css[1])
				}
			}
		}
	}
	ct := resp.GetHeader("X-Ware-Csrf-Token")
	if ct != "" {
		tokenSp := strings.Split(ct, ",")
		if len(tokenSp) > 0 {
			cookie.CsrfToken = tokenSp[1]
		}
	}
	_ = h.Ds.Common().Update(nil, &cookie)
	Coo = cookie
}

func parseCookies(cookieString string) []*http.Cookie {
	cookieList := strings.Split(cookieString, ";")
	cookies := make([]*http.Cookie, len(cookieList))

	for i, cookiePair := range cookieList {
		kv := strings.SplitN(cookiePair, "=", 2)
		if len(kv) == 2 {
			cookies[i] = &http.Cookie{Name: kv[0], Value: kv[1]}
		} else if len(kv) == 1 {
			cookies[i] = &http.Cookie{Name: kv[0]}
		}
	}

	return cookies
}

func cookiesToString(cookies []*http.Cookie) string {
	var cookieStrings []string
	for _, cookie := range cookies {
		fmt.Println(cookie.String())
		cookieStrings = append(cookieStrings, cookie.String())
	}
	return strings.Join(cookieStrings, "; ")
}

func parseStringCookies(o, key, val string) string {
	//按;拆
	s := strings.Split(o, ";")
	//遍历
	for _, v := range s {
		//再拆
		sv := strings.Split(v, "=")
		if len(sv) == 2 {
			if strings.TrimSpace(sv[0]) == key {
				o = strings.ReplaceAll(o, v, " "+key+"="+val)
				return o
			}
		}
	}
	return o
}
