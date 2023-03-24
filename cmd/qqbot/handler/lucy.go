package handler

//如果用随机生成的数组生成不重复的1-11,再让回答者回答,根据回答的答案,和预先生成的答案的数组元素位置进行比较,是否可以知道猜中答案的程度
//比如生成的数组是[7,2,5,1,11,4,9,3,6,10,8],选出的答案是7,回答是3,概率等于index7-index3

func (h *WsHandler) GetLucky(msg string) {
	switch msg {
	case "运气测试":

	}
}
