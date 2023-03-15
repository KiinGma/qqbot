package main

import (
	"bytes"
	"encoding/base64"
	"flag"
	"fmt"
	"github.com/golang/freetype"
	"github.com/nfnt/resize"
	"golang.org/x/image/font"
	"image"
	"image/color"
	"image/draw"
	"image/jpeg"
	"image/png"
	"log"
	"net/http"
	"os"
	"qqbot/cmd/qqbot/models"
	"strconv"
)

var (
	dpi      = flag.Float64("dpi", 72, "screen resolution in Dots Per Inch")
	fontfile = flag.String("fontfile", "./data/font/杨任东竹石体-Medium.ttf", "filename of the ttf font")
	hinting  = flag.String("hinting", "none", "none | full")
	size     = flag.Float64("size", 50, "font size in points")
	spacing  = flag.Float64("spacing", 1.5, "line spacing (e.g. 2 means double spaced)")
	wonb     = flag.Bool("whiteonblack", false, "white text on a black background")
)
var text = []string{
	"10",
	"20",
	"30",
	"40",
	"50",
	"60",
}

func main1() {
	GetBasicAttributesBase64(models.BasicAttributes{
		764647954, models.Attributes{},
	}, models.Equip{})
}

func GetBasicAttributesBase64(attributes models.BasicAttributes, equip models.Equip) string {
	flag.Parse()
	//读取字体样式
	fontBytes, err := os.ReadFile(*fontfile)
	if err != nil {
		log.Println(err)
		return ""
	}
	f, err := freetype.ParseFont(fontBytes)
	if err != nil {
		log.Println(err)
		return ""
	}
	// 初始化

	fg, bg := image.Black, image.White
	fmt.Println(fg)
	fmt.Println(bg)

	backgroudImgFile, err := os.Open(`./data/images/人物属性/属性.png`)
	bgs, err := png.Decode(backgroudImgFile)
	if err != nil {
		fmt.Println(err)
		return ""
	}

	//获取头像,缩放头像
	//---------------------------------------------------------------------------------------------------
	res, err := http.Get(fmt.Sprintf(`http://q1.qlogo.cn/g?b=qq&nk=%v&s=640`, attributes.Id))
	if err != nil {
		fmt.Println("A error occurred!")
		return ""
	}
	defer res.Body.Close()
	// 获得get请求响应的reader对象
	tx, err := jpeg.Decode(res.Body)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	tx = resize.Resize(90, 89, tx, resize.Lanczos3)
	//---------------------------------------------------------------------------------------------------

	ruler := color.RGBA{0xdd, 0xdd, 0xdd, 0xff}
	if *wonb {
		fg, bg = image.White, image.Black
		ruler = color.RGBA{0x22, 0x22, 0x22, 0xff}
	}
	rgba := image.NewRGBA(image.Rect(0, 0, 922, 575))

	draw.Draw(rgba, rgba.Bounds(), bgs, image.Point{}, draw.Src)
	draw.Draw(rgba, rgba.Bounds().Add(image.Pt(441, 19)), tx, image.Point{}, draw.Src)
	c := freetype.NewContext()
	c.SetDPI(*dpi)
	c.SetFont(f)
	c.SetFontSize(*size)
	c.SetClip(rgba.Bounds())
	c.SetDst(rgba)
	c.SetSrc(fg)
	switch *hinting {
	default:
		c.SetHinting(font.HintingNone)
	case "full":
		c.SetHinting(font.HintingFull)
	}
	// Draw the guidelines.
	for i := 0; i < 200; i++ {
		rgba.Set(10, 10+i, ruler)
		rgba.Set(10+i, 10, ruler)
	}
	// 写入数据
	pt := freetype.Pt(700, 1*81-20)
	_, err = c.DrawString(strconv.FormatInt(attributes.Life, 10), pt)
	pt.Y += c.PointToFixed(*size * *spacing)

	pt = freetype.Pt(700, 2*81-20)
	_, err = c.DrawString(strconv.FormatInt(attributes.Attack, 10), pt)
	pt.Y += c.PointToFixed(*size * *spacing)

	pt = freetype.Pt(700, 3*81-20)
	_, err = c.DrawString(strconv.FormatInt(attributes.Magic, 10), pt)
	pt.Y += c.PointToFixed(*size * *spacing)

	pt = freetype.Pt(700, 4*81-20)
	_, err = c.DrawString(strconv.FormatInt(attributes.Speed, 10), pt)
	pt.Y += c.PointToFixed(*size * *spacing)

	pt = freetype.Pt(700, 5*81-20)
	_, err = c.DrawString(strconv.FormatInt(attributes.Armor, 10), pt)
	pt.Y += c.PointToFixed(*size * *spacing)

	pt = freetype.Pt(700, 6*81-20)
	_, err = c.DrawString(strconv.FormatInt(attributes.Luck, 10), pt)
	pt.Y += c.PointToFixed(*size * *spacing)

	pt = freetype.Pt(700, 7*81-20)
	_, err = c.DrawString(strconv.FormatInt(attributes.MagicResist, 10), pt)
	pt.Y += c.PointToFixed(*size * *spacing)

	c.SetFontSize(30)
	pt = freetype.Pt(160, 1*49+137)
	if equip.WeaponName == "" {
		equip.WeaponName = "未装备"
	}
	_, err = c.DrawString(equip.WeaponName, pt)
	pt.Y += c.PointToFixed(*size * *spacing)

	pt = freetype.Pt(160, 2*49+137)
	if equip.ClothesName == "" {
		equip.ClothesName = "未装备"
	}
	_, err = c.DrawString(equip.ClothesName, pt)
	pt.Y += c.PointToFixed(*size * *spacing)

	pt = freetype.Pt(160, 3*49+137)
	if equip.GloveName == "" {
		equip.GloveName = "未装备"
	}
	_, err = c.DrawString(equip.GloveName, pt)
	pt.Y += c.PointToFixed(*size * *spacing)

	pt = freetype.Pt(160, 4*49+137)
	if equip.TrousersName == "" {
		equip.TrousersName = "未装备"
	}
	_, err = c.DrawString(equip.TrousersName, pt)
	pt.Y += c.PointToFixed(*size * *spacing)

	pt = freetype.Pt(160, 5*49+137)
	if equip.ShoeName == "" {
		equip.ShoeName = "未装备"
	}
	_, err = c.DrawString(equip.ShoeName, pt)
	pt.Y += c.PointToFixed(*size * *spacing)

	pt = freetype.Pt(160, 6*49+137)
	if equip.RingName == "" {
		equip.RingName = "未装备"
	}
	_, err = c.DrawString(equip.RingName, pt)
	pt.Y += c.PointToFixed(*size * *spacing)

	// 转成base64
	emptyBuff := bytes.NewBuffer(nil)       //开辟一个新的空buff
	err = jpeg.Encode(emptyBuff, rgba, nil) //img写入到buff
	if err != nil {
		fmt.Println(err)
	}
	s := base64.StdEncoding.EncodeToString(emptyBuff.Bytes()) //buff转成base64
	fmt.Println(s)
	return s

	/*outFile, err := os.Create("out.png")
	if err != nil {
		log.Println(err)
		os.Exit(1)
	}
	defer outFile.Close()
	b := bufio.NewWriter(outFile)
	emptyBuff := bytes.NewBuffer(nil) //开辟一个新的空buff
	png.Encode(emptyBuff, rgba)       //img写入到buff
	err = png.Encode(b, rgba)
	if err != nil {
		log.Println(err)
		os.Exit(1)
	}
	err = b.Flush()
	if err != nil {
		log.Println(err)
		os.Exit(1)
	}
	fmt.Println("Wrote out.png OK.")
	return ""*/
}

