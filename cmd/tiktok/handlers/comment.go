package handlers

import (
	"fmt"
	"github.com/imroc/req/v3"
	"github.com/tidwall/gjson"
	"io"
	"kiingma/cmd/tiktok/models"
	pkg "kiingma/cmd/x_bogus"
	"net/url"
	"strings"
	"time"
)

const (
	X_AWEME_CLIENTVERSION = "2.3.1"
	User_Agent            = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) douyin/2.3.1 Chrome/104.0.5112.102 Electron/20.1.0-tt.4.release.douyin.77 TTElectron/20.1.0-tt.4.release.douyin.77 Safari/537.36 awemePcClient/2.3.1 buildId/10433720 osName/Windows"
	Client_cert           = `LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNGRENDQWJ1Z0F3SUJBZ0lWQUlyL21WdERxT2xud2pZKzhCZGpVY1lQTUFGek1Bb0dDQ3FHU000OUJBTUMKTURFeEN6QUpCZ05WQkFZVEFrTk9NU0l3SUFZRFZRUUREQmwwYVdOclpYUmZaM1ZoY21SZlkyRmZaV05rYzJGZgpNalUyTUI0WERUSXpNRFV5T0RFek1qazFObG9YRFRNek1EVXlPREl4TWprMU5sb3dKekVMTUFrR0ExVUVCaE1DClEwNHhHREFXQmdOVkJBTU1EMkprWDNScFkydGxkRjluZFdGeVpEQlpNQk1HQnlxR1NNNDlBZ0VHQ0NxR1NNNDkKQXdFSEEwSUFCRVIvRnFrUHVvcldnWGxCQ2xPWmY3TnpJSTRCc2FHcmdEZ2YybGFsTlpjcnQxVHFHZHJIQ0hGOQpTR1A4aE1qc1ZzVm8wZE83ZVJDYnNzUnBzOU9NZnFDamdia3dnYll3RGdZRFZSMFBBUUgvQkFRREFnV2dNREVHCkExVWRKUVFxTUNnR0NDc0dBUVVGQndNQkJnZ3JCZ0VGQlFjREFnWUlLd1lCQlFVSEF3TUdDQ3NHQVFVRkJ3TUUKTUNrR0ExVWREZ1FpQkNCSjQzWkhSblg5cVNTQko3cHRGQWJra3Z2UWhWdm81aWJrRUZNM2VOUzhYekFyQmdOVgpIU01FSkRBaWdDQXlwV2Zxam1SSUVvM01UazFBZTNNVW0wZHRVM3FrMFlEWGVaU1hleUpIZ3pBWkJnTlZIUkVFCkVqQVFnZzUzZDNjdVpHOTFlV2x1TG1OdmJUQUtCZ2dxaGtqT1BRUURBZ05IQURCRUFpQThZcDg1dFoxWmZiL1EKQXBhTlFVSUlHQTNiL1k1ZE1mOTJhdW03ZEZOSWpBSWdRMEFZWUQ3blVES0NWUnFZRFErbERsVERpM2VxWWZXOQo3dXBkYWNhU0RCcz0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=`
	Client_data           = `eyJ0c19zaWduIjoidHMuMS41ZjkwYzdkMDdjYzE2MGJjN2JhOGU4NWZkZjA5ZGJkZmIzNzVjNzBmNDU1MDQ5NDM1MWUxNTcyMzU1NTdmZTY5YzRmYmU4N2QyMzE5Y2YwNTMxODYyNGNlZGExNDkxMWNhNDA2ZGVkYmViZWRkYjJlMzBmY2U4ZDRmYTAyNTc1ZCIsInJlcV9jb250ZW50IjoidGlja2V0LHBhdGgsdGltZXN0YW1wIiwicmVxX3NpZ24iOiJNRVlDSVFDczdLU0pjZnRlMjl2aURyWE5BYit5QTgvekF5RVRLRjR2ZHBkeEFHT0ovQUloQVBjWlI1K2FtSVNhaTN0TUIwZzJOZUJzRUZ2bS83eFJpb0VxWnNjSGg2ZGMiLCJ0aW1lc3RhbXAiOjE2ODUyODA2Mjd9`
)

