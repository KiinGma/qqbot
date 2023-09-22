package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"kiingma/cmd/chatgpt/datastore"
	"kiingma/cmd/chatgpt/global/consts"
	"kiingma/cmd/chatgpt/global/errnos"
	"kiingma/cmd/chatgpt/models"
	"kiingma/pkg/md5_encrypt"
)

type UserHandler struct {
	ds datastore.DataStore
}

func NewUserHandler(ds datastore.DataStore) *UserHandler {
	return &UserHandler{
		ds: ds,
	}
}

// 注册

func (h *UserHandler) UserRegister(c *gin.Context) {
	//生成新的用户
	u := models.User{}
	u.IpAddr = c.ClientIP()
	err := h.ds.Common().GetFirst(&u)
	//判断
	if err != gorm.ErrRecordNotFound {
		errnos.Success(c, "你本机已经注册过账号,暂时无法注册")
		return
	}

	pwd, err := uuid.NewUUID()
	if err != nil {
		errnos.Fail(c)
		return
	}
	u.Password = pwd.String()
	u.HashedPassword = md5_encrypt.MD5(u.Password)

	if err != nil {
		errnos.Fail(c)
		return
	}
	//生成账户账单
	ui := models.UserIntegrate{}
	ui.Amount = consts.DefaultIntegrate
	err = h.ds.Atomic(func(ds datastore.DataStore) error {
		err = h.ds.Common().Create(&u)
		ui.UserID = u.ID
		err = h.ds.Common().Create(&ui)
		return err
	})
	errnos.Success(c, u.HashedPassword)
}

//限制ip
