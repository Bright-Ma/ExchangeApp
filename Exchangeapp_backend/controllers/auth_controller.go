package controllers

import (
	"net/http"

	"exchangeapp/global"
	"exchangeapp/models"
	"exchangeapp/utils"
	"log"

	"github.com/gin-gonic/gin"
)

func Register(ctx *gin.Context) {
	log.Println("INFO: Register invoked")
	var user models.User

	if err := ctx.ShouldBindJSON(&user); err != nil {
		log.Println("ERROR: Failed to bind JSON:", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPwd, err := utils.HashPassword(user.Password)
	if err != nil {
		log.Println("ERROR: Failed to hash password:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	user.Password = hashedPwd

	token, err := utils.GenerateJWT(user.Username)
	if err != nil {
		log.Println("ERROR: Failed to generate JWT:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := global.Db.AutoMigrate(&user); err != nil {
		log.Println("ERROR: Failed to auto-migrate user:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := global.Db.Create(&user).Error; err != nil {
		log.Println("ERROR: Failed to create user:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	log.Println("INFO: User registered successfully")
	ctx.JSON(http.StatusOK, gin.H{"token": token})
}

func Login(ctx *gin.Context) {
	log.Println("INFO: Login invoked")
	var input struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := ctx.ShouldBindJSON(&input); err != nil {
		log.Println("ERROR: Failed to bind JSON:", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User

	if err := global.Db.Where("username = ?", input.Username).First(&user).Error; err != nil {
		log.Println("ERROR: Wrong credentials for username:", input.Username)
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "wrong credentials"})
		return
	}

	if !utils.CheckPassword(input.Password, user.Password) {
		log.Println("ERROR: Password mismatch for username:", input.Username)
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "wrong credentials"})
		return
	}

	token, err := utils.GenerateJWT(user.Username)
	if err != nil {
		log.Println("ERROR: Failed to generate JWT:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	log.Println("INFO: User logged in successfully")
	ctx.JSON(http.StatusOK, gin.H{"token": token})
}
