package service

import (
	"errors"
	"github.com/gomodule/redigo/redis"
	"gorm.io/gorm"
	"kiingma/cmd/qqbot/models"
	"kiingma/cmd/qqbot/repository"
	"kiingma/cmd/redisstore"
)

type GameService interface {
	GetBackpack(backpack *models.Backpack) error
	UpdateBackpack(backpack *models.Backpack) error
	DeleteBackpack(backpack models.Backpack) error
	GetCommodityCount(owner uint64) (count int64, err error)
	GetAllCommodities(filter models.Commodity) (commodities []models.Commodity, err error)
	GetCommoditiesByName(name string) (commodities []models.Commodity, err error)
	AddBack(sendId, propId uint64, count int64) (backpack models.Backpack, prop models.Prop, err error)
	UpdateIntegrateScoreById(id uint64, score int64) error
	GetBasicAttributes(attributes *models.BasicAttributes)
	UpdateAttributes(id uint64, attributes models.Attributes) error
	GetSuitBy(m map[uint64]int) (models.Suit, error)
	GetLoLNewGameId() (int64, error)
	SteLoLGameId(gameId int64) error
}

type gameService struct {
	commonRepo *repository.CommonRepo
	gameRepo   *repository.GameRepo
	rds        *redisstore.RedisConn
}

func NewGameService(db *gorm.DB, rds *redisstore.RedisConn) GameService {
	return &gameService{
		commonRepo: repository.NewCommonRepo(db),
		gameRepo:   repository.NewGameRepo(db),
		rds:        rds,
	}
}

//检查玩家背包是否含有某个物品(id或者名称)

func (s *gameService) GetBackpack(backpack *models.Backpack) error {
	f := map[string]any{"holder_id": backpack.HolderID}

	if backpack.PropId != 0 {
		f["prop_id"] = backpack.PropId
	}

	if backpack.Name != "" {
		f["name"] = backpack.Name
	}

	if len(f) == 1 {
		return gorm.ErrRecordNotFound
	}

	err := s.commonRepo.GetByIDs(f, &backpack)

	return err
}

//背包更新

func (s *gameService) UpdateBackpack(backpack *models.Backpack) error {
	//背包有两个id
	if backpack.HolderID == 0 || backpack.PropId == 0 {
		return errors.New("ID 缺省")
	}
	return s.commonRepo.Update(map[string]any{
		"prop_id":   backpack.PropId,
		"holder_id": backpack.HolderID,
	}, backpack)
}

func (s *gameService) UpdateIntegrateScoreById(id uint64, score int64) error {
	return s.gameRepo.UpdateIntegrateScoreById(id, score)
}

func (s *gameService) UpdateCommodity(commodity *models.Commodity) error {
	//背包有两个id
	if commodity.ID == 0 || commodity.PropId == 0 {
		return errors.New("ID 缺省")
	}
	return s.commonRepo.Update(map[string]any{
		"prop_id": commodity.PropId,
		"owner":   commodity.Owner,
	}, commodity)
}

//删除背包某个物品

func (s *gameService) DeleteBackpack(backpack models.Backpack) error {
	//背包有两个id
	if backpack.HolderID == 0 || backpack.PropId == 0 {
		return errors.New("ID 缺省")
	}
	return s.commonRepo.Delete(&models.Backpack{
		HolderID: backpack.HolderID,
		Prop: models.Prop{
			PropId: backpack.PropId,
		},
	})
}

//查询该玩家上架的数量

func (s *gameService) GetCommodityCount(owner uint64) (count int64, err error) {
	//owner 不能为0
	if owner == 0 {
		return
	}

	co := models.Commodity{
		Owner: owner,
	}
	count, err = s.commonRepo.GetCount(&co)
	return
}

//获取该玩家在商店出售的某个物品

func (s *gameService) GetAllCommodities(filter models.Commodity) (commodities []models.Commodity, err error) {
	return s.gameRepo.GetAllCommodities(filter)
}

// 获取最早上传的某件商品

func (s *gameService) GetCommoditiesByName(name string) (commodities []models.Commodity, err error) {
	f := repository.Filters{
		OrderBy: "create_time",
		LikeFilter: map[string]string{
			"name": name,
		},
	}

	s.commonRepo.GetAllWithFilter(f, nil, &commodities)
	return
}

func (s *gameService) AddBack(sendId, propId uint64, count int64) (backpack models.Backpack, prop models.Prop, err error) {
	err = s.commonRepo.GetByIDs(map[string]any{
		"prop_id": propId,
	}, &prop)

	err = s.commonRepo.GetByIDs(map[string]any{
		"prop_id":   propId,
		"holder_id": sendId,
	}, &backpack)

	if err != nil && err != gorm.ErrRecordNotFound {
		return models.Backpack{}, models.Prop{}, err
	}

	if err == gorm.ErrRecordNotFound {
		backpack = models.Backpack{
			Count:    count,
			HolderID: sendId,
			Prop:     prop,
		}
		err = s.commonRepo.Create(&backpack)
	} else {
		backpack = models.Backpack{
			Count:    backpack.Count + count,
			HolderID: sendId,
			Prop:     prop,
		}
		err = s.commonRepo.Update(map[string]any{
			"prop_id":   propId,
			"holder_id": sendId,
		}, &backpack)
	}
	return
}

func (s *gameService) GetBasicAttributes(attributes *models.BasicAttributes) {
	err := s.commonRepo.GetByID(attributes.Id, attributes)
	//没有则初始化一个账号
	if err == gorm.ErrRecordNotFound {
		attributes.Experience = 0
		attributes.Luck = 0
		attributes.Speed = 0
		attributes.Armor = 0
		attributes.Speed = 0
		attributes.MagicResist = 0
		attributes.Life = 100
		attributes.Magic = 100
		attributes.Attack = 10
		_ = s.commonRepo.Create(&attributes)
	}
}

//增加玩家属性

func (s *gameService) UpdateAttributes(id uint64, attributes models.Attributes) error {
	return s.gameRepo.UpdateAttributes(id, attributes)
}

// map = SuitId:count

func (s *gameService) GetSuitBy(m map[uint64]int) (models.Suit, error) {
	f := repository.Filters{
		Filter: map[string]any{},
	}
	for k, v := range m {
		if v < 4 {
			continue
		}
		f.Filter["suit_id"] = k
		f.Filter["count"] = v
	}
	if len(f.Filter) == 0 {
		return models.Suit{}, nil
	}
	suit := models.Suit{}
	err := s.commonRepo.GetAllWithFilter(f, nil, &suit)
	return suit, err
}

func (s *gameService) GetLoLNewGameId() (int64, error) {
	return redis.Int64(s.rds.Do("get", "LoLGameId"))
}

func (s *gameService) SteLoLGameId(gameId int64) error {
	_, err := s.rds.Do("set", "LoLGameI	d", gameId)
	return err
}
