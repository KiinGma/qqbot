package main

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"github.com/imroc/req/v3"
	"io"
	"strings"
	"time"
)

func main() {
	fmt.Println(time.Now().UnixMilli())
	s := `ptuiCB('0','0','https://ptlogin2.game.qq.com/check_sig?pttype=1&uin=764647954&service=ptqrlogin&nodirect=0&ptsigx=d29712891fa2caeb9a5909576571a36faecef29cfade9d365a84d751840248b26239e2458cf884aaae61bf8aa69b9c5991daa8f73ff76e3774fb070f7bf2bb0746bb6cdae0e840de&s_url=https%3A%2F%2Flol.qq.com%2Fact%2Fa20191210super%2Findex.shtml&f_url=&ptlang=2052&ptredirect=101&aid=21000501&daid=8&j_later=0&low_login_hour=0&regmaster=0&pt_login_type=3&pt_aid=0&pt_aaid=16&pt_light=0&pt_3rd_aid=0','1','登录成功！', '🇰 🇮 🇮 🇳 🇬 🇲 🇦')`
	ss := strings.Split(s, "'")
	fmt.Println(ss[5])
	GetQrSig()
	//504669808
	e := 0
	qrsig := `c775bd7feb19c8ee9241acb98a256a67f38a3d64677b3d7beb608a08c77af66a9fa496074c19f389f1a616eba36853cf98dbd7b9c4a4739b`
	for i := 0; i < len(qrsig); i++ {
		e += (e << 5) + int(qrsig[i])
	}
	qrtoken := e & 2147483647
	fmt.Println(qrtoken)
}

func GetQrSig() {
	t, _ := rand.Prime(rand.Reader, 54)
	fmt.Println(t)
	//16879126385606249
	//47261875070763426
	resp, err := req.Get(fmt.Sprintf("https://ssl.ptlogin2.qq.com/ptqrshow?appid=21000501&e=2&l=M&s=3&d=72&v=4&t=%v&daid=8&pt_3rd_aid=0", "0."+t.String()))
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}
	// 获得get请求响应的reader对象
	/*tx, err := jpeg.Decode(resp.Body)
	if err != nil {
		fmt.Println(err)
	}
	emptyBuff := bytes.NewBuffer(nil) //开辟一个新的空buff
	err = png.Encode(emptyBuff, tx) //img写入到buff
	if err != nil {
		fmt.Println(err)
	}*/
	s := base64.StdEncoding.EncodeToString(body) //buff转成base64
	fmt.Println(string(body))
	fmt.Println(resp.Cookies())
	fmt.Println(s)
}
