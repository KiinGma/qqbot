package errnos

func CookieError() string {
	return "查询功能维护中"
}

func OpenIDNotFind() string {
	return "召唤师名称错误"
}

//无权限查询

func UserLimit() string {
	return "这位召唤师已将其生涯设为不公开"
}

func NoGame() string {
	return "无法查询,未进行过任意一把游戏"
}