//POST https://www.douyin.com/aweme/v1/web/comment/publish?app_name=aweme&device_platform=webapp&aid=6383&channel=channel_pc_web&pc_client_type=2&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=2560&screen_height=1440&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=104.0.5112.102&browser_online=true&engine_name=Blink&engine_version=104.0.5112.102&os_name=Windows&os_version=10&cpu_core_num=16&device_memory=8&platform=PC&downlink=9.8&effective_type=4g&round_trip_time=0&webid=7233244916146570790&msToken=HBr_-B2mMBTyIRTwy_XgruhTagCrDnde_Eff6tyNIxko0lCtJMefLjzF3RxgesdMj_TAK5LL7ScZwR8SOA5TzzrrP2zN0HlDb3U5HzA6xU2kgHi1733jyg==&X-Bogus=DFSzswVudVBKI49QtS3nNVXAIQ2M HTTP/1.1
//Host: www.douyin.com
//Connection: keep-alive
//Content-Length: 140
//Accept: application/json, text/plain, */*
//Accept-Encoding: gzip, deflate, br
//Accept-Language: zh-CN
//Content-Type: application/x-www-form-urlencoded; charset=UTF-8
//Cookie: ttwid=1%7CHDlv1DYQ3PZB3-UzLwB3f3YXxFIglMtVvBC_fO6BoSU%7C1684121087%7C93fe28ce339919aa2ee598c02ecc5d1b3a2d676b12182c5ca4b36d34c9a25db7; home_can_add_dy_2_desktop=%220%22; theme=%22dark%22; passport_csrf_token=aa2a17c39f4428afffe122c51d56d84f; passport_csrf_token_default=aa2a17c39f4428afffe122c51d56d84f; s_v_web_id=verify_li141bs8_EHDFz5yE_PNgN_4eEk_BZLM_0yksAXZ6lNbt; ttcid=80014b7d781f4abf95388141128df0aa32; store-region=cn-gd; store-region-src=uid; my_rd=1; _tea_utm_cache_2018=undefined; FOLLOW_LIVE_POINT_INFO=%22MS4wLjABAAAADXSMkLZtz5Mfc6Tv4qyhFL5VlI_VCPmpDG1POjQC-Xo%2F1684944000000%2F0%2F0%2F1684927717613%22; FOLLOW_NUMBER_YELLOW_POINT_INFO=%22MS4wLjABAAAADXSMkLZtz5Mfc6Tv4qyhFL5VlI_VCPmpDG1POjQC-Xo%2F1684944000000%2F0%2F1684927117614%2F0%22; passport_assist_user=CkF1mfOX84UOUYCgcZX9no3EqLVcZXKLc24ylFxXDLa1VhTJJ-fc8_UgV_LkA5ht1nOs5dO1clARpTrrhxNyoJHLIxpICjw7r6bNIMa5sK64hi-kbc6FeujsfuFPzM7lc50nDMWP-dwcYgh14fkJCS_qteHHhkz_jno5fCz5RICLJ0QQ5P2xDRiJr9ZUIgED9QWrGA%3D%3D; n_mh=WbQ-M8EMjwCEYjcl67KwGAB8KlP7J6lgcQJE98cWDx8; sso_uid_tt=8f529b5f8bb7f548908585facb8b8de2; sso_uid_tt_ss=8f529b5f8bb7f548908585facb8b8de2; toutiao_sso_user=be7ddfbf3197f8f5bf26ed9422d13311; toutiao_sso_user_ss=be7ddfbf3197f8f5bf26ed9422d13311; sid_ucp_sso_v1=1.0.0-KDU3NTE2YWQ1ZmQ1N2Y0ODkxYTllNzQ2ZDlmOTZjZjZkMjI2YjA3OGEKHwjTmaDu7cy4BRCY5bejBhjvMSAMMKK6t6MGOAZA9AcaAmxmIiBiZTdkZGZiZjMxOTdmOGY1YmYyNmVkOTQyMmQxMzMxMQ; ssid_ucp_sso_v1=1.0.0-KDU3NTE2YWQ1ZmQ1N2Y0ODkxYTllNzQ2ZDlmOTZjZjZkMjI2YjA3OGEKHwjTmaDu7cy4BRCY5bejBhjvMSAMMKK6t6MGOAZA9AcaAmxmIiBiZTdkZGZiZjMxOTdmOGY1YmYyNmVkOTQyMmQxMzMxMQ; odin_tt=4b73378ac8f36d54f0cd04ab8a55291fe9332bd500cacd41f6f9340927cff252f0542dac0e054582895c7b266a9901a89c48b48f6c0b2e6b6d831071575c8244; passport_auth_status=692356bd0458eba471e500f3c5bd7ca6%2Ccf21342bafb81563f4738cdc6c9be9e5; passport_auth_status_ss=692356bd0458eba471e500f3c5bd7ca6%2Ccf21342bafb81563f4738cdc6c9be9e5; uid_tt=6d99c7ff85f0394a7e290f7f0f0862db; uid_tt_ss=6d99c7ff85f0394a7e290f7f0f0862db; sid_tt=2f3149d38aa8b1e5f3e1e420c2ef1547; sessionid=2f3149d38aa8b1e5f3e1e420c2ef1547; sessionid_ss=2f3149d38aa8b1e5f3e1e420c2ef1547; LOGIN_STATUS=1; sid_guard=2f3149d38aa8b1e5f3e1e420c2ef1547%7C1684927133%7C5183998%7CSun%2C+23-Jul-2023+11%3A18%3A51+GMT; sid_ucp_v1=1.0.0-KGYwZDk2ZTEzMWQ0MjBhYzkxMGQzOGQ4YmNiY2ViZjFmNjE2MjIwYWQKGwjTmaDu7cy4BRCd5bejBhjvMSAMOAZA9AdIBBoCbHEiIDJmMzE0OWQzOGFhOGIxZTVmM2UxZTQyMGMyZWYxNTQ3; ssid_ucp_v1=1.0.0-KGYwZDk2ZTEzMWQ0MjBhYzkxMGQzOGQ4YmNiY2ViZjFmNjE2MjIwYWQKGwjTmaDu7cy4BRCd5bejBhjvMSAMOAZA9AdIBBoCbHEiIDJmMzE0OWQzOGFhOGIxZTVmM2UxZTQyMGMyZWYxNTQ3; __ac_signature=_02B4Z6wo00f01ZhoA9QAAIDA-2LDvz6hoiWYSAdAAAJ1YwcGlShU6Io2QWC7oaezyYPD4ctDB12cMOrc4kRo6LdO6OqpFeGtrZla.Z6hkX3h5DAw-I-5EIo6KjA8Zr3YgRl7nhm6u7P1pZkM08; SEARCH_RESULT_LIST_TYPE=%22single%22; d_ticket=49a024dfee1bbd9ce625a740f0bc3a599629b; publish_badge_show_info=%221%2C0%2C0%2C1685011926810%22; client_push={"live_push_record":""}; douyin.com; strategyABtestKey=%221685075274.357%22; VIDEO_FILTER_MEMO_SELECT=%7B%22expireTime%22%3A1685680074370%2C%22type%22%3A1%7D; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtY2xpZW50LWNlcnQiOiItLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS1cbk1JSUNGVENDQWJ1Z0F3SUJBZ0lWQUt2QVdndjMyR2trU2VTOWl4ZGg5TFk3eHFZbk1Bb0dDQ3FHU000OUJBTUNcbk1ERXhDekFKQmdOVkJBWVRBa05PTVNJd0lBWURWUVFEREJsMGFXTnJaWFJmWjNWaGNtUmZZMkZmWldOa2MyRmZcbk1qVTJNQjRYRFRJek1EVXlOREF5TlRNeE9Wb1hEVE16TURVeU5ERXdOVE14T1Zvd0p6RUxNQWtHQTFVRUJoTUNcblEwNHhHREFXQmdOVkJBTU1EMkprWDNScFkydGxkRjluZFdGeVpEQlpNQk1HQnlxR1NNNDlBZ0VHQ0NxR1NNNDlcbkF3RUhBMElBQktKTU0zMFBBQ1M0UGF2NkZqc0gxaFd6YVAxa2NoV254S2JzczhSaEU3Ry9qSDdRVmNJb2dSNmxcbnA0WGlyZ0tsVWdRNjU2NWlGei8vdHZ3TVhIOEg0VkNqZ2Jrd2diWXdEZ1lEVlIwUEFRSC9CQVFEQWdXZ01ERUdcbkExVWRKUVFxTUNnR0NDc0dBUVVGQndNQkJnZ3JCZ0VGQlFjREFnWUlLd1lCQlFVSEF3TUdDQ3NHQVFVRkJ3TUVcbk1Da0dBMVVkRGdRaUJDRC9BV2d0UHROdCtNVU5TV2txZzJqMlpKcjdZNnZLMGdFaUR3d1l5QzJSSURBckJnTlZcbkhTTUVKREFpZ0NBeXBXZnFqbVJJRW8zTVRrMUFlM01VbTBkdFUzcWswWURYZVpTWGV5SkhnekFaQmdOVkhSRUVcbkVqQVFnZzUzZDNjdVpHOTFlV2x1TG1OdmJUQUtCZ2dxaGtqT1BRUURBZ05JQURCRkFpRUExS1lsU2FzbmJQc2NcbnY4a1NYUVlaeFprL3k3c3JFZ2g2U3d5TUlkOFNHZ3NDSUFzYW5MOUVCbTdLQ2RoWG0rWFdCcHRIMFdFSzRQLzBcbnBVeFludUYxOHk3U1xuLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLVxuIn0=; csrf_session_id=8d9adac3309caafc8e57aea40615ea2a; passport_fe_beating_status=true; tt_scid=Mz0AssIEQMxpChRvNgOJNwPSiplf2oAQo977z0VS.l9UDPfayZvPP-8WWyyMtsJt68aa; msToken=m42_Ixq2CLUbRlYVmo1Wv93bMm6NiWqqTw6GxgyrQrofAR1vrtyJE3x4v8H-BGAeBCrlCKagWxF4JO4XkKhXHOHSw1GDDvqJYrogEDj4_WE4ZQS3HrmENA==; msToken=HBr_-B2mMBTyIRTwy_XgruhTagCrDnde_Eff6tyNIxko0lCtJMefLjzF3RxgesdMj_TAK5LL7ScZwR8SOA5TzzrrP2zN0HlDb3U5HzA6xU2kgHi1733jyg==
//Origin: https://www.douyin.com
//Referer: https://www.douyin.com/user/self
//Sec-Fetch-Dest: empty
//Sec-Fetch-Mode: cors
//Sec-Fetch-Site: same-origin
//User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) douyin/2.3.1 Chrome/104.0.5112.102 Electron/20.1.0-tt.4.release.douyin.77 TTElectron/20.1.0-tt.4.release.douyin.77 Safari/537.36 awemePcClient/2.3.1 buildId/10433720 osName/Windows
//X-AWEME-CLIENTVERSION: 2.3.1
//X-AWEME-DEVICEMANUFACTURER: Gigabyte Technology Co. Ltd.
//X-AWEME-DEVICEMODEL: B760M GAMING DDR4
//X-AWEME-DEVICENAME: 94b0d1a90c469719cdc44ab91ec1b2b3
//X-AWEME-DEVICEOS: Windows 11
//X-AWEME-GUID: eebc8607734db209096c75a3e99a0b7eec6a560bf2f0dcf398e862676cd7630d0469c98e22844541d748014bb61159ec
//bd-ticket-guard-client-cert: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNGVENDQWJ1Z0F3SUJBZ0lWQUt2QVdndjMyR2trU2VTOWl4ZGg5TFk3eHFZbk1Bb0dDQ3FHU000OUJBTUMKTURFeEN6QUpCZ05WQkFZVEFrTk9NU0l3SUFZRFZRUUREQmwwYVdOclpYUmZaM1ZoY21SZlkyRmZaV05rYzJGZgpNalUyTUI0WERUSXpNRFV5TkRBeU5UTXhPVm9YRFRNek1EVXlOREV3TlRNeE9Wb3dKekVMTUFrR0ExVUVCaE1DClEwNHhHREFXQmdOVkJBTU1EMkprWDNScFkydGxkRjluZFdGeVpEQlpNQk1HQnlxR1NNNDlBZ0VHQ0NxR1NNNDkKQXdFSEEwSUFCS0pNTTMwUEFDUzRQYXY2RmpzSDFoV3phUDFrY2hXbnhLYnNzOFJoRTdHL2pIN1FWY0lvZ1I2bApwNFhpcmdLbFVnUTY1NjVpRnovL3R2d01YSDhINFZDamdia3dnYll3RGdZRFZSMFBBUUgvQkFRREFnV2dNREVHCkExVWRKUVFxTUNnR0NDc0dBUVVGQndNQkJnZ3JCZ0VGQlFjREFnWUlLd1lCQlFVSEF3TUdDQ3NHQVFVRkJ3TUUKTUNrR0ExVWREZ1FpQkNEL0FXZ3RQdE50K01VTlNXa3FnMmoyWkpyN1k2dkswZ0VpRHd3WXlDMlJJREFyQmdOVgpIU01FSkRBaWdDQXlwV2Zxam1SSUVvM01UazFBZTNNVW0wZHRVM3FrMFlEWGVaU1hleUpIZ3pBWkJnTlZIUkVFCkVqQVFnZzUzZDNjdVpHOTFlV2x1TG1OdmJUQUtCZ2dxaGtqT1BRUURBZ05JQURCRkFpRUExS1lsU2FzbmJQc2MKdjhrU1hRWVp4WmsveTdzckVnaDZTd3lNSWQ4U0dnc0NJQXNhbkw5RUJtN0tDZGhYbStYV0JwdEgwV0VLNFAvMApwVXhZbnVGMTh5N1MKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=
//bd-ticket-guard-client-data: eyJ0c19zaWduIjoidHMuMS45YTI5NDc1OWM4YTQ2NGNmNjYwMGQ0MGI5YWViMjZiMTFiYjc4NDViMDhjMjdkYTIwNjIzY2UwOGUzMDA2OGM0YzRmYmU4N2QyMzE5Y2YwNTMxODYyNGNlZGExNDkxMWNhNDA2ZGVkYmViZWRkYjJlMzBmY2U4ZDRmYTAyNTc1ZCIsInJlcV9jb250ZW50IjoidGlja2V0LHBhdGgsdGltZXN0YW1wIiwicmVxX3NpZ24iOiJNRVFDSUh0NEczUnQ1YlVMejFTQjhhSUtTNUZhc0FBNDVQeHpFeXpmM1ROdUVHRnhBaUFCVXNaT2FOY3I2VUQvODFYSG15L3o2Zk1NYkd4YWR0RVlZUTU5c0haTkVRPT0iLCJ0aW1lc3RhbXAiOjE2ODUwNzUyODZ9
//bd-ticket-guard-iteration-version: 1
//bd-ticket-guard-version: 2
//sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="104"
//sec-ch-ua-mobile: ?0
//sec-ch-ua-platform: "Windows"
//x-secsdk-csrf-token: 0001000000019579ecf3d983a695de527ee8f3d26b69dc80106e31a3853cab2895a71f4070fe1762970a4736fe4f
//
//aweme_id=7236683499548314935&comment_send_celltime=2066&comment_video_celltime=5968&reply_id=7237341126771688248&text=7747&text_extra=%5B%5D
//评论相关处理

