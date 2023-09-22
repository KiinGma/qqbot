package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"io"
	"math/rand"
	"time"
)

func main() {
	plaintext := "password"

	// 生成随机盐值
	salt := generateSalt()

	// 拼接盐值和明文密码
	saltedPlaintext := salt + plaintext

	// 计算MD5哈希值
	hash := md5.New()
	io.WriteString(hash, saltedPlaintext)
	hashedPassword := hex.EncodeToString(hash.Sum(nil))

	fmt.Printf("Salt: %s\n", salt)
	fmt.Printf("Hashed Password: %s\n", hashedPassword)
}

// 生成随机盐值
func generateSalt() string {
	const saltLength = 16
	const saltChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

	rand.Seed(time.Now().UnixNano())

	salt := make([]byte, saltLength)
	for i := 0; i < saltLength; i++ {
		salt[i] = saltChars[rand.Intn(len(saltChars))]
	}

	return string(salt)
}
