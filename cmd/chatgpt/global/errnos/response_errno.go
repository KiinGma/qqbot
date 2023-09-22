package errnos

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"kiingma/cmd/chatgpt/global/consts"
	"kiingma/utils/validator_translation"
	"net/http"
	"strings"
	"time"
)

type Data struct {
	Code int    `json:"code,omitempty"`
	Msg  string `json:"msg,omitempty"`
	Data any    `json:"data,omitempty"`
}

func ReturnJson(Context *gin.Context, httpCode int, dataCode int, msg string, data interface{}) {

	//Context.Header("key2020","value2020")  	//可以根据实际情况在头部添加额外的其他信息
	Context.JSON(httpCode, Data{
		Code: dataCode,
		Msg:  msg,
		Data: data,
	})
}

// ReturnJsonFromString 将json字符窜以标准json格式返回（例如，从redis读取json格式的字符串，返回给浏览器json格式）
func ReturnJsonFromString(Context *gin.Context, httpCode int, jsonStr string) {
	Context.Header("Content-Type", "application/json; charset=utf-8")
	Context.String(httpCode, jsonStr)
}

// 语法糖函数封装

// Success 直接返回成功
func Success(c *gin.Context, data interface{}) {
	ReturnJson(c, http.StatusOK, OkCode, OkCodeMsg, data)
}

// Fail 失败的业务逻辑
func Fail(c *gin.Context) {
	ReturnJson(c, http.StatusBadRequest, FailCode, FailMsg, nil)
	c.Abort()
}

//密码错误

func ErrorPassword(c *gin.Context) {
	ReturnJson(c, http.StatusBadRequest, ErrorPasswordCode, ErrorPasswordMsg, nil)
	c.Abort()
}

//密码为空

func ErrorPasswordNil(c *gin.Context) {
	ReturnJson(c, http.StatusBadRequest, ErrorPasswordNilCode, ErrorPasswordNilMsg, nil)
	c.Abort()
}

// 金额过大

func ErrorExcessiveAmount(c *gin.Context) {
	ReturnJson(c, http.StatusBadRequest, ExcessiveAmountCode, ExcessiveAmountMsg, nil)
	c.Abort()
}

//金额参数错误

func ErrorAmount(c *gin.Context) {
	ReturnJson(c, http.StatusBadRequest, ErrorAmountCode, ErrorAmountMsg, nil)
	c.Abort()
}

//不存在用户

func ErrorUserNotFound(c *gin.Context) {
	ReturnJson(c, http.StatusBadRequest, ErrorUserNotFoundCode, ErrorUserNotFoundMsg, nil)
	c.Abort()
}

func ErrorModelNotFound(c *gin.Context) {
	ReturnJson(c, http.StatusBadRequest, ErrorModelNotFoundCode, ErrorModelNotFoundMsg, nil)
	c.Abort()
}

//余额不足

func ErrorInsufficientBalance(c *gin.Context, externalID string) {
	ReturnJson(c, http.StatusBadRequest, ErrorInsufficientBalanceCode, BuildErrorInsufficientBalanceMsg(externalID), nil)
	c.Abort()
}

// ErrorTokenBaseInfo token 基本的格式错误
func ErrorTokenBaseInfo(c *gin.Context) {
	ReturnJson(c, http.StatusBadRequest, http.StatusBadRequest, ErrorsTokenBaseInfo, "")
	//终止可能已经被加载的其他回调函数的执行
	c.Abort()
}

// ErrorTokenAuthFail token 权限校验失败
func ErrorTokenAuthFail(c *gin.Context) {
	ReturnJson(c, http.StatusUnauthorized, http.StatusUnauthorized, ErrorsNoAuthorization, "")
	//终止可能已经被加载的其他回调函数的执行
	c.Abort()
}

// ErrorTokenRefreshFail token不符合刷新条件
func ErrorTokenRefreshFail(c *gin.Context) {
	ReturnJson(c, http.StatusUnauthorized, http.StatusUnauthorized, ErrorsRefreshTokenFail, nil)
	//终止可能已经被加载的其他回调函数的执行
	c.Abort()
}

