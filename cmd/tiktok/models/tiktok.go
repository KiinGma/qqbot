package models

import "github.com/tidwall/gjson"

//存cookie

type TiktokCookies struct {
	Base
	Cookie    string `json:"cookie"`
	CsrfToken string `json:"x-secsdk-csrf-token"`
	MsToken   string `json:"msToken"`
}

type TiktokComment struct {
	Name       string `json:"name"`
	Text       string `json:"text"`
	HasRead    bool   `json:"has_read"`
	Cid        string `json:"cid"`
	AwemeId    string `json:"aweme_id"`
	IsFollower bool   `json:"is_follower"`
	CreateTime string `json:"create_time"`
}

func (m *TiktokComment) ToStruct(data []byte) {
	j := gjson.GetBytes(data, "notice_list_v2.0")
	m.CreateTime = j.Get("create_time").String()
	m.HasRead = j.Get("has_read").Bool()
	followerStatus := j.Get("comment.comment.user.follower_status").Int()
	if followerStatus == 0 {
		m.IsFollower = false
	} else {
		m.IsFollower = true
	}
	m.AwemeId = j.Get("comment.comment.aweme_id").String()
	m.Name = j.Get("comment.comment.user.nickname").String()
	m.Cid = j.Get("comment.comment.cid").String()
	m.Text = j.Get("comment.comment.text").String()

}
