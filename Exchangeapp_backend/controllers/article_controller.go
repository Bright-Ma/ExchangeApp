package controllers

import (
	"encoding/json"
	"errors"
	"exchangeapp/global"
	"exchangeapp/models"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
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
	log.Println("INFO: GetArticles invoked")
	cachedData, err := global.RedisDB.Get(cacheKey).Result()

	if err == redis.Nil {
		log.Println("INFO: Cache miss, querying database")
		var articles []models.Article

		if err := global.Db.Find(&articles).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				log.Println("ERROR: No articles found:", err)
				ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			} else {
				log.Println("ERROR: Failed to query articles:", err)
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			}
			return
		}

		articleJSON, err := json.Marshal(articles)
		if err != nil {
			log.Println("ERROR: Failed to marshal articles:", err)
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		if err := global.RedisDB.Set(cacheKey, articleJSON, 10*time.Minute).Err(); err != nil {
			log.Println("ERROR: Failed to cache articles:", err)
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		log.Println("INFO: Articles retrieved from database and cached")
		ctx.JSON(http.StatusOK, articles)

	} else if err != nil {
		log.Println("ERROR: Failed to retrieve cache:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else {
		log.Println("INFO: Cache hit, retrieving articles from cache")
		var articles []models.Article

		if err := json.Unmarshal([]byte(cachedData), &articles); err != nil {
			log.Println("ERROR: Failed to unmarshal cached articles:", err)
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, articles)
	}
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
