package controllers

import (
	"encoding/json"
	"errors"
	"exchangeapp/global"
	"exchangeapp/models"
	"exchangeapp/publish"
	"exchangeapp/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"gorm.io/gorm"
)

var cacheKey = "articles"

func CreateArticle(ctx *gin.Context) {
	var article models.Article

	// 解析用户提交的数据
	if err := ctx.ShouldBindJSON(&article); err != nil {
		utils.LogError("CreateArticle", err) // 使用通用的日志记录函数
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 异步将文章数据发布到 RabbitMQ 队列
	go func(article models.Article) {
		if err := publish.PublishToQueue("article_queue", article); err != nil {
			utils.LogError("CreateArticle", err) // 如果失败记录日志
		}
	}(article)

	// 删除与文章相关的缓存（同步处理）
	if err := global.RedisDB.Del(cacheKey).Err(); err != nil {
		utils.LogError("CreateArticle", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to clear cache"})
		return
	}

	// 返回响应
	ctx.JSON(http.StatusAccepted, gin.H{"message": "Article creation request accepted"})
}

func GetArticles(ctx *gin.Context) {

	cachedData, err := global.RedisDB.Get(cacheKey).Result()

	if err == redis.Nil {
		var articles []models.Article

		if err := global.Db.Find(&articles).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			} else {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			}
			return
		}

		articleJSON, err := json.Marshal(articles)
		if err != nil {
			utils.LogError("GetArticles", err) // 使用通用的日志记录函数
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		if err := global.RedisDB.Set(cacheKey, articleJSON, 10*time.Minute).Err(); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, articles)

	} else if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else {
		var articles []models.Article

		if err := json.Unmarshal([]byte(cachedData), &articles); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, articles)
	}
}

func GetArticleByID(ctx *gin.Context) {
	id := ctx.Param("id")

	var article models.Article

	if err := global.Db.Where("id = ?", id).First(&article).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	ctx.JSON(http.StatusOK, article)
}