// token 参数校验错误
func TokenErrorParam(c *gin.Context, wrongParam interface{}) {
	ReturnJson(c, http.StatusUnauthorized, consts.ValidatorParamsCheckFailCode, consts.ValidatorParamsCheckFailMsg, wrongParam)
	c.Abort()
}

// ErrorCasbinAuthFail 鉴权失败，返回 405 方法不允许访问
func ErrorCasbinAuthFail(c *gin.Context, msg interface{}) {
	ReturnJson(c, http.StatusMethodNotAllowed, http.StatusMethodNotAllowed, ErrorsCasbinNoAuthorization, msg)
	c.Abort()
}

// ErrorParam 参数校验错误
func ErrorParam(c *gin.Context, wrongParam interface{}) {
	ReturnJson(c, http.StatusBadRequest, consts.ValidatorParamsCheckFailCode, consts.ValidatorParamsCheckFailMsg, wrongParam)
	c.Abort()
}

// ErrorSystem 系统执行代码错误
func ErrorSystem(c *gin.Context, msg string, data interface{}) {
	ReturnJson(c, http.StatusInternalServerError, ErrorServerOccurredCode, ErrorServerOccurredMsg+msg, data)
	c.Abort()
}

// ErrorDb 数据库错误执行代码错误
func ErrorDb(c *gin.Context, msg string) {
	ReturnJson(c, http.StatusInternalServerError, ErrorServerDbCode, ErrorServerDbMsg, nil)
	c.Abort()
}

//支付宝服务错误

func ErrorAlipayServer(c *gin.Context, msg string) {
	ReturnJson(c, http.StatusInternalServerError, ErrorAlipayServerCode, ErrorAlipayServerMsg+msg, nil)
	c.Abort()
}

// ValidatorError 翻译表单参数验证器出现的校验错误
func ValidatorError(c *gin.Context, err error) {
	if errs, ok := err.(validator.ValidationErrors); ok {
		wrongParam := validator_translation.RemoveTopStruct(errs.Translate(validator_translation.Trans))
		ReturnJson(c, http.StatusBadRequest, consts.ValidatorParamsCheckFailCode, consts.ValidatorParamsCheckFailMsg, wrongParam)
	} else {
		errStr := err.Error()
		// multipart:nextpart:eof 错误表示验证器需要一些参数，但是调用者没有提交任何参数
		if strings.ReplaceAll(strings.ToLower(errStr), " ", "") == "multipart:nextpart:eof" {
			ReturnJson(c, http.StatusBadRequest, consts.ValidatorParamsCheckFailCode, consts.ValidatorParamsCheckFailMsg, gin.H{"tips": ErrorNotAllParamsIsBlank})
		} else {
			ReturnJson(c, http.StatusBadRequest, consts.ValidatorParamsCheckFailCode, consts.ValidatorParamsCheckFailMsg, gin.H{"tips": errStr})
		}
	}
	c.Abort()
}

func BuildErrorInsufficientBalanceMsg(externalID string) string {
	t := time.Now().Unix()
	return fmt.Sprintf(`非常抱歉地通知您，您的账户余额不足以完成操作。为了确保您能够继续享受我们提供的服务和功能，我们建议您给您的账户充值。以下是可选的充值金额：

1.[充值1RMB](/deposit/%v/1/%v)：充值金额1元，可获得20000个tokens。
2.[充值10RMB](/deposit/%v/10/%v)：充值金额10元，可获得200000个tokens。
3.[充值100RMB](/deposit/%v/100/%v)：充值金额100元，可获得2000000个tokens。

温馨提示：根据兑换比例，1RMB等于20000个tokens。建议您选择充值面值最小的额度，以满足您当前的需求。

如果您有任何疑问或需要帮助，请随时联系我们的客服团队。我们将竭诚为您提供支持和解答。

感谢您的理解与支持！

最好的祝福`, externalID, t, externalID, t, externalID, t)
}
