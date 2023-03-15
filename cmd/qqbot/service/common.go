package service

import (
	"gorm.io/gorm"
	"qqbot/cmd/qqbot/repository"
)

type CommonService interface {
	Create(m interface{}) error
	Update(filters map[string]any, m interface{}) error
	Delete(m interface{}) error
	GetByID(id uint64, m interface{}) error
	GetByIDs(filters map[string]any, m interface{}) error
	GetOneWithFilter(filter, m interface{}) error
	GetAllWithFilter(filters repository.Filters, model, result interface{}) error
}

type commonService struct {
	commonRepo *repository.CommonRepo
}

func NewCommonService(db *gorm.DB) CommonService {
	return &commonService{
		commonRepo: repository.NewCommonRepo(db),
	}
}

func (s *commonService) Create(m interface{}) error {
	return s.commonRepo.Create(m)
}

func (s *commonService) Update(filters map[string]any, m interface{}) error {
	return s.commonRepo.Update(filters, m)
}
func (s *commonService) Delete(m interface{}) error {
	return s.commonRepo.Delete(m)
}

func (s *commonService) GetByIDs(filters map[string]any, m interface{}) error {
	return s.commonRepo.GetByIDs(filters, m)
}

func (s *commonService) GetByID(id uint64, m interface{}) error {
	return s.commonRepo.GetByID(id, m)
}

func (s *commonService) GetOneWithFilter(filter, m interface{}) error {
	return s.commonRepo.GetOneWithFilter(filter, m)
}

func (s *commonService) GetAllWithFilter(filters repository.Filters, model, result interface{}) error {
	return s.commonRepo.GetAllWithFilter(filters, model, result)
}
