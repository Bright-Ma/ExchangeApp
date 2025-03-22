package middlewares

import (
	"exchangeapp/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthMiddleWare() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		log.Println("INFO: Auth middleware invoked")
		token := ctx.GetHeader("Authorization")
		if token == "" {
			log.Println("ERROR: Missing Authorization Header")
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Missing Authorization Header"})
			ctx.Abort()
			return
		}

		username, err := utils.ParseJWT(token)
		if err != nil {
			log.Println("ERROR: Invalid token:", err)
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			ctx.Abort()
			return
		}

		log.Println("INFO: Token validated successfully for username:", username)
		ctx.Set("username", username)
		ctx.Next()
	}
}
