package appconfig

import (
	"fmt"

	"github.com/spf13/viper"
)

type Config struct {
	ServiceName    string `mapstructure:"SERVICE_NAME"`
	Environment    string `mapstructure:"ENVIRONMENT"`
	APIHost        string `mapstructure:"API_HOST"`
	ServerPort     string `mapstructure:"SERVER_PORT"`
	APIPort        string `mapstructure:"API_PORT"`
	CpgRedirectUrl string `mapstructure:"CPG_REDIRECT_URL"`

	DbType               string `mapstructure:"DB_TYPE"`
	DbConnection         string `mapstructure:"DB_CONNECTION"`
	TiktokDbConnection   string `mapstructure:"TIKTOK_DB_CONNECTION"`
	DbMaxIdleConnections int    `mapstructure:"DB_MAX_IDLE_CONNECTIONS"`
	DbMaxOpenConnections int    `mapstructure:"DB_MAX_OPEN_CONNECTIONS"`
	DbConnMaxLifetime    int    `mapstructure:"DB_CONN_MAX_LIFE_TIME"`
	DbConnMaxIdleTime    int    `mapstructure:"DB_CONN_MAX_IDLE_TIME"`

	RedisHost                 string `mapstructure:"REDIS_HOST"`
	RedisPassword             string `mapstructure:"REDIS_PASSWORD"`
	StaticCategoryImages      string `mapstructure:"STATIC_CATEGORY_IMAGES"`
	StaticWeb                 string `mapstructure:"STATIC_WEB"`
	JWTTokenExpiresTime       int64  `mapstructure:"JWT_TOKEN_EXPIRES_TIME"`
	VerifyKey                 string `mapstructure:"VERIFY_KEY"`
	BindQ                     uint64 `mapstructure:"BIND_Q"`
	AtMeSessionAutoDeleteTime int64  `mapstructure:"AT_ME_SESSION_AUTO_DELETE_TIME"`
	TrainCookie               string `mapstructure:"TRAIN_COOKIE"`

	AlipayAppId      string `mapstructure:"ALIPAY_APP_ID"`
	AlipayPriKey     string `mapstructure:"ALIPAY_PRI_KEY"`
	AlipayPubKey     string `mapstructure:"ALIPAY_PUB_KEY"`
	AlipayEncryptKey string `mapstructure:"ALIPAY_ENCRYPT_KEY"`
	AlipayPartnerId  string `mapstructure:"ALIPAY_PARTNER_ID"`

	LOLAuth               string `mapstructure:"LOL_AUTH"`
	LOLReferer1           string `mapstructure:"LOL_REF1"`
	LOLSearchPlayerUrl    string `mapstructure:"LOL_SEARCH_PLAYER_URL"`
	LOLGetBattleListUrl   string `mapstructure:"LOL_GET_BATTLE_LIST_URL"`
	LOLGetBattleDetailUrl string `mapstructure:"LOL_GET_BATTLE_DETAIL_URL"`
	LOLAdminId            uint64 `mapstructure:"LOL_ADMIN_ID"`

	ChatGptRpcHost string `mapstructure:"CHAT_GPT_RPC_HOST"`
	ChatGptRpcPort string `mapstructure:"CHAT_GPT_RPC_PORT"`

	OpenAiKey        string `mapstructure:"OPENAI_KEY"`
	OpenAiChatGptUrl string `mapstructure:"OPENAI_CHAT_GPT_URL"`

	DouYinFollowerList string `mapstructure:"DOU_YIN_FOLLOWER_LIST"`
	WsId               string `mapstructure:"WSID"`
}

var appConfig *Config

func LoadConfig() *Config {

	if appConfig == nil {
		appConfig = readConfig()
	}
	return appConfig
}

func readConfig() *Config {
	config := Config{}

	viper.SetConfigFile(`.env`)
	viper.AutomaticEnv()
	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("failed to read env config file: %v", err))
	}

	err = viper.Unmarshal(&config)
	if err != nil {
		panic(fmt.Errorf("failed to unmarshal env config file: %v", err))
	}

	return &config
}
