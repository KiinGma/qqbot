package image_pkg

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"github.com/boombuler/barcode"
	"github.com/boombuler/barcode/qr"
	"image"
	"image/jpeg"
	"image/png"
	"log"
	"os"
)

func QRCoreToBase64(data string) string {

	// 创建一个 QR 码
	qrCode, err := qr.Encode(data, qr.M, qr.Auto)
	if err != nil {
		log.Fatal(err)
	}

	// 缩放 QR 码的尺寸
	qrCode, err = barcode.Scale(qrCode, 200, 200)
	if err != nil {
		log.Fatal(err)
	}

	emptyBuff := bytes.NewBuffer(nil)                                //开辟一个新的空buff
	err = jpeg.Encode(emptyBuff, qrCode, &jpeg.Options{Quality: 30}) //img写入到buff
	if err != nil {
		fmt.Println(err)
		return ""
	}
	s := base64.StdEncoding.EncodeToString(emptyBuff.Bytes()) //buff转成base64
	return s
}

func Base64ToImage(data string) {
	// base64解码，获得字节数组
	imgBytes, err := base64.StdEncoding.DecodeString(data)
	if err != nil {
		log.Fatalf("base64 decode error: %v", err)
	}

	// 利用image包的Decode函数将字节数组转化为图片对象
	img, _, err := image.Decode(bytes.NewReader(imgBytes))
	if err != nil {
		log.Fatalf("decode error: %v", err)
	}

	// 将图片保存为png格式
	f, err := os.Create("output.png")
	if err != nil {
		log.Fatalf("create file error: %v", err)
	}
	defer f.Close()

	if err := png.Encode(f, img); err != nil {
		log.Fatalf("encode error: %v", err)
	}

	log.Println("Success!")
}