// 获取新评论
var Coo models.TiktokCookies

func GetComment(h Handler, maxTime string) *models.TiktokComment {
	cookie := Coo
	u, err := url.Parse(fmt.Sprintf(`https://www.douyin.com/aweme/v1/web/notice/?device_platform=webapp&aid=6383&channel=channel_pc_web&is_new_notice=1&is_mark_read=1&notice_group=2&count=1&min_time=0&max_time=%v&pc_client_type=2&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=2560&screen_height=1440&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=104.0.5112.102&browser_online=true&engine_name=Blink&engine_version=104.0.5112.102&os_name=Windows&os_version=10&cpu_core_num=16&device_memory=8&platform=PC&downlink=9.4&effective_type=4g&round_trip_time=0&webid=7233244916146570790`, maxTime))
	if err != nil {
		fmt.Println(err)
	}
	GetU := fmt.Sprintf(`%v&msToken=%v&X-Bogus=%v`, u.String(), cookie.MsToken, pkg.Sign(u.Query().Encode(), User_Agent))
	resp, err := req.SetHeaders(map[string]string{
		"Cookie":                     cookie.Cookie + ";" + cookie.MsToken,
		"Referer":                    "https://www.douyin.com/user/MS4wLjABAAAAlcILkDWNGYcFD2yIZAQMWnKkP66X-GPiVwnlqlQV3lE",
		"Sec-Fetch-Dest":             "empty",
		"Sec-Fetch-Mode":             "cors",
		"Sec-Fetch-Site":             "same-origin",
		"User-Agent":                 User_Agent,
		"X-AWEME-CLIENTVERSION":      X_AWEME_CLIENTVERSION,
		"X-AWEME-DEVICEMANUFACTURER": "Gigabyte Technology Co. Ltd.",
		"X-AWEME-DEVICEMODEL":        "B760M GAMING DDR4",
		"X-AWEME-DEVICENAME":         "94b0d1a90c469719cdc44ab91ec1b2b3",
		"X-AWEME-DEVICEOS":           "Windows 11",
		"X-AWEME-GUID":               "eebc8607734db209096c75a3e99a0b7eec6a560bf2f0dcf398e862676cd7630d0469c98e22844541d748014bb61159ec",
		"sec-ch-ua":                  "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"104\"",
		"sec-ch-ua-mobile":           "?0",
		"sec-ch-ua-platform":         "\"Windows\"",
	}).Get(GetU)
	body, err := io.ReadAll(resp.Body)
	if gjson.GetBytes(body, "status_code").String() == "8" {
		fmt.Println(string(body))
		return nil
	} else if string(body) == "" {
		return nil
	}
	comment := models.TiktokComment{}
	comment.ToStruct(body)
	fmt.Println(fmt.Sprintf(`%v : %v`, comment.Name, comment.Text))
	return &comment
}

