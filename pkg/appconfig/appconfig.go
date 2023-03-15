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
	OpenAiKey                 string `mapstructure:"OPENAI_KEY"`
	TrainCookie               string `mapstructure:"TRAIN_COOKIE"`
}

var appConfig *Config

func LoadCPGConfig() *Config {

	if appConfig == nil {
		appConfig = readConfig()
	}
	return appConfig
}

func readConfig() *Config {
	config := Config{}

	viper.SetConfigFile(".env")
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
