package apis

import (
	"exchangeapp/controllers/like_controller/models"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

// LikeArticle 处理文章点赞或取消点赞的 HTTP 请求
func LikeArticle(ctx *gin.Context) {
	log.Println("INFO: LikeArticle invoked")
	articleID := ctx.Param("id")
	userID := ctx.GetString("username")

	liked, totalLikes, dailyLikes, err := models.LikeArticle(articleID, userID)
	if err != nil {
		log.Println("ERROR: Failed to like/unlike article ID:", articleID, "Error:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if liked {
		log.Println("INFO: Successfully liked article with ID:", articleID)
		ctx.JSON(http.StatusOK, gin.H{
			"message":     "Successfully liked the article",
			"total_likes": totalLikes,
			"daily_likes": dailyLikes,
		})
	} else {
		log.Println("INFO: Successfully unliked article with ID:", articleID)
		ctx.JSON(http.StatusOK, gin.H{
			"message":     "Successfully unliked the article",
			"total_likes": totalLikes,
			"daily_likes": dailyLikes,
		})
	}
}

// GetArticleLikes 处理获取文章点赞数的 HTTP 请求
func GetArticleLikes(ctx *gin.Context) {
	log.Println("INFO: GetArticleLikes invoked")
	articleID := ctx.Param("id")

	totalLikes, dailyLikes, err := models.GetArticleLikes(articleID)
	if err != nil {
		log.Println("ERROR: Failed to get likes for article ID:", articleID, "Error:", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	log.Println("INFO: Retrieved likes for article ID:", articleID, "Total likes:", totalLikes, "Daily likes:", dailyLikes)
	ctx.JSON(http.StatusOK, gin.H{
		"total_likes": totalLikes,
		"daily_likes": dailyLikes,
	})
}
