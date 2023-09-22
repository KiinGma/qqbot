package redisstore

//redis使用的是redigo
import (
	"fmt"
	"github.com/gomodule/redigo/redis"
	"kiingma/pkg/appconfig"
	"log"
	"sync"
	"time"
)

var rdsLock sync.Mutex
var cacheInstance *RedisConn

type RedisConn struct {
	pool      *redis.Pool
	showDebug bool
}

func (rds *RedisConn) Do(commandName string, args ...interface{}) (reply interface{}, err error) {
	conn := rds.pool.Get()
	defer conn.Close()
	t1 := time.Now().UnixNano() //取出当前时间ns数
	reply, err = conn.Do(commandName, args...)
	if err != nil {
		e := conn.Err()
		if e != nil {
			log.Println("rdshelper.Do :", err, e)
		}
	}
	t2 := time.Now().UnixNano()
	if rds.showDebug {
		fmt.Printf("[redis] [info] [%dus] cmd=%s, err=%s, args=%v, reply=%s\n",
			(t2-t1)/1000, commandName, err, args, reply)
	}
	return reply, err
}

func (rds *RedisConn) ShowDebug(b bool) {
	rds.showDebug = b
}

// 单例化

func InstanceCache(config *appconfig.Config) *RedisConn {
	if cacheInstance != nil {
		return cacheInstance
	}
	rdsLock.Lock()
	defer rdsLock.Unlock()
	// 再次检查
	if cacheInstance != nil {
		return cacheInstance
	}
	return NewCache(config)
}

func NewCache(config *appconfig.Config) *RedisConn {
	host := config.RedisHost
	pwd := config.RedisPassword
	db := 10
	ShowDebug := true
	pool := redis.Pool{
		Dial: func() (redis.Conn, error) {
			c, err := redis.Dial("tcp", fmt.Sprintf("%s",
				host), redis.DialPassword(pwd), redis.DialDatabase(db))
			if err != nil {
				return nil, err
			}
			return c, nil
		},
		//是否在从池中取出连接前进行检验,如果检验失败,则从池中去除连接并尝试取出另一个
		TestOnBorrow: func(c redis.Conn, t time.Time) error {
			if time.Since(t) < time.Minute {
				return nil
			}
			_, err := c.Do("PING")
			return err
		},
		MaxIdle:         10000, //最多保持空闲连接数
		MaxActive:       10000, //最大活跃数
		IdleTimeout:     0,
		Wait:            false,
		MaxConnLifetime: 0,
	}
	instance := &RedisConn{
		pool: &pool,
	}
	cacheInstance = instance
	//显示所有redis语句
	instance.ShowDebug(ShowDebug)
	return instance
}
