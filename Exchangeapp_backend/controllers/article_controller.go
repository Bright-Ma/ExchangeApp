package controllers

import (
	"errors"
	"exchangeapp/global"
	"exchangeapp/models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"strconv"

	"gorm.io/gorm"
)

var cacheKey = "articles"

func CreateArticle(ctx *gin.Context) {
	log.Println("INFO: CreateArticle invoked")
	var article models.Article

	if err := ctx.ShouldBindJSON(&article); err != nil {
		log.Println("ERROR: Failed to bind JSON:", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := global.Db.AutoMigrate(&article); err != nil {
		log.Println("ERROR: Failed to auto-migrate article:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := global.Db.Create(&article).Error; err != nil {
		log.Println("ERROR: Failed to create article:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := global.RedisDB.Del(cacheKey).Err(); err != nil {
		log.Println("ERROR: Failed to clear cache:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	log.Println("INFO: Article created successfully")
	ctx.JSON(http.StatusCreated, article)
}

func GetArticles(ctx *gin.Context) {
	// 获取分页参数
	pageStr := ctx.DefaultQuery("page", "1")
	pageSize := 5 // 每页5篇文章

	page, err := strconv.Atoi(pageStr)
	if err != nil || page < 1 {
		log.Println("ERROR: Invalid page number:", pageStr)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page number"})
		return
	}

	var articles []models.Article
	// 计算偏移量
	offset := (page - 1) * pageSize

	// 分页查询
	if err := global.Db.Limit(pageSize).Offset(offset).Find(&articles).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Println("ERROR: No articles found:", err)
			ctx.JSON(http.StatusNotFound, gin.H{"error": "No articles found"})
		} else {
			log.Println("ERROR: Failed to query articles:", err)
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	// 获取文章总数用于前端分页
	var total int64
	if err := global.Db.Model(&models.Article{}).Count(&total).Error; err != nil {
		log.Println("ERROR: Failed to count articles:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	log.Println("INFO: Articles retrieved from database and cached")
	ctx.JSON(http.StatusOK, gin.H{
		"articles": articles,
		"total":    total,
		"page":     page,
		"pageSize": pageSize,
	})
}

func GetArticleByID(ctx *gin.Context) {
	log.Println("INFO: GetArticleByID invoked")
	id := ctx.Param("id")

	var article models.Article

	if err := global.Db.Where("id = ?", id).First(&article).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Println("ERROR: Article not found with ID:", id)
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		} else {
			log.Println("ERROR: Failed to query article by ID:", err)
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	log.Println("INFO: Article retrieved successfully with ID:", id)
	ctx.JSON(http.StatusOK, article)
}
