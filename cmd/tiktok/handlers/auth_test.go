package handlers

import (
	"fmt"
	"net/http"
	"reflect"
	"strings"
	"testing"
)

func TestGetSecsdkCsrfToken(t *testing.T) {

}

func Test_cookiesToString(t *testing.T) {
	type args struct {
		cookies []*http.Cookie
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := cookiesToString(tt.args.cookies); got != tt.want {
				t.Errorf("cookiesToString() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_parseCookies(t *testing.T) {
	type args struct {
		cookieString string
	}
	tests := []struct {
		name string
		args args
		want []*http.Cookie
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := parseCookies(tt.args.cookieString); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("parseCookies() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_parseStringCookies(t *testing.T) {
	s := `client_push={"live_push_record":""}; ttwid=1%7CHDlv1DYQ3PZB3-UzLwB3f3YXxFIglMtVvBC_fO6BoSU%7C1684121087%7C93fe28ce339919aa2ee598c02ecc5d1b3a2d676b12182c5ca4b36d34c9a25db7; douyin.com; home_can_add_dy_2_desktop=%220%22; strategyABtestKey=%221684896774.517%22; theme=%22dark%22; passport_csrf_token=aa2a17c39f4428afffe122c51d56d84f; passport_csrf_token_default=aa2a17c39f4428afffe122c51d56d84f; s_v_web_id=verify_li141bs8_EHDFz5yE_PNgN_4eEk_BZLM_0yksAXZ6lNbt; csrf_session_id=8d9adac3309caafc8e57aea40615ea2a; ttcid=80014b7d781f4abf95388141128df0aa32; publish_badge_show_info=%220%2C0%2C0%2C1684896800068%22; VIDEO_FILTER_MEMO_SELECT=%7B%22expireTime%22%3A1685501600086%2C%22type%22%3A1%7D; store-region=cn-gd; store-region-src=uid; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtY2xpZW50LWNlcnQiOiItLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS1cbk1JSUNGVENDQWJ1Z0F3SUJBZ0lWQUt2QVdndjMyR2trU2VTOWl4ZGg5TFk3eHFZbk1Bb0dDQ3FHU000OUJBTUNcbk1ERXhDekFKQmdOVkJBWVRBa05PTVNJd0lBWURWUVFEREJsMGFXTnJaWFJmWjNWaGNtUmZZMkZmWldOa2MyRmZcbk1qVTJNQjRYRFRJek1EVXlOREF5TlRNeE9Wb1hEVE16TURVeU5ERXdOVE14T1Zvd0p6RUxNQWtHQTFVRUJoTUNcblEwNHhHREFXQmdOVkJBTU1EMkprWDNScFkydGxkRjluZFdGeVpEQlpNQk1HQnlxR1NNNDlBZ0VHQ0NxR1NNNDlcbkF3RUhBMElBQktKTU0zMFBBQ1M0UGF2NkZqc0gxaFd6YVAxa2NoV254S2JzczhSaEU3Ry9qSDdRVmNJb2dSNmxcbnA0WGlyZ0tsVWdRNjU2NWlGei8vdHZ3TVhIOEg0VkNqZ2Jrd2diWXdEZ1lEVlIwUEFRSC9CQVFEQWdXZ01ERUdcbkExVWRKUVFxTUNnR0NDc0dBUVVGQndNQkJnZ3JCZ0VGQlFjREFnWUlLd1lCQlFVSEF3TUdDQ3NHQVFVRkJ3TUVcbk1Da0dBMVVkRGdRaUJDRC9BV2d0UHROdCtNVU5TV2txZzJqMlpKcjdZNnZLMGdFaUR3d1l5QzJSSURBckJnTlZcbkhTTUVKREFpZ0NBeXBXZnFqbVJJRW8zTVRrMUFlM01VbTBkdFUzcWswWURYZVpTWGV5SkhnekFaQmdOVkhSRUVcbkVqQVFnZzUzZDNjdVpHOTFlV2x1TG1OdmJUQUtCZ2dxaGtqT1BRUURBZ05JQURCRkFpRUExS1lsU2FzbmJQc2NcbnY4a1NYUVlaeFprL3k3c3JFZ2g2U3d5TUlkOFNHZ3NDSUFzYW5MOUVCbTdLQ2RoWG0rWFdCcHRIMFdFSzRQLzBcbnBVeFludUYxOHk3U1xuLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLVxuIn0=; my_rd=1; FOLLOW_NUMBER_YELLOW_POINT_INFO=%22MS4wLjABAAAADXSMkLZtz5Mfc6Tv4qyhFL5VlI_VCPmpDG1POjQC-Xo%2F1684944000000%2F0%2F1684897079881%2F0%22; passport_assist_user=CjwBjNsyPhcWJ1WdBfKB1duwJvODBkmZf6wGjb6lAZdD5ET-97uEFiXko4R4iPs2Oqz_FqZEcRRlG79WKJIaSAo8EbN6CdQPBR0MNTgSMcMQOTfU_voBtPRQ4aYJWQ_vqs-_-WJUCxXZqBoVhWb0s6DpCrw7HLtI8-ERn5TUELb7sQ0Yia_WVCIBA1lSlEM%3D; n_mh=ytUaf4tVf50zo97dyfa6cGy-9ejh2kNlwMXSO8B0n5I; sso_uid_tt=920f3a0b3fc2f27b949417f6e476d17e; sso_uid_tt_ss=920f3a0b3fc2f27b949417f6e476d17e; toutiao_sso_user=14f1ca475e8cd16a56ae7fb63c3203bc; toutiao_sso_user_ss=14f1ca475e8cd16a56ae7fb63c3203bc; sid_ucp_sso_v1=1.0.0-KGU1NmIzNjE1MDE5ZmFlZjE0YTViZDc5NmJkZmQ3MGEyOWMxOGIyOGMKHQic1YjU5gIQvqC2owYY7zEgDDCH2PbVBTgGQPQHGgJscSIgMTRmMWNhNDc1ZThjZDE2YTU2YWU3ZmI2M2MzMjAzYmM; ssid_ucp_sso_v1=1.0.0-KGU1NmIzNjE1MDE5ZmFlZjE0YTViZDc5NmJkZmQ3MGEyOWMxOGIyOGMKHQic1YjU5gIQvqC2owYY7zEgDDCH2PbVBTgGQPQHGgJscSIgMTRmMWNhNDc1ZThjZDE2YTU2YWU3ZmI2M2MzMjAzYmM; odin_tt=fa351757a45119df292baa68b7129c0b2fc678c7235adb2964e169d20956c9476da4209367df064d8f4b6ad6025d6e71; passport_auth_status=c0c428cc69c3691e1445611d2d3faf43%2C58643ea9a99612e20536ae9493c18f34; passport_auth_status_ss=c0c428cc69c3691e1445611d2d3faf43%2C58643ea9a99612e20536ae9493c18f34; uid_tt=bc81006c15819c20f171a3ec00d49b4e; uid_tt_ss=bc81006c15819c20f171a3ec00d49b4e; sid_tt=47738dde95264f5a1e0f52e4fc8d3270; sessionid=47738dde95264f5a1e0f52e4fc8d3270; sessionid_ss=47738dde95264f5a1e0f52e4fc8d3270; FOLLOW_LIVE_POINT_INFO=%22MS4wLjABAAAADXSMkLZtz5Mfc6Tv4qyhFL5VlI_VCPmpDG1POjQC-Xo%2F1684944000000%2F0%2F1684901953463%2F0%22; LOGIN_STATUS=1; sid_guard=47738dde95264f5a1e0f52e4fc8d3270%7C1684901954%7C5183999%7CSun%2C+23-Jul-2023+04%3A19%3A13+GMT; sid_ucp_v1=1.0.0-KDQ4ZTY3MWM4ZjcyNTQ5ZmFiMzc1NzIyZmQxNDUzZTkwMmE2MGVjMDkKGQic1YjU5gIQwqC2owYY7zEgDDgGQPQHSAQaAmxxIiA0NzczOGRkZTk1MjY0ZjVhMWUwZjUyZTRmYzhkMzI3MA; ssid_ucp_v1=1.0.0-KDQ4ZTY3MWM4ZjcyNTQ5ZmFiMzc1NzIyZmQxNDUzZTkwMmE2MGVjMDkKGQic1YjU5gIQwqC2owYY7zEgDDgGQPQHSAQaAmxxIiA0NzczOGRkZTk1MjY0ZjVhMWUwZjUyZTRmYzhkMzI3MA; bd_ticket_guard_server_data=; tt_scid=p7YWqqliBaVXKBL0qdLZAe2B1X3eYGEwkgINnegMaYr9FGaYPfWajnBCrAIvB1rw6cdc; passport_fe_beating_status=true; msToken=hvmTaZGFhBjgdvyMJXentmgRPvjHiigX8cseQ37e4Ib0eLGXnxMd9sTINLHI8enfCxR9nRJoUS8GvMbwUScGwlfXnGpghI6TbfeVDPIcGgckHbGr4vGQWw==; msToken=jDjYok7B5hxxDE94vMf-r9rCt7k2_gq3FoJT0bYzu3REhVFwBGXO-ftXIV2afVP08uT7AL94CJwEYB-0UTodgFngvrPxlNu9uCZ0MmDVETp-6oNtUloH3w==`
	c := `csrf_session_id=8d9adac3309caafc8e57aea40615ea2aaaaa; path=/; secure; SameSite=None`
	cs := strings.Split(c, ";")
	if len(cs) > 0 {
		css := strings.Split(cs[0], "=")
		if len(css) == 2 {
			if css[0] == "csrf_session_id" {
				sr := parseStringCookies(s, css[0], css[1])
				fmt.Println(sr)
			}
		}
	}

}
