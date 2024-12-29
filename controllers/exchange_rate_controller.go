package controllers

import (
	"errors"
	"exchangeapp/global"
	"exchangeapp/models"
	"net/http"
	"time"

	"exchangeapp/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// 创建汇率
func CreateExchangeRate(ctx *gin.Context) {
	var exchangeRate models.ExchangeRate

	// 绑定 JSON 数据
	if err := ctx.ShouldBindJSON(&exchangeRate); err != nil {
		utils.LogError("CreateExchangeRate", err) // 使用通用的日志记录函数
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	exchangeRate.Date = time.Now()

	// 自动迁移表
	if err := global.Db.AutoMigrate(&exchangeRate); err != nil {
		utils.LogError("CreateExchangeRate", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 插入数据
	if err := global.Db.Create(&exchangeRate).Error; err != nil {
		utils.LogError("CreateExchangeRate", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, exchangeRate)
}

// 获取汇率
func GetExchangeRates(ctx *gin.Context) {
	var exchangeRates []models.ExchangeRate

	// 查询汇率数据
	if err := global.Db.Find(&exchangeRates).Error; err != nil {
		utils.LogError("GetExchangeRates", err)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	ctx.JSON(http.StatusOK, exchangeRates)
}
