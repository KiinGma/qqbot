package repository

import "gorm.io/gorm"

type CommonRepo struct {
	db *gorm.DB
}

type Filters struct {
	NeFilter map[string]interface{}
	//相等条件
	Filter map[string]interface{}
	// 小于或等于条件
	LessFilter map[string]interface{}
	// 大于或等于条件
	GreaterFilter map[string]interface{}
	// 模糊查询条件
	LikeFilter map[string]string
	// in条件
	InFilter map[string][]interface{}
	// 分页
	Page int
	// 大小
	Size int
	// 总数
	Count *int64
	// 预载
	Preloads []string
	//排序
	OrderBy string
}

func NewCommonRepo(db *gorm.DB) *CommonRepo {
	return &CommonRepo{db: db}
}

func (r *CommonRepo) Create(m interface{}) error {
	err := r.db.Create(m).Error
	return err
}

func (r *CommonRepo) Update(filters map[string]any, m interface{}) error {
	db := r.db
	for k, v := range filters {
		db = db.Where(k, v)
	}
	err := db.Save(m).Error
	return err
}

func (r *CommonRepo) GetByIDs(filters map[string]any, m interface{}) error {
	db := r.db
	for k, v := range filters {
		db = db.Where(k, v)
	}
	err := db.First(m).Error
	return err
}

func (r *CommonRepo) GetByID(id uint64, m interface{}) error {
	return r.db.Where("id = ?", id).First(m).Error
}

func (r *CommonRepo) GetCount(m interface{}) (count int64, err error) {
	err = r.db.Where(m).Count(&count).Error
	return
}

func (r *CommonRepo) GetOneWithFilter(filter, m interface{}) error {
	return r.db.Model(filter).Where(filter).First(m).Error
}

func (r *CommonRepo) Delete(m interface{}) error {
	err := r.db.Where(m).Delete(m).Error
	return err
}

func (r *CommonRepo) GetAllWithFilter(filters Filters, model, result interface{}) error {

	db := r.db

	for k, v := range filters.Filter {
		db = db.Where(k+" = ?", v)
	}

	for k, v := range filters.LikeFilter {
		db = db.Where(k+" like ?", "%"+v+"%")
	}

	for k, v := range filters.InFilter {
		if len(v) == 0 {
			break
		}
		db = db.Where(k+" in ?", v)
	}

	for _, v := range filters.Preloads {
		db = db.Preload(v)
	}

	for k, v := range filters.NeFilter {
		db = db.Where(k+" != ?", v)
	}

	for k, v := range filters.LessFilter {
		db = db.Where(k+" <= ?", v)
	}

	for k, v := range filters.GreaterFilter {
		db = db.Where(k+" >= ?", v)
	}

	if filters.OrderBy != "" {
		db = db.Order(filters.OrderBy)
	}

	if filters.Size != 0 {
		db = db.Limit(filters.Size)
	}

	if filters.Size != 0 {
		offset := (filters.Page - 1) * filters.Size
		db = db.Order(offset)
	}
	if filters.Count != nil {
		db = db.Count(filters.Count)
	}

	return db.Model(model).Find(result).Error
}
