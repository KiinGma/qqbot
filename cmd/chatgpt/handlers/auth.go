package handlers

import (
	"errors"
	"fmt"
	jwt2 "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/tidwall/gjson"
	"gorm.io/gorm"
	"io"
	"kiingma/cmd/chatgpt/datastore"
	"kiingma/cmd/chatgpt/global/consts"
	"kiingma/cmd/chatgpt/global/errnos"
	"kiingma/cmd/chatgpt/middleware/jwt"
	"kiingma/cmd/chatgpt/models"
	"strings"
	"time"
)

type Auth struct {
	jwt *jwt.JwtSign
	ds  datastore.DataStore
}

func NewAuthHandler(ds datastore.DataStore) *Auth {
	return &Auth{
		jwt: jwt.CreateJWT("764647954"),
		ds:  ds,
	}
}

///auth/get

func (a *Auth) AuthCreate(c *gin.Context) {
	raw, _ := io.ReadAll(c.Request.Body)
	//接收密码,数据库匹配
	code := gjson.GetBytes(raw, "code").String()
	if code == "" {
		errnos.ErrorPasswordNil(c)
		return
	}
	u := models.User{HashedPassword: code}
	err := a.ds.Common().GetFirst(&u)
	if err == gorm.ErrRecordNotFound {
		//密码错误
		errnos.ErrorPassword(c)
		return
	}
	fmt.Println(string(raw))
	token, _ := a.GenerateToken(u.ID, u.NickName, "", 18000)
	errnos.Success(c, models.WebResult{
		Token: token,
	})
}

type HeaderParams struct {
	Authorization string `header:"Authorization" binding:"required,min=20"`
}

// CheckTokenAuthWithRefresh 检查token完整性、有效性并且自动刷新中间件
func (a *Auth) CheckTokenAuthWithRefresh() gin.HandlerFunc {
	return func(context *gin.Context) {
		headerParams := HeaderParams{}

		//  推荐使用 ShouldBindHeader 方式获取头参数
		if err := context.ShouldBindHeader(&headerParams); err != nil {
			errnos.TokenErrorParam(context, consts.JwtTokenMustValid+err.Error())
			return
		}
		token := strings.Split(headerParams.Authorization, " ")
		if len(token) == 2 && len(token[1]) >= 20 {
			tokenIsEffective := a.IsEffective(token[1])
			// 判断token是否有效
			if tokenIsEffective {
				if customToken, err := a.ParseToken(token[1]); err == nil {
					// token验证通过，同时绑定在请求上下文
					context.Set("token", customToken)
					// 在自动刷新token的中间件中，将请求的认证键、值，原路返回，与后续刷新逻辑格式保持一致
					context.Header("Refresh-Token", "")
					context.Header("Access-Control-Expose-Headers", "Refresh-Token")
				}
				context.Next()
			} else {
				// 判断token是否满足刷新条件
				if a.TokenIsMeetRefreshCondition(token[1]) {
					// 刷新token
					if newToken, ok := a.RefreshToken(token[1], context.ClientIP()); ok {
						if customToken, err := a.ParseToken(newToken); err == nil {
							// token刷新成功，同时绑定在请求上下文
							context.Set("token", customToken)
						}
						// 新token放入header返回
						context.Header("Refresh-Token", newToken)
						context.Header("Access-Control-Expose-Headers", "Refresh-Token")
						context.Next()
					} else {
						errnos.ErrorTokenRefreshFail(context)
					}
				} else {
					errnos.ErrorTokenRefreshFail(context)
				}
			}
		} else {
			errnos.ErrorTokenBaseInfo(context)
		}
	}
}

// TokenIsMeetRefreshCondition 检查token是否满足刷新条件
func (a *Auth) TokenIsMeetRefreshCondition(token string) bool {
	// token基本信息是否有效：1.过期时间在允许的过期范围内;2.基本格式正确
	customClaims, code := a.isNotExpired(token, 200)
	switch code {
	case consts.JwtTokenOK, consts.JwtTokenExpired:
		//在数据库的存储信息是否也符合过期刷新刷新条件
		fmt.Println(customClaims)
	}
	return false
}

///auth/check

func (a *Auth) AuthCheck(c *gin.Context) {
	errnos.Success(c, nil)
}

func (a *Auth) GenerateToken(userid uint64, username string, phone string, expireAt int64) (tokens string, err error) {
	// 根据实际业务自定义token需要包含的参数，生成token，注意：用户密码请勿包含在token
	customClaims := jwt.CustomClaims{
		UserId: userid,
		Name:   username,
		Phone:  phone,
		// 特别注意，针对前文的匿名结构体，初始化的时候必须指定键名，并且不带 jwt. 否则报错：Mixture of field: value and value initializers
		StandardClaims: jwt2.StandardClaims{
			NotBefore: time.Now().Unix() - 10,       // 生效开始时间
			ExpiresAt: time.Now().Unix() + expireAt, // 失效截止时间
		},
	}
	return a.jwt.CreateToken(customClaims)
}

// RefreshToken 刷新token的有效期（默认+3600秒，参见常量配置项）
func (a *Auth) RefreshToken(oldToken, clientIp string) (newToken string, res bool) {
	var err error
	//如果token是有效的、或者在过期时间内，那么执行更新，换取新token
	if newToken, err = a.jwt.RefreshToken(oldToken, 180); err == nil {
		if customClaims, err := a.jwt.ParseToken(newToken); err == nil {
			userId := customClaims.UserId
			expiresAt := customClaims.ExpiresAt
			fmt.Println(userId, expiresAt)
		}
	}
	return "", false
}

// 判断token本身是否未过期
// 参数解释：
// token： 待处理的token值
// expireAtSec： 过期时间延长的秒数，主要用于用户刷新token时，判断是否在延长的时间范围内，非刷新逻辑默认为0

func (a *Auth) isNotExpired(token string, expireAtSec int64) (*jwt.CustomClaims, int) {
	if customClaims, err := a.jwt.ParseToken(token); err == nil {
		if time.Now().Unix()-(customClaims.ExpiresAt+expireAtSec) < 0 {
			// token有效
			return customClaims, consts.JwtTokenOK
		} else {
			// 过期的token
			return customClaims, consts.JwtTokenExpired
		}
	} else {
		// 无效的token
		return nil, consts.JwtTokenInvalid
	}
}

// IsEffective 判断token是否有效（未过期+数据库用户信息正常）
func (a *Auth) IsEffective(token string) bool {
	customClaims, code := a.isNotExpired(token, 0)
	if consts.JwtTokenOK == code {
		//TODO 1.首先在redis检测是否存在某个用户对应的有效token，如果存在就直接返回，不再继续查询mysql，否则最后查询mysql逻辑，确保万无一失
		//TODO 2.token符合token本身的规则以后，继续在数据库校验是不是符合本系统其他设置，例如：一个用户默认只允许10个账号同时在线（10个token同时有效）
		fmt.Println(customClaims)
		return true
	}
	return false
}

// ParseToken 将 token 解析为绑定时传递的参数
func (a *Auth) ParseToken(tokenStr string) (CustomClaims jwt.CustomClaims, err error) {
	if customClaims, err := a.jwt.ParseToken(tokenStr); err == nil {
		return *customClaims, nil
	} else {
		return jwt.CustomClaims{}, errors.New(errnos.ErrorsParseTokenFail)
	}
}
