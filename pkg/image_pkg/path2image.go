package image_pkg

import (
	"bufio"
	"encoding/base64"
	"fmt"
	"io"
	"net/http"
	"os"
)

func ImgPath2Base64(path string) string {
	if path == "" {
		return ""
	}
	failPhoto, err := os.Open(path)
	if err != nil {
		return ""
	}
	failPhotoStats, err := failPhoto.Stat()
	if err != nil {
		return ""
	}
	defer failPhoto.Close()

	failPhotoDist := make([]byte, failPhotoStats.Size())
	n, _ := failPhoto.Read(failPhotoDist)
	encodeString := base64.StdEncoding.EncodeToString(failPhotoDist[:n])
	return encodeString
}

//根据网页下载图片

// DownloadImage 保存图片

func DownloadImageToBase64(url string) string {
	res, err := http.Get(url)
	if err != nil {
		fmt.Println("A error occurred!")
		return ""
	}
	defer res.Body.Close()
	// 获得get请求响应的reader对象
	reader := bufio.NewReaderSize(res.Body, 320*1024)
	imageData, err := io.ReadAll(reader)
	s := base64.StdEncoding.EncodeToString(imageData) //buff转成base64
	return s
}

//base64转成图片
