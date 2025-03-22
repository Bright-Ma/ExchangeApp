package controllers

import (
	"exchangeapp/global"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
)

func LikeArticle(ctx *gin.Context) {
	log.Println("INFO: LikeArticle invoked")
	articleID := ctx.Param("id")
	likeKey := "article:" + articleID + ":likes"

	if err := global.RedisDB.Incr(likeKey).Err(); err != nil {
		log.Println("ERROR: Failed to increment likes for article ID:", articleID, "Error:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	log.Println("INFO: Successfully liked article with ID:", articleID)
	ctx.JSON(http.StatusOK, gin.H{"message": "Successfully liked the article"})
}

func GetArticleLikes(ctx *gin.Context) {
	log.Println("INFO: GetArticleLikes invoked")
	articleID := ctx.Param("id")
	likeKey := "article:" + articleID + ":likes"

	likes, err := global.RedisDB.Get(likeKey).Result()

	if err == redis.Nil {
		log.Println("INFO: No likes found for article ID:", articleID)
		likes = "0"
	} else if err != nil {
		log.Println("ERROR: Failed to get likes for article ID:", articleID, "Error:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	log.Println("INFO: Retrieved likes for article ID:", articleID, "Likes:", likes)
	ctx.JSON(http.StatusOK, gin.H{"likes": likes})
}
