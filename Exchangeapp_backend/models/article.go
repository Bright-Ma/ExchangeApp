package models

import "gorm.io/gorm"

type Article struct {
	gorm.Model
	Title      string `binding:"required" gorm:"column:title"`
	Content    string `binding:"required" gorm:"column:content"`
	Preview    string `binding:"required" gorm:"column:preview"`
	TotalLikes int64  `binding:"required" gorm:"column:totallikes"`
}
