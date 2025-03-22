package controllers

import (
	"errors"
	"exchangeapp/global"
	"exchangeapp/models"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateExchangeRate(ctx *gin.Context) {
	log.Println("INFO: CreateExchangeRate invoked")
	var exchangeRate models.ExchangeRate

	if err := ctx.ShouldBindJSON(&exchangeRate); err != nil {
		log.Println("ERROR: Failed to bind JSON:", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	exchangeRate.Date = time.Now()

	if err := global.Db.AutoMigrate(&exchangeRate); err != nil {
		log.Println("ERROR: Failed to auto-migrate exchange rate:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := global.Db.Create(&exchangeRate).Error; err != nil {
		log.Println("ERROR: Failed to create exchange rate:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	log.Println("INFO: Exchange rate created successfully")
	ctx.JSON(http.StatusCreated, exchangeRate)
}

func GetExchangeRates(ctx *gin.Context) {
	log.Println("INFO: GetExchangeRates invoked")
	var exchangeRates []models.ExchangeRate

	if err := global.Db.Find(&exchangeRates).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Println("ERROR: No exchange rates found:", err)
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		} else {
			log.Println("ERROR: Failed to query exchange rates:", err)
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	log.Println("INFO: Retrieved exchange rates successfully")
	ctx.JSON(http.StatusOK, exchangeRates)
}
