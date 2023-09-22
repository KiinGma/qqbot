package errnos

import "errors"

var (
	ErrInvalid = errors.New("格式错误")
	//查无此id
	ErrIdNotFound = errors.New("查无此id")
	//id未绑定
	ErrIdNotBind = errors.New("游戏未绑定 , 请绑定你的游戏账户 , 绑定提示 : 输入 [您的ID#游戏大区]")
	//id已绑定
	ErrIdBinded = errors.New("id已绑定")
	//id已删除
	ErrIdDeleted = errors.New("id已删除")

	ErrGameArea = errors.New("游戏服务器输入错误")

	ErrNoGames = errors.New("近期未进行游戏")

	// ErrUserConfigLimit 这位召唤师已将其生涯设为不公开
	ErrUserConfigLimit = errors.New("这位召唤师已将其生涯设为不公开")
)
