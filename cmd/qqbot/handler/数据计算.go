package handler

import (
	"fmt"
	"github.com/dengsgo/math-engine/engine"
	"regexp"
	"strconv"
)

func (h *WsHandler) Compute(v string) {
	result := regexp.MustCompile(`-?(\(-?)*\d+(\.\d+)?\)*$|-?((\(-?)*\d+(\.\d+)?\)*[\-/\+\*])+((\(-?)*\d+(\.\d+)?\)*)`).FindAllString(v, -1)
	for _, s := range result {
		if s != "" && !regexp.MustCompile(`^(\-|\+)?\d+(\.\d+)?$`).MatchString(s) {
			r, err := engine.ParseAndExec(s)
			if err != nil {
				fmt.Println(err)
				return
			}
			h.client.SendGroupMessageWithString(h.Gid, 0, fmt.Sprintf(" %s = %v", s, strconv.FormatFloat(r, 'f', -1, 64)))
		}
	}
}