func main() {
	flag.Parse()
	//读取字体样式
	fontBytes, err := os.ReadFile(*fontfile)
	if err != nil {
		log.Println(err)
		return
	}
	f, err := freetype.ParseFont(fontBytes)
	if err != nil {
		log.Println(err)
		return
	}
	// 初始化

	fg, bg := image.Black, image.White
	fmt.Println(fg)
	fmt.Println(bg)

	backgroudImgFile, err := os.Open(`.\data\images\人物属性\装备.png`)
	bgs, err := png.Decode(backgroudImgFile)
	if err != nil {
		fmt.Println(bgs)
		return
	}

	txf, err := os.Open(`.\data\images\人物属性\1.png`)
	tx, err := png.Decode(txf)
	if err != nil {
		fmt.Println(err)
		return
	}
	m := resize.Resize(102, 97, tx, resize.Lanczos3)

	ruler := color.RGBA{0xdd, 0xdd, 0xdd, 0xff}
	if *wonb {
		fg, bg = image.White, image.Black
		ruler = color.RGBA{0x22, 0x22, 0x22, 0xff}
	}
	rgba := image.NewRGBA(image.Rect(0, 0, 556, 586))

	draw.Draw(rgba, rgba.Bounds(), bgs, image.Point{}, draw.Src)
	draw.Draw(rgba, rgba.Bounds().Add(image.Pt(450, 24)), m, image.Point{X: 11, Y: 10}, draw.Src)
	c := freetype.NewContext()
	c.SetDPI(*dpi)
	c.SetFont(f)
	c.SetFontSize(*size)
	c.SetClip(rgba.Bounds())
	c.SetDst(rgba)
	c.SetSrc(fg)
	switch *hinting {
	default:
		c.SetHinting(font.HintingNone)
	case "full":
		c.SetHinting(font.HintingFull)
	}
	// Draw the guidelines.
	for i := 0; i < 200; i++ {
		rgba.Set(10, 10+i, ruler)
		rgba.Set(10+i, 10, ruler)
	}
	// 写入数据
	for k, v := range text {
		pt := freetype.Pt(180, k*50-45)
		_, err = c.DrawString(v, pt)

		if err != nil {
			log.Println(err)
			return
		}
		pt.Y += c.PointToFixed(*size * *spacing)
	}

	// Save that RGBA image to disk.
	/*emptyBuff := bytes.NewBuffer(nil)       //开辟一个新的空buff
	err = jpeg.Encode(emptyBuff, rgba, nil) //img写入到buff
	if err != nil {
		fmt.Println(err)
	}
	s := base64.StdEncoding.EncodeToString(emptyBuff.Bytes()) //buff转成base64
	fmt.Println(s)
	// Save that RGBA image to disk.
	outFile, err := os.Create("out.png")
	if err != nil {
		log.Println(err)
		os.Exit(1)
	}
	defer outFile.Close()
	b := bufio.NewWriter(outFile)
	emptyBuff := bytes.NewBuffer(nil) //开辟一个新的空buff
	png.Encode(emptyBuff, rgba)       //img写入到buff
	err = png.Encode(b, rgba)
	if err != nil {
		log.Println(err)
		os.Exit(1)
	}
	err = b.Flush()
	if err != nil {
		log.Println(err)
		os.Exit(1)
	}
	fmt.Println("Wrote out.png OK.")*/

}
