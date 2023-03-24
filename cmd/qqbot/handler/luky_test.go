package handler

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"testing"
)

func TestWsHandler_GetLucky(t *testing.T) {
	a := 0
	b := 0
	c := 0
	d := 0
	e := 0
	f := 0
	g := 0
	h := 0
	j := 0
	k := 0
	m := 0
	for i := 0; i < 1000000; i++ {
		var initial int64 = 100
		s := getSlice(initial, 11)
		shuffled := shuffle(s)
		result1 := getResult(initial)
		result2 := getResult(initial)
		l := bidDing(result1, result2, shuffled)
		if l == 0 {
			a++
		} else if l == 10 {
			b++
		} else if l == 20 {
			c++
		} else if l == 30 {
			d++
		} else if l == 40 {
			e++
		} else if l == 50 {
			f++
		} else if l == 60 {
			g++
		} else if l == 70 {
			h++
		} else if l == 80 {
			j++
		} else if l == 90 {
			k++
		} else if l == 100 {
			m++
		}
	}
	fmt.Println(float64(a) / 1000000)
	fmt.Println(float64(b) / 1000000)
	fmt.Println(float64(c) / 1000000)
	fmt.Println(float64(d) / 1000000)
	fmt.Println(float64(e) / 1000000)
	fmt.Println(float64(f) / 1000000)
	fmt.Println(float64(g) / 1000000)
	fmt.Println(float64(h) / 1000000)
	fmt.Println(float64(j) / 1000000)
	fmt.Println(float64(k) / 1000000)
	fmt.Println(float64(m) / 1000000)
}

// 打标,计算接近值,等于当前运气值
func bidDing(mun, result int64, s []int64) int {
	var a int
	var b int
	var c int

	for i := range s {
		if s[i] == mun {
			a += i
		}
		if s[i] == result {
			b += i
		}
	}
	if a > b {
		c = a - b
	} else {
		c = b - a
	}
	return 100 - c*10
}

// 生成答案
func getResult(scope int64) int64 {
	result, _ := rand.Int(rand.Reader, big.NewInt(11))
	r := result.Int64() + scope
	return r
}

// 生成固定数组,长度为11
func getSlice(initial int64, len int) []int64 {
	s := make([]int64, len)
	for i := 0; i < len; i++ {
		s[i] = initial + int64(i)
	}
	return s
}

// 洗牌算法
func shuffle(nums []int64) []int64 {
	for i := len(nums) - 1; i > 0; i-- {
		j, err := rand.Int(rand.Reader, big.NewInt(int64(i+1)))
		if err != nil {
			panic(err)
		}
		idx := j.Int64()
		nums[i], nums[idx] = nums[idx], nums[i]
	}
	return nums
}

func TestShuffle(t *testing.T) {
	a := 0
	for i := 0; i < 100000; i++ {
		s := getSlice(1, 11)
		l := shuffle(s)
		if l[0] == 11 {
			a++
		}
	}
	fmt.Println(float64(a) / 100000)
}
