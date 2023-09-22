package datastore

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"kiingma/cmd/chatgpt/models"
	"kiingma/cmd/chatgpt/service"
	"kiingma/cmd/redisstore"
	"kiingma/pkg/appconfig"
	"runtime"
	"time"
)

type DataStore interface {
	Common() service.CommonService
	LedgerService() service.LedgerService
	Atomic(fn func(ds DataStore) error) error
}

type sqlStore struct {
	conn *gorm.DB
	db   *gorm.DB
	rds  *redisstore.RedisConn
}

func NewStore(config *appconfig.Config) (d DataStore, err error) {
	db, err := gorm.Open(postgres.Open(config.DbConnection), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		return nil, err
	}

	sqlDB, _ := db.DB()
	sqlDB.SetConnMaxIdleTime(time.Second * time.Duration(config.DbConnMaxIdleTime))
	sqlDB.SetConnMaxLifetime(time.Second * time.Duration(config.DbConnMaxLifetime))
	sqlDB.SetMaxIdleConns(config.DbMaxIdleConnections)
	sqlDB.SetMaxOpenConns(config.DbMaxOpenConnections)

	//SetConnMaxLifetime
	// initialServerConfig(db)
	synchronizeTables(db)

	d = &sqlStore{
		conn: db,
		db:   db,
		rds:  redisstore.InstanceCache(config),
	}
	return
}

func (s *sqlStore) Atomic(fn func(store DataStore) error) (err error) {

	tx := s.db.Begin()

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()

			switch e := r.(type) {
			case runtime.Error:
				panic(e)
			case error:
				err = fmt.Errorf("database panic err: %v", r)
				return
			default:
				panic(e)
			}
		}
		if err != nil {
			if rbErr := tx.Rollback().Error; rbErr != nil {
				err = fmt.Errorf("tx err: %v, rb err: %v", err, rbErr)
			}
		} else {
			err = tx.Commit().Error
		}
	}()

	newStore := &sqlStore{
		conn: s.conn,
		db:   tx,
	}

	err = fn(newStore)
	return err
}

func synchronizeTables(db *gorm.DB) {
	err := db.AutoMigrate(models.User{})
	err = db.AutoMigrate(models.UserIntegrate{})
	err = db.AutoMigrate(models.Ledger{})
	err = db.AutoMigrate(models.LOLUser{})
	fmt.Println(err)
}

func (s *sqlStore) Common() service.CommonService {
	return service.NewCommonService(s.db)
}

func (s *sqlStore) LedgerService() service.LedgerService {
	return service.NewLedgerService(s.db)
}