func PushComment(h Handler, awemeId, replyId, text string) {
	cookie := Coo

	//https://www.douyin.com/aweme/v1/web/comment/publish?app_name=aweme&device_platform=webapp&aid=6383&channel=channel_pc_web&pc_client_type=2&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=2560&screen_height=1440&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=104.0.5112.102&browser_online=true&engine_name=Blink&engine_version=104.0.5112.102&os_name=Windows&os_version=10&cpu_core_num=16&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=0&webid=7233244916146570790
	u, err := url.Parse(`https://www.douyin.com/aweme/v1/web/comment/publish?app_name=aweme&device_platform=webapp&aid=6383&channel=channel_pc_web&pc_client_type=2&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=2560&screen_height=1440&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=104.0.5112.102&browser_online=true&engine_name=Blink&engine_version=104.0.5112.102&os_name=Windows&os_version=10&cpu_core_num=16&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=0&webid=7233244916146570790`)
	if err != nil {
		fmt.Println(err)
	}
	postU := fmt.Sprintf(`%v&msToken=%v&X-Bogus=%v`, u.String(), cookie.MsToken, pkg.Sign(u.Query().Encode(), User_Agent))
	data := map[string]string{
		"aweme_id": awemeId,
		"reply_id": replyId,
		"text":     text,
	}
	resp, err := req.SetHeaders(map[string]string{
		"Cookie":                            cookie.Cookie + ";" + cookie.MsToken,
		"Referer":                           "https://www.douyin.com/user/self",
		"User-Agent":                        User_Agent,
		"x-secsdk-csrf-token":               cookie.CsrfToken,
		"Sec-Fetch-Dest":                    "empty",
		"Sec-Fetch-Mode":                    "cors",
		"Sec-Fetch-Site":                    "same-origin",
		"X-AWEME-CLIENTVERSION":             X_AWEME_CLIENTVERSION,
		"X-AWEME-DEVICEMANUFACTURER":        "Gigabyte Technology Co. Ltd.",
		"X-AWEME-DEVICEMODEL":               "B760M GAMING DDR4",
		"X-AWEME-DEVICENAME":                "94b0d1a90c469719cdc44ab91ec1b2b3",
		"X-AWEME-DEVICEOS":                  "Windows 11",
		"X-AWEME-GUID":                      "eebc8607734db209096c75a3e99a0b7eec6a560bf2f0dcf398e862676cd7630d0469c98e22844541d748014bb61159ec",
		"sec-ch-ua":                         "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"104\"",
		"sec-ch-ua-mobile":                  "?0",
		"sec-ch-ua-platform":                "\"Windows\"",
		"bd-ticket-guard-client-cert":       Client_cert,
		"bd-ticket-guard-client-data":       Client_data,
		"bd-ticket-guard-iteration-version": "1",
		"bd-ticket-guard-version":           "2",
	}).SetFormData(data).Post(postU)
	if resp.Body == nil {
		return
	}
	body, err := io.ReadAll(resp.Body)
	if len(body) == 0 {
		fmt.Println("发送失败")
		return
	}
	//msToken=VUfwqXecOL4ljsF-rtMeVygxwduHxADpj2fMvgYm8REOOddf9v-DEpcV9p604g8bQw_RAuvEp5oQSM88hxr9UNfFQeftOUJR_AkIif0U5i9Sjt_uFcuXQg==; expires=Wed, 31 May 2023 07:42:45 GMT; domain=douyin.com; path=/; secure; SameSite=None
	if resp.GetHeader("Set-Cookie") != "" {
		//找出要替换的是什么.写死
		msToken := strings.Split(resp.GetHeader("Set-Cookie"), ";")
		if len(msToken) > 0 {
			cookie.MsToken = strings.Split(msToken[0], "=")[1]
		}
		_ = h.Ds.Common().Update(nil, &cookie)
		Coo = cookie
	}
	fmt.Println(fmt.Sprintf(`回复评论: %v`, text))
	fmt.Println(string(body))
}

// 循环读取评论,一直读到已读消息

func Replay(h Handler) {
	for {
		maxTime := "0"
		for {
			comment := GetComment(h, maxTime)
			if comment == nil {
				fmt.Println("无评论")
				return
			}
			h.Cid = comment.Cid
			h.AwemeId = comment.AwemeId
			if comment.HasRead {
				time.Sleep(3 * time.Second)
				break
			}
			if IsAt(comment.Text) {
				continue
			}
			if comment.Text == "" {
				continue
			}
			maxTime = comment.CreateTime
			switch comment.AwemeId {
			case "7237380408860511543":
				GetElo(h, comment.Text, 1)
			}
		}
	}

}

func IsAt(text string) bool {
	if strings.Index(text, "@") != -1 {
		return true
	}
	return false
}
