package errno

import (
	"github.com/labstack/echo/v4"
	openapi "kiingma/cmd/qqbot/swagger/rest"
	"strconv"
)

//code
//0 成功
//1x 入参型错误
//2x 服务型错误
//3x 数据层错误
//4x 底层错误

func SendOk(ctx echo.Context) error {
	code := 200
	msg := "ok"
	response := openapi.ResponseObject{
		Code:  &code,
		Count: nil,
		Data:  nil,
		Msg:   &msg,
	}

	return ctx.JSON(200, response)
}

func BindError(ctx echo.Context) error {
	code := 10
	msg := "参数格式错误"
	response := openapi.ResponseObject{
		Code:  &code,
		Count: nil,
		Data:  nil,
		Msg:   &msg,
	}
	return ctx.JSON(200, response)
}

func ParamError(ctx echo.Context) error {
	code := 11
	msg := "参数数据错误"
	response := openapi.ResponseObject{
		Code:  &code,
		Count: nil,
		Data:  nil,
		Msg:   &msg,
	}
	return ctx.JSON(200, response)
}

func SkuExists(ctx echo.Context) error {
	code := 12
	msg := "sku已存在"
	response := openapi.ResponseObject{
		Code:  &code,
		Count: nil,
		Data:  nil,
		Msg:   &msg,
	}
	return ctx.JSON(200, response)
}

func IDNotExist(ctx echo.Context) error {
	code := 13
	msg := "ID不存在"
	response := openapi.ResponseObject{
		Code:  &code,
		Count: nil,
		Data:  nil,
		Msg:   &msg,
	}
	return ctx.JSON(200, response)
}

func TitleExist(ctx echo.Context) error {
	code := 14
	msg := "名称已存在"
	response := openapi.ResponseObject{
		Code:  &code,
		Count: nil,
		Data:  nil,
		Msg:   &msg,
	}
	return ctx.JSON(200, response)
}

func ImportError(ctx echo.Context, row int) error {
	code := 15
	msg := "导入错误,错误行 { " + strconv.Itoa(row) + " }"
	response := openapi.ResponseObject{
		Code:  &code,
		Count: nil,
		Data:  nil,
		Msg:   &msg,
	}
	return ctx.JSON(200, response)
}

func CaptchaError(ctx echo.Context) error {
	code := 16
	msg := "验证码错误"
	response := openapi.ResponseObject{
		Code:  &code,
		Count: nil,
		Data:  nil,
		Msg:   &msg,
	}
	return ctx.JSON(200, response)
}

func DriverDigitFuncError(ctx echo.Context) error {
	code := 17
	msg := "获取验证码错误"
	response := openapi.ResponseObject{
		Code:  &code,
		Count: nil,
		Data:  nil,
		Msg:   &msg,
	}
	return ctx.JSON(200, response)
}
func LoginUserError(ctx echo.Context) error {
	code := 18
	msg := "用户名或密码错误"
	response := openapi.ResponseObject{
		Code:  &code,
		Count: nil,
		Data:  nil,
		Msg:   &msg,
	}
	return ctx.JSON(200, response)
}

func TokenExpiredError(ctx echo.Context) error {
	code := 401
	msg := "token已失效"
	response := openapi.ResponseObject{
		Code:  &code,
		Count: nil,
		Data:  nil,
		Msg:   &msg,
	}
	return ctx.JSON(200, response)
}

func DataSourceError(ctx echo.Context) error {
	code := 30
	msg := "数据库异常"
	response := openapi.ResponseObject{
		Code:  &code,
		Count: nil,
		Data:  nil,
		Msg:   &msg,
	}
	return ctx.JSON(200, response)
}

func CreateError(ctx echo.Context) error {
	code := 31
	msg := "新增失败"
	response := openapi.ResponseObject{
		Code:  &code,
		Count: nil,
		Data:  nil,
		Msg:   &msg,
	}
	return ctx.JSON(200, response)
}

func DeleteError(ctx echo.Context) error {
	code := 32
	msg := "删除失败"
	response := openapi.ResponseObject{
		Code:  &code,
		Count: nil,
		Data:  nil,
		Msg:   &msg,
	}
	return ctx.JSON(200, response)
}

func UpdateError(ctx echo.Context) error {
	code := 33
	msg := "修改失败"
	response := openapi.ResponseObject{
		Code:  &code,
		Count: nil,
		Data:  nil,
		Msg:   &msg,
	}
	return ctx.JSON(200, response)
}

func RecordNotFoundError(ctx echo.Context) error {
	code := 34
	msg := "数据不存在"
	response := openapi.ResponseObject{
		Code:  &code,
		Count: nil,
		Data:  nil,
		Msg:   &msg,
	}
	return ctx.JSON(200, response)
}
